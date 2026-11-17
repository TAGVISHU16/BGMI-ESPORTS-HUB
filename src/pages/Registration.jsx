import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getTournaments } from "../data/tournamentStorage";

function Registration() {
    const [tournaments, setTournaments] = useState(() => getTournaments());

    useEffect(() => {
        const updateTournaments = () => {
            setTournaments(getTournaments());
        };

        window.addEventListener("tournamentsUpdated", updateTournaments);
        window.addEventListener("storage", updateTournaments);

        return () => {
            window.removeEventListener("tournamentsUpdated", updateTournaments);
            window.removeEventListener("storage", updateTournaments);
        };
    }, []);
    const navigate = useNavigate();
    const { id } = useParams();

    const tournament = tournaments.find(
        (item) => item.id === Number(id)
    );

    const [formData, setFormData] = useState({
        playerName: "",
        bgmiId: "",
        inGameName: "",
        teamName: "",
        teammate1: "",
        teammate2: "",
        teammate3: "",
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const [registrations, setRegistrations] = useState(() =>
        JSON.parse(localStorage.getItem("myRegistrations") || "[]")
    );

    useEffect(() => {
        const updateRegistrations = () => {
            const savedRegistrations = JSON.parse(
                localStorage.getItem("myRegistrations") || "[]"
            );

            setRegistrations(savedRegistrations);
        };

        window.addEventListener("storage", updateRegistrations);
        window.addEventListener("registrationsUpdated", updateRegistrations);

        return () => {
            window.removeEventListener("storage", updateRegistrations);
            window.removeEventListener("registrationsUpdated", updateRegistrations);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (tournament.status && tournament.status !== "Upcoming") {
            alert("Registration is closed for this tournament!");
            return;
        }

        const existingRegistrations = JSON.parse(
            localStorage.getItem("myRegistrations") ||
            sessionStorage.getItem("myRegistrations") ||
            "[]"
        );

        const slotLimits = {
            Solo: 60,
            Duo: 32,
            Squad: 16,
        };

        const maxSlots = slotLimits[tournament.type];

        const filledSlots = existingRegistrations.filter(
            (registration) =>
                registration.tournament.id === tournament.id
        ).length;

        if (filledSlots >= maxSlots) {
            alert("Sorry! All tournament slots are full.");
            return;
        }

        const alreadyRegistered = existingRegistrations.some(
            (registration) =>
                registration.tournament.id === tournament.id &&
                registration.formData.bgmiId.trim() === formData.bgmiId.trim()
        );

        if (alreadyRegistered) {
            alert("You are already registered for this tournament!");
            return;
        }

        setShowConfirm(true);
    };

    const confirmRegistration = () => {
        const existingRegistrations = JSON.parse(
            localStorage.getItem("myRegistrations") ||
            sessionStorage.getItem("myRegistrations") ||
            "[]"
        );

        const newRegistration = {
            registrationId: Date.now(),
            tournament,
            formData,
            registeredAt: new Date().toLocaleString(),
        };

        const updatedRegistrations = [
            ...existingRegistrations,
            newRegistration,
        ];

        localStorage.setItem(
            "myRegistrations",
            JSON.stringify(updatedRegistrations)
        );
        window.dispatchEvent(new Event("registrationsUpdated"));
        setRegistrations(updatedRegistrations);

        localStorage.setItem(
            "registrationData",
            JSON.stringify(newRegistration)
        );

        setShowConfirm(false);
        navigate("/registration-success");
    };

    if (!tournament) {
        return (
            <main className="registration-page">
                <div className="registration-card">
                    <h1>Tournament Not Found</h1>
                    <Link to="/tournaments">
                        Back to Tournaments
                    </Link>
                </div>
            </main>
        );
    }


    // SLOT COUNT
    const slotLimits = {
        Solo: 60,
        Duo: 32,
        Squad: 16,
    };

    const maxSlots = slotLimits[tournament.type];

    const filledSlots = registrations.filter(
        (reg) => reg.tournament.id === tournament.id
    ).length;

    const remainingSlots = Math.max(maxSlots - filledSlots, 0);

    return (
        <main className="registration-page">
            {showConfirm && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">

                        <div className="delete-modal-icon">
                            !
                        </div>

                        <h2>CONFIRM REGISTRATION?</h2>

                        <p>
                            Are you sure you want to register for this tournament?
                        </p>

                        <p className="delete-warning">
                            Please verify your details before confirming!
                        </p>

                        <div className="delete-modal-actions">

                            <button
                                className="delete-cancel-btn"
                                onClick={() => setShowConfirm(false)}
                            >
                                CANCEL
                            </button>

                            <button
                                className="delete-confirm-btn"
                                onClick={confirmRegistration}
                            >
                                CONFIRM
                            </button>

                        </div>

                    </div>
                </div>
            )}
            <div className="registration-card">

                <p className="auth-tag">JOIN THE BATTLE</p>

                <h1>
                    TOURNAMENT <span>REGISTRATION</span>
                </h1>

                <div className="registration-info">
                    <h2>{tournament.name}</h2>
                    <p>Maximum Slots: {maxSlots}</p>
                    <p>Filled Slots: {filledSlots}</p>
                    <p>Remaining Slots: {remainingSlots}</p>
                    <p>Entry Fee: ₹{tournament.entryFee}</p>
                    <p>Prize Pool: ₹{tournament.prizePool}</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Player Name</label>
                        <input
                            type="text"
                            name="playerName"
                            placeholder="Enter your full name"
                            value={formData.playerName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>BGMI Character ID</label>
                        <input
                            type="text"
                            name="bgmiId"
                            placeholder="Enter your BGMI ID"
                            value={formData.bgmiId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>In-Game Name</label>
                        <input
                            type="text"
                            name="inGameName"
                            placeholder="Enter your BGMI name"
                            value={formData.inGameName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {tournament.type !== "Solo" && (
                        <>
                            <div className="form-group">
                                <label>Team Name</label>
                                <input
                                    type="text"
                                    name="teamName"
                                    placeholder="Enter your team name"
                                    value={formData.teamName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <h3 className="teammates-heading">
                                Teammates Details
                            </h3>

                            {tournament.type === "Duo" && (
                                <div className="form-group">
                                    <label>Teammate BGMI ID</label>
                                    <input
                                        type="text"
                                        name="teammate1"
                                        placeholder="Enter teammate BGMI ID"
                                        value={formData.teammate1}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            {tournament.type === "Squad" && (
                                <>
                                    <div className="form-group">
                                        <label>Teammate 1 BGMI ID</label>
                                        <input
                                            type="text"
                                            name="teammate1"
                                            placeholder="Enter BGMI ID"
                                            value={formData.teammate1}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Teammate 2 BGMI ID</label>
                                        <input
                                            type="text"
                                            name="teammate2"
                                            placeholder="Enter BGMI ID"
                                            value={formData.teammate2}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Teammate 3 BGMI ID</label>
                                        <input
                                            type="text"
                                            name="teammate3"
                                            placeholder="Enter BGMI ID"
                                            value={formData.teammate3}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={remainingSlots === 0}
                    >
                        {remainingSlots === 0 ? "SLOTS FULL" : "SUBMIT REGISTRATION →"}
                    </button>

                </form>

                <Link
                    to={`/tournaments/${tournament.id}`}
                    className="back-home"
                >
                    ← Back to Tournament
                </Link>

            </div>
        </main>
    );
}

export default Registration;