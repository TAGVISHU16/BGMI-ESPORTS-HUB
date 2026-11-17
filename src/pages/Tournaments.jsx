
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTournaments } from "../data/tournamentStorage";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTournaments(getTournaments());
            setLoading(false);
        }, 700);

        const updateTournaments = () => {
            setTournaments(getTournaments());
        };

        window.addEventListener("tournamentsUpdated", updateTournaments);
        window.addEventListener("storage", updateTournaments);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("tournamentsUpdated", updateTournaments);
            window.removeEventListener("storage", updateTournaments);
        };
    }, []);

    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeStatus, setActiveStatus] = useState("All");

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

        return matchesSearch && matchesFilter && matchesStatus;
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
                                    <span>Players / Teams</span>
                                    <strong>{tournament.players}</strong>
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
