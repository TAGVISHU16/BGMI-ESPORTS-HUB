
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyRegistrations() {
    const [registrations, setRegistrations] = useState(() => {
        const saved = localStorage.getItem("myRegistrations");

        if (saved) {
            return JSON.parse(saved);
        }

        const oldData = localStorage.getItem("myRegistrations");

        if (oldData) {
            localStorage.setItem("myRegistrations", oldData);
            return JSON.parse(oldData);
        }

        return [];
    });

    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);

    useEffect(() => {
        const updateRegistrations = () => {
            const saved = localStorage.getItem("myRegistrations");

            setRegistrations(saved ? JSON.parse(saved) : []);
        };

        window.addEventListener("storage", updateRegistrations);

        return () => {
            window.removeEventListener("storage", updateRegistrations);
        };
    }, []);

    const handleCancel = (registrationId) => {
        setSelectedRegistrationId(registrationId);
        setShowCancelConfirm(true);
    };

    const confirmCancelRegistration = () => {
        const updatedRegistrations = registrations.filter(
            (registration) =>
                registration.registrationId !== selectedRegistrationId
        );

        setRegistrations(updatedRegistrations);

        localStorage.setItem(
            "myRegistrations",
            JSON.stringify(updatedRegistrations)
        );

        const latestRegistration = JSON.parse(
            localStorage.getItem("registrationData") || "null"
        );

        if (latestRegistration?.registrationId === selectedRegistrationId) {
            if (updatedRegistrations.length > 0) {
                localStorage.setItem(
                    "registrationData",
                    JSON.stringify(updatedRegistrations[updatedRegistrations.length - 1])
                );
            } else {
                localStorage.removeItem("registrationData");
            }
        }

        window.dispatchEvent(new Event("registrationsUpdated"));

        setShowCancelConfirm(false);
        setSelectedRegistrationId(null);

        alert("Registration cancelled successfully!");
    };

    return (
        <main className="my-registrations-page">
            {showCancelConfirm && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">

                        <div className="delete-modal-icon">
                            !
                        </div>

                        <h2>CANCEL REGISTRATION?</h2>

                        <p>
                            Are you sure you want to cancel this tournament registration?
                        </p>

                        <p className="delete-warning">
                            This action cannot be undone!
                        </p>

                        <div className="delete-modal-actions">

                            <button
                                className="delete-cancel-btn"
                                onClick={() => {
                                    setShowCancelConfirm(false);
                                    setSelectedRegistrationId(null);
                                }}
                            >
                                NO, KEEP IT
                            </button>

                            <button
                                className="delete-confirm-btn"
                                onClick={confirmCancelRegistration}
                            >
                                YES, CANCEL
                            </button>

                        </div>

                    </div>
                </div>
            )}
            <div className="my-registrations-container">

                <p className="auth-tag">PLAYER DASHBOARD</p>

                <h1>
                    MY <span>REGISTRATIONS</span>
                </h1>

                <p className="registrations-description">
                    Track all your registered BGMI tournaments in one place.
                </p>

                {registrations.length === 0 ? (
                    <div className="empty-registrations">
                        <h2>No Registrations Yet!</h2>

                        <p>
                            You haven't registered for any tournament.
                        </p>

                        <Link to="/tournaments" className="auth-submit">
                            EXPLORE TOURNAMENTS →
                        </Link>
                    </div>
                ) : (
                    <div className="my-registrations-grid">

                        {registrations.map((registration) => (
                            <div
                                className="my-registration-card"
                                key={registration.registrationId}
                            >

                                <div className="registration-card-header">
                                    <span className="registration-status">
                                        REGISTERED
                                    </span>

                                    <span className="registration-mode">
                                        {registration.tournament.type}
                                    </span>
                                </div>

                                <h2>{registration.tournament.name}</h2>

                                <div className="my-registration-details">

                                    <div>
                                        <span>Player Name</span>
                                        <strong>{registration.formData.playerName}</strong>
                                    </div>

                                    <div>
                                        <span>BGMI ID</span>
                                        <strong>{registration.formData.bgmiId}</strong>
                                    </div>

                                    <div>
                                        <span>In-Game Name</span>
                                        <strong>{registration.formData.inGameName}</strong>
                                    </div>

                                    {registration.formData.teamName && (
                                        <div>
                                            <span>Team Name</span>
                                            <strong>{registration.formData.teamName}</strong>
                                        </div>
                                    )}

                                    <div>
                                        <span>Entry Fee</span>
                                        <strong>₹{registration.tournament.entryFee}</strong>
                                    </div>

                                    <div>
                                        <span>Registration Date</span>
                                        <strong>{registration.registeredAt}</strong>
                                    </div>

                                </div>

                                <p className="registration-demo-note">
                                    Demo registration — not confirmed by a tournament organizer.
                                </p>

                                <button
                                    className="cancel-registration-btn"
                                    onClick={() => handleCancel(registration.registrationId)}
                                >
                                    CANCEL REGISTRATION
                                </button>

                            </div>
                        ))}

                    </div>
                )}

                <Link to="/tournaments" className="back-home">
                    ← Explore More Tournaments
                </Link>

            </div>
        </main>
    );
}

export default MyRegistrations;
