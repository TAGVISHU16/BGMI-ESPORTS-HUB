
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTournaments } from "../data/tournamentStorage";


const getTournamentSlotInfo = (tournament, registrations) => {
    const limits = {
        Solo: 60,
        Duo: 32,
        Squad: 16
    };

    const filled = registrations.filter(
        (registration) =>
            Number(registration.tournament?.id) === Number(tournament.id)
    ).length;

    const maxSlots = limits[tournament.type] || 0;
    const unit = tournament.type === "Solo" ? "Players" : "Teams";

    return `${filled}/${maxSlots} ${unit}`;
};

// SKELETON CARD
function TournamentSkeleton() {
    return (
        <div className="tournament-skeleton">

            <div className="skeleton-top">
                <div className="skeleton-shimmer skeleton-small"></div>
                <div className="skeleton-shimmer skeleton-small"></div>
            </div>

            <div className="skeleton-shimmer skeleton-title"></div>

            <div className="skeleton-details">
                <div className="skeleton-shimmer skeleton-detail"></div>
                <div className="skeleton-shimmer skeleton-detail"></div>
                <div className="skeleton-shimmer skeleton-detail"></div>
            </div>

            <div className="skeleton-shimmer skeleton-button"></div>

        </div>
    );
}

function Tournaments() {
    const [tournaments, setTournaments] = useState(() => getTournaments());
    const [registrations, setRegistrations] = useState(() =>
        JSON.parse(localStorage.getItem("myRegistrations") || "[]")
    );
    const [loading, setLoading] = useState(true);

    const [favorites, setFavorites] = useState(() =>
        JSON.parse(localStorage.getItem("favoriteTournaments") || "[]")
    );

    const toggleFavorite = (tournamentId) => {
        const updatedFavorites = favorites.includes(tournamentId)
            ? favorites.filter((id) => id !== tournamentId)
            : [...favorites, tournamentId];

        setFavorites(updatedFavorites);

        localStorage.setItem(
            "favoriteTournaments",
            JSON.stringify(updatedFavorites)
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTournaments(getTournaments());
            setLoading(false);
        }, 700);

        const updateTournaments = () => {
            setTournaments(getTournaments());
        };

        const updateRegistrations = () => {
            setRegistrations(
                JSON.parse(localStorage.getItem("myRegistrations") || "[]")
            );
        };

        window.addEventListener("tournamentsUpdated", updateTournaments);
        window.addEventListener("storage", updateTournaments);
        window.addEventListener("registrationsUpdated", updateRegistrations);
        window.addEventListener("storage", updateRegistrations);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("tournamentsUpdated", updateTournaments);
            window.removeEventListener("storage", updateTournaments);
            window.removeEventListener("registrationsUpdated", updateRegistrations);
            window.removeEventListener("storage", updateRegistrations);
        };
    }, []);

    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeStatus, setActiveStatus] = useState("All");
    const [showFavorites, setShowFavorites] = useState(false);

    const filteredTournaments = tournaments.filter((tournament) => {
        const matchesSearch = (tournament.name || "")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            activeFilter === "All" ||
            tournament.type === activeFilter;

        const matchesStatus =
            activeStatus === "All" ||
            (tournament.status || "Upcoming") === activeStatus;

        const matchesFavorites =
            !showFavorites || favorites.includes(tournament.id);

        return (
            matchesSearch &&
            matchesFilter &&
            matchesStatus &&
            matchesFavorites
        );
    });

    return (
        <main className="tournament-page">

            <section className="tournament-header">
                <p>COMPETE WITH THE BEST</p>

                <h1>
                    UPCOMING <span>TOURNAMENTS</span>
                </h1>

                <p>
                    Find your tournament, build your strategy
                    and dominate the battleground.
                </p>
            </section>

            <section className="tournament-controls">

                <input
                    type="search"
                    placeholder="Search tournaments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="tournament-filters">
                    {["All", "Solo", "Duo", "Squad"].map((filter) => (
                        <button
                            key={filter}
                            className={activeFilter === filter ? "filter-active" : ""}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="tournament-filters status-filters">
                    {["All", "Upcoming", "Live", "Completed"].map((status) => (
                        <button
                            key={status}
                            className={activeStatus === status ? "filter-active" : ""}
                            onClick={() => setActiveStatus(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <button
                    className={showFavorites ? "filter-active" : ""}
                    onClick={() => setShowFavorites(!showFavorites)}
                >
                    ♥ My Favorites
                </button>

            </section>

            <section className="tournament-container">

                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <TournamentSkeleton key={index} />
                    ))
                ) : filteredTournaments.length > 0 ? (
                    filteredTournaments.map((tournament) => (

                        <div className="tournament-card" key={tournament.id}>

                            <div className="tournament-card-top">
                                <span className="tournament-type">
                                    {tournament.type}
                                </span>

                                <span
                                    className={`tournament-status status-${(
                                        tournament.status || "Upcoming"
                                    ).toLowerCase()}`}
                                >
                                    {tournament.status || "Upcoming"}
                                </span>

                                <button
                                    type="button"
                                    className={`favorite-btn ${favorites.includes(tournament.id) ? "favorited" : ""
                                        }`}
                                    onClick={() => toggleFavorite(tournament.id)}
                                    aria-label="Toggle favourite"
                                >
                                    {favorites.includes(tournament.id) ? "♥" : "♡"}
                                </button>
                            </div>

                            <h2>{tournament.name}</h2>

                            <div className="tournament-details">

                                <div>
                                    <span>Entry Fee</span>
                                    <strong>₹{tournament.entryFee}</strong>
                                </div>

                                <div>
                                    <span>Prize Pool</span>
                                    <strong>₹{tournament.prizePool}</strong>
                                </div>

                                <div>
                                    <span>
                                        {tournament.type === "Solo" ? "Players" : "Teams"}
                                    </span>

                                    <strong>
                                        {getTournamentSlotInfo(tournament, registrations)}
                                    </strong>
                                </div>

                            </div>

                            <Link
                                to={`/tournaments/${tournament.id}`}
                                className="register-btn"
                            >
                                View Details →
                            </Link>

                        </div>
                    ))
                ) : (
                    <div className="no-tournaments">
                        <h2>No Tournaments Found!</h2>

                        <p>
                            Try another tournament name or filter.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setActiveFilter("All");
                                setActiveStatus("All");
                                setShowFavorites(false);
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

            </section>

        </main>
    );
}

export default Tournaments;
