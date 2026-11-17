import { useEffect, useState } from "react";
import { tournaments as initialTournaments } from "../data/tournaments";

const getEmptyForm = () => ({
    name: "",
    type: "Solo",
    entryFee: "",
    prizePool: "",
    map: "Erangel",
    date: "",
    status: "Upcoming",
});

function AdminDashboard() {
    const [tournaments, setTournaments] = useState(() => {
        const saved = localStorage.getItem("adminTournaments");
        return saved ? JSON.parse(saved) : initialTournaments;
    });

    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState(getEmptyForm);

    const [registrations, setRegistrations] = useState(() => {
        const saved = localStorage.getItem("myRegistrations");

        if (saved) {
            return JSON.parse(saved);
        }

        const oldData = sessionStorage.getItem("myRegistrations");

        if (oldData) {
            localStorage.setItem("myRegistrations", oldData);
            return JSON.parse(oldData);
        }

        return [];
    });

    const [registrationSearch, setRegistrationSearch] = useState("");
    const [selectedTournament, setSelectedTournament] = useState("All");
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [playerSearch, setPlayerSearch] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [tournamentSearch, setTournamentSearch] = useState("");
    const [tournamentStatusFilter, setTournamentStatusFilter] = useState("All");

    useEffect(() => {
        localStorage.setItem("adminTournaments", JSON.stringify(tournaments));
        window.dispatchEvent(new Event("tournamentsUpdated"));
    }, [tournaments]);

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId !== null) {
            setTournaments((prev) =>
                prev.map((item) =>
                    item.id === editId
                        ? {
                            ...item,
                            ...formData,
                            entryFee: Number(formData.entryFee),
                            prizePool: Number(formData.prizePool),
                            perspective: formData.type,
                        }
                        : item
                )
            );

            setEditId(null);
            alert("Tournament updated successfully!");
        } else {
            const newTournament = {
                id: Date.now(),
                ...formData,
                entryFee: Number(formData.entryFee),
                prizePool: Number(formData.prizePool),
                players: "0/100",
                mode: "TPP",
                perspective: formData.type,
                description: "New tournament. Details coming soon.",
                rules: [
                    "Use your registered BGMI Player ID.",
                    "No hacking or cheating allowed.",
                    "Follow tournament instructions.",
                ],
            };

            setTournaments((prev) => [...prev, newTournament]);
            alert("Tournament added successfully!");
        }

        setFormData(getEmptyForm());
    };

    const handleEdit = (tournament) => {
        setEditId(tournament.id);

        setFormData({
            name: tournament.name || "",
            type: tournament.type || "Solo",
            entryFee: tournament.entryFee ?? "",
            prizePool: tournament.prizePool ?? "",
            map: tournament.map || "Erangel",
            date: tournament.date || "",
            status: tournament.status || "Upcoming",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setFormData(getEmptyForm());
    };

    const handleDelete = (id) => {
        setDeleteConfirmation({
            type: "tournament",
            id: id,
        });
    };

    const handleDeleteRegistration = (registrationId) => {
        setDeleteConfirmation({
            type: "registration",
            id: registrationId,
        });
    };

    const confirmDelete = () => {
        if (!deleteConfirmation) return;

        if (deleteConfirmation.type === "tournament") {
            setTournaments((prev) =>
                prev.filter(
                    (item) => item.id !== deleteConfirmation.id
                )
            );
        }

        if (deleteConfirmation.type === "registration") {
            const updatedRegistrations = registrations.filter(
                (item) =>
                    item.registrationId !== deleteConfirmation.id
            );

            setRegistrations(updatedRegistrations);

            localStorage.setItem(
                "myRegistrations",
                JSON.stringify(updatedRegistrations)
            );
        }

        setDeleteConfirmation(null);
    };

    const handleExportRegistrations = () => {
        if (registrations.length === 0) {
            alert("No registrations available to export!");
            return;
        }

        const headers = [
            "Player Name",
            "BGMI ID",
            "IGN",
            "Team Name",
            "Tournament",
            "Game Mode",
            "Entry Fee",
            "Registration Date",
        ];

        const rows = registrations.map((item) => [
            item.formData?.playerName || "",
            item.formData?.bgmiId || "",
            item.formData?.inGameName || "",
            item.formData?.teamName || "",
            item.tournament?.name || "",
            item.tournament?.type || "",
            item.tournament?.entryFee ?? 0,
            item.registeredAt || "",
        ]);

        const csvContent = [headers, ...rows]
            .map((row) =>
                row.map((value) =>
                    `"${String(value).replace(/"/g, '""')}"`
                ).join(",")
            )
            .join("\n");

        const blob = new Blob(
            ["\uFEFF" + csvContent],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "BGMI_Registrations.csv";
        link.click();

        URL.revokeObjectURL(url);

        alert("Registrations exported successfully!");
    };


    const tournamentNames = [
        "All",
        ...new Set(
            registrations.map((item) => item.tournament?.name).filter(Boolean)
        ),
    ];

    const filteredRegistrations = registrations.filter((item) => {
        const search = registrationSearch.toLowerCase();

        const matchesSearch =
            (item.formData?.playerName || "").toLowerCase().includes(search) ||
            (item.formData?.bgmiId || "").toLowerCase().includes(search) ||
            (item.formData?.inGameName || "").toLowerCase().includes(search);

        const matchesTournament =
            selectedTournament === "All" ||
            item.tournament?.name === selectedTournament;

        return matchesSearch && matchesTournament;
    });

    const uniquePlayers = [
        ...new Map(
            registrations.map((item) => [
                item.formData?.bgmiId,
                {
                    ...item.formData,
                    bgmiId: item.formData?.bgmiId,
                    registrationCount: registrations.filter(
                        (reg) =>
                            reg.formData?.bgmiId === item.formData?.bgmiId
                    ).length,
                },
            ])
        ).values(),
    ].filter((player) => player.bgmiId);

    const filteredPlayers = uniquePlayers.filter((player) => {
        const search = playerSearch.toLowerCase();

        return (
            (player.playerName || "").toLowerCase().includes(search) ||
            (player.bgmiId || "").toLowerCase().includes(search) ||
            (player.inGameName || "").toLowerCase().includes(search)
        );
    });

    const filteredTournaments = tournaments.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(tournamentSearch.toLowerCase());

        const matchesStatus =
            tournamentStatusFilter === "All" ||
            (item.status || "Upcoming") === tournamentStatusFilter;

        return matchesSearch && matchesStatus;
    });

    // TOURNAMENT SLOT MANAGEMENT

    const slotLimits = {
        Solo: 60,
        Duo: 32,
        Squad: 16,
    };

    const getTournamentSlots = (tournament) => {
        const maxSlots = slotLimits[tournament.type] || 0;

        const filledSlots = registrations.filter(
            (registration) =>
                registration.tournament?.id === tournament.id
        ).length;

        const remainingSlots = Math.max(maxSlots - filledSlots, 0);

        const percentage = maxSlots
            ? Math.min((filledSlots / maxSlots) * 100, 100)
            : 0;

        return {
            maxSlots,
            filledSlots,
            remainingSlots,
            percentage,
        };
    };

    return (
        <main className="admin-page">
            {/* DELETE CONFIRMATION MODAL */}

            {deleteConfirmation && (
                <div className="delete-modal-overlay">

                    <div className="delete-modal">

                        <div className="delete-modal-icon">
                            !
                        </div>

                        <h2>ARE YOU SURE?</h2>

                        <p>
                            {deleteConfirmation.type === "tournament"
                                ? "Do you really want to delete this tournament?"
                                : "Do you really want to delete this registration?"}
                        </p>

                        <p className="delete-warning">
                            This action cannot be undone!
                        </p>

                        <div className="delete-modal-actions">

                            <button
                                className="delete-cancel-btn"
                                onClick={() => setDeleteConfirmation(null)}
                            >
                                CANCEL
                            </button>

                            <button
                                className="delete-confirm-btn"
                                onClick={confirmDelete}
                            >
                                DELETE
                            </button>

                        </div>

                    </div>

                </div>
            )}
            <div className="admin-container">
                <p className="auth-tag">CONTROL CENTER</p>

                <h1>
                    ADMIN <span>DASHBOARD</span>
                </h1>

                <p className="admin-description">
                    Manage your BGMI esports tournaments.
                </p>

                {/* DASHBOARD STATS */}

                <div className="admin-stats">
                    <div className="admin-stat-card">
                        <h2>{tournaments.length}</h2>
                        <p>Total Tournaments</p>
                    </div>

                    <div className="admin-stat-card">
                        <h2>
                            {tournaments.filter(
                                (item) => item.status === "Upcoming"
                            ).length}
                        </h2>
                        <p>Upcoming Tournaments</p>
                    </div>

                    <div className="admin-stat-card">
                        <h2>{registrations.length}</h2>
                        <p>Total Registrations</p>
                    </div>

                    <div className="admin-stat-card">
                        <h2>{uniquePlayers.length}</h2>
                        <p>Total Players</p>
                    </div>
                </div>


                {/* TOURNAMENT STATUS OVERVIEW */}

                <section className="admin-list-section">
                    <h2>TOURNAMENT STATUS OVERVIEW</h2>

                    <div className="admin-stats">
                        <div className="admin-stat-card">
                            <h2>
                                {tournaments.filter(
                                    (item) => item.status === "Upcoming"
                                ).length}
                            </h2>
                            <p>Upcoming</p>
                        </div>

                        <div className="admin-stat-card">
                            <h2>
                                {tournaments.filter(
                                    (item) => item.status === "Live"
                                ).length}
                            </h2>
                            <p>Live</p>
                        </div>

                        <div className="admin-stat-card">
                            <h2>
                                {tournaments.filter(
                                    (item) => item.status === "Completed"
                                ).length}
                            </h2>
                            <p>Completed</p>
                        </div>
                    </div>
                </section>


                {/* REGISTRATION MANAGEMENT */}
                <section className="admin-list-section">

                    <div className="registration-controls">

                        <input
                            type="text"
                            placeholder="Search Player Name, BGMI ID or IGN..."
                            value={registrationSearch}
                            onChange={(e) => setRegistrationSearch(e.target.value)}
                        />

                        <select
                            value={selectedTournament}
                            onChange={(e) => setSelectedTournament(e.target.value)}
                        >
                            {tournamentNames.map((name) => (
                                <option key={name} value={name}>
                                    {name === "All" ? "All Tournaments" : name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <h2>MANAGE REGISTRATIONS</h2>

                    <button
                        className="admin-edit"
                        onClick={handleExportRegistrations}
                    >
                        EXPORT REGISTRATIONS ↓
                    </button>

                    <div className="admin-stats">
                        <div className="admin-stat-card">
                            <h2>{registrations.length}</h2>
                            <p>Total Registrations</p>
                        </div>
                    </div>

                    {filteredRegistrations.length === 0 ? (
                        <p className="admin-empty">
                            No matching registrations found.
                        </p>
                    ) : (
                        filteredRegistrations.map((registration) => (
                            <div
                                className="admin-tournament-card"
                                key={registration.registrationId}
                            >
                                <div>
                                    <h3>{registration.formData.playerName}</h3>

                                    <p>
                                        BGMI ID: {registration.formData.bgmiId}
                                    </p>

                                    <p>
                                        IGN: {registration.formData.inGameName}
                                    </p>

                                    <p>
                                        Tournament: {registration.tournament.name}
                                    </p>

                                    <p>
                                        Entry Fee: ₹{registration.tournament.entryFee}
                                    </p>

                                    <p>
                                        Team: {registration.formData.teamName || "N/A"}
                                    </p>
                                </div>

                                <div className="admin-actions">

                                    <button
                                        className="admin-edit"
                                        onClick={() => setSelectedRegistration(registration)}
                                    >
                                        VIEW DETAILS
                                    </button>

                                    <button
                                        className="admin-delete"
                                        onClick={() =>
                                            handleDeleteRegistration(registration.registrationId)
                                        }
                                    >
                                        DELETE
                                    </button>

                                </div>
                            </div>
                        ))
                    )}

                </section>

                {/* PLAYER MANAGEMENT */}

                <section className="admin-list-section">

                    <h2>PLAYER MANAGEMENT</h2>

                    <div className="admin-stats">
                        <div className="admin-stat-card">
                            <h2>{uniquePlayers.length}</h2>
                            <p>Total Players</p>
                        </div>
                    </div>

                    <div className="registration-controls">
                        <input
                            type="text"
                            placeholder="Search Player Name, BGMI ID or IGN..."
                            value={playerSearch}
                            onChange={(e) => setPlayerSearch(e.target.value)}
                        />
                    </div>

                    {filteredPlayers.length === 0 ? (
                        <p className="admin-empty">
                            No players found.
                        </p>
                    ) : (
                        filteredPlayers.map((player) => (
                            <div
                                className="admin-tournament-card"
                                key={player.bgmiId}
                            >
                                <div>
                                    <h3>{player.playerName}</h3>

                                    <p>BGMI ID: {player.bgmiId}</p>

                                    <p>IGN: {player.inGameName}</p>

                                    <p>
                                        Tournaments Joined: {player.registrationCount}
                                    </p>
                                </div>
                                <div className="admin-actions">
                                    <button
                                        className="admin-edit"
                                        onClick={() => setSelectedPlayer(player)}
                                    >
                                        VIEW PROFILE
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                </section>


                {/* ADD / EDIT TOURNAMENT FORM */}
                <section className="admin-form-section">
                    <h2>{editId !== null ? "EDIT TOURNAMENT" : "ADD NEW TOURNAMENT"}</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">
                            <div className="form-group">
                                <label>Tournament Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter tournament name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Game Mode</label>
                                <select name="type" value={formData.type} onChange={handleChange}>
                                    <option value="Solo">Solo</option>
                                    <option value="Duo">Duo</option>
                                    <option value="Squad">Squad</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tournament Status</label>
                                <select name="status" value={formData.status} onChange={handleChange}>
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Live">Live</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Entry Fee (₹)</label>
                                <input
                                    type="number"
                                    name="entryFee"
                                    min="0"
                                    placeholder="Enter entry fee"
                                    value={formData.entryFee}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Prize Pool (₹)</label>
                                <input
                                    type="number"
                                    name="prizePool"
                                    min="0"
                                    placeholder="Enter prize pool"
                                    value={formData.prizePool}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Map</label>
                                <select name="map" value={formData.map} onChange={handleChange}>
                                    <option value="Erangel">Erangel</option>
                                    <option value="Miramar">Miramar</option>
                                    <option value="Sanhok">Sanhok</option>
                                    <option value="Livik">Livik</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tournament Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-form-buttons">
                            <button type="submit" className="auth-submit">
                                {editId !== null ? "UPDATE TOURNAMENT" : "ADD TOURNAMENT"} →
                            </button>

                            {editId !== null && (
                                <button
                                    type="button"
                                    className="admin-cancel"
                                    onClick={handleCancelEdit}
                                >
                                    CANCEL
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* TOURNAMENT LIST */}
                <section className="admin-list-section">
                    <h2>MANAGE TOURNAMENTS</h2>


                    <div className="registration-controls">

                        <input
                            type="text"
                            placeholder="Search Tournament..."
                            value={tournamentSearch}
                            onChange={(e) => setTournamentSearch(e.target.value)}
                        />

                        <select
                            value={tournamentStatusFilter}
                            onChange={(e) => setTournamentStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Live">Live</option>
                            <option value="Completed">Completed</option>
                        </select>

                    </div>


                    {filteredTournaments.length === 0 ? (
                        <p className="admin-empty">
                            No matching tournaments found.
                        </p>
                    ) : (
                        filteredTournaments.map((tournament) => {
                            const slots = getTournamentSlots(tournament);

                            return (
                                <div className="admin-tournament-card" key={tournament.id}>
                                    <div>
                                        <h3>{tournament.name}</h3>

                                        <p>
                                            {tournament.type} | Entry: ₹{tournament.entryFee}
                                            {" | "}Prize: ₹{tournament.prizePool}
                                            {" | "}Status: {tournament.status || "Upcoming"}
                                        </p>

                                        <div className="admin-slot-info">
                                            <p>
                                                **Total Slots:** {slots.maxSlots}
                                            </p>
                                            <p>
                                                **Filled Slots:** {slots.filledSlots}
                                            </p>
                                            <p>
                                                **Remaining Slots:** {slots.remainingSlots}
                                            </p>

                                            <div className="admin-slot-progress">
                                                <div
                                                    className="admin-slot-progress-fill"
                                                    style={{ width: `${slots.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="admin-actions">
                                        <button className="admin-edit" onClick={() => handleEdit(tournament)}>
                                            EDIT
                                        </button>
                                        <button className="admin-delete" onClick={() => handleDelete(tournament.id)}>
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </section>
            </div>
            {/* REGISTRATION DETAILS POPUP */}

            {selectedRegistration && (
                <div className="registration-modal">

                    <div className="registration-modal-content">

                        <button
                            className="registration-modal-close"
                            onClick={() => setSelectedRegistration(null)}
                        >
                            ✕
                        </button>

                        <h2>REGISTRATION <span>DETAILS</span></h2>

                        <h3>PLAYER INFORMATION</h3>

                        <p>
                            <strong>Player Name:</strong>{" "}
                            {selectedRegistration.formData?.playerName || "N/A"}
                        </p>

                        <p>
                            <strong>BGMI ID:</strong>{" "}
                            {selectedRegistration.formData?.bgmiId || "N/A"}
                        </p>

                        <p>
                            <strong>IGN:</strong>{" "}
                            {selectedRegistration.formData?.inGameName || "N/A"}
                        </p>

                        <h3>TEAM INFORMATION</h3>

                        <p>
                            <strong>Team Name:</strong>{" "}
                            {selectedRegistration.formData?.teamName || "N/A"}
                        </p>

                        <p>
                            <strong>Teammate 1:</strong>{" "}
                            {selectedRegistration.formData?.teammate1 || "N/A"}
                        </p>

                        <p>
                            <strong>Teammate 2:</strong>{" "}
                            {selectedRegistration.formData?.teammate2 || "N/A"}
                        </p>

                        <p>
                            <strong>Teammate 3:</strong>{" "}
                            {selectedRegistration.formData?.teammate3 || "N/A"}
                        </p>

                        <h3>TOURNAMENT INFORMATION</h3>

                        <p>
                            <strong>Tournament:</strong>{" "}
                            {selectedRegistration.tournament?.name || "N/A"}
                        </p>

                        <p>
                            <strong>Mode:</strong>{" "}
                            {selectedRegistration.tournament?.type || "N/A"}
                        </p>

                        <p>
                            <strong>Entry Fee:</strong>{" "}
                            ₹{selectedRegistration.tournament?.entryFee ?? "N/A"}
                        </p>

                        <p>
                            <strong>Prize Pool:</strong>{" "}
                            ₹{selectedRegistration.tournament?.prizePool ?? "N/A"}
                        </p>

                        <p>
                            <strong>Map:</strong>{" "}
                            {selectedRegistration.tournament?.map || "N/A"}
                        </p>

                        <p>
                            <strong>Tournament Date:</strong>{" "}
                            {selectedRegistration.tournament?.date || "N/A"}
                        </p>

                        <button
                            className="auth-submit"
                            onClick={() => setSelectedRegistration(null)}
                        >
                            CLOSE
                        </button>

                    </div>
                </div>
            )}

            {/* PLAYER PROFILE POPUP */}

            {selectedPlayer && (
                <div className="registration-modal">

                    <div className="registration-modal-content">

                        <button
                            className="registration-modal-close"
                            onClick={() => setSelectedPlayer(null)}
                        >
                            ✕
                        </button>

                        <h2>PLAYER <span>PROFILE</span></h2>

                        <h3>PLAYER INFORMATION</h3>

                        <p>
                            <strong>Player Name:</strong> {selectedPlayer.playerName}
                        </p>

                        <p>
                            <strong>BGMI ID:</strong> {selectedPlayer.bgmiId}
                        </p>

                        <p>
                            <strong>IGN:</strong> {selectedPlayer.inGameName}
                        </p>

                        <p>
                            <strong>Team Name:</strong> {selectedPlayer.teamName || "N/A"}
                        </p>

                        <h3>PLAYER STATISTICS</h3>

                        <p>
                            <strong>Total Tournaments:</strong> {selectedPlayer.registrationCount}
                        </p>

                        <p>
                            <strong>Total Entry Fees:</strong> ₹
                            {registrations
                                .filter((item) =>
                                    item.formData?.bgmiId === selectedPlayer.bgmiId
                                )
                                .reduce(
                                    (total, item) =>
                                        total + Number(item.tournament?.entryFee || 0),
                                    0
                                )}
                        </p>

                        <h3>JOINED TOURNAMENTS</h3>

                        {registrations
                            .filter((item) =>
                                item.formData?.bgmiId === selectedPlayer.bgmiId
                            )
                            .map((item) => (
                                <div
                                    className="admin-tournament-card"
                                    key={item.registrationId}
                                >
                                    <h3>{item.tournament?.name || "Unknown Tournament"}</h3>

                                    <p>
                                        Entry Fee: ₹{item.tournament?.entryFee ?? 0}
                                    </p>

                                    <p>
                                        Mode: {item.tournament?.type || "N/A"}
                                    </p>
                                </div>
                            ))}

                        <button
                            className="auth-submit"
                            onClick={() => setSelectedPlayer(null)}
                        >
                            CLOSE
                        </button>

                    </div>
                </div>
            )}
        </main>
    );
}

export default AdminDashboard;
