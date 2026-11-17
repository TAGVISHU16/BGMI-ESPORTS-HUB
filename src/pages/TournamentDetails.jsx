import { Link, useParams } from "react-router-dom";
import { getTournaments } from "../data/tournamentStorage";
import { useEffect, useState } from "react";

function TournamentDetails() {
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

    const { id } = useParams();

    const tournament = tournaments.find(
        (item) => item.id === Number(id)
    );

    if (!tournament) {
        return (
            <main className="tournament-not-found">
                <h1>TOURNAMENT NOT FOUND!</h1>

                <Link to="/tournaments">
                    ← Back to Tournaments
                </Link>
            </main>
        );
    }

    return (
        <main className="tournament-detail-page">

            <div className="detail-header">

                <span className="tournament-type">
                    {tournament.type}
                </span>

                <h1>{tournament.name}</h1>

                <p>{tournament.description}</p>

                <span className="tournament-status">
                    {tournament.status}
                </span>

            </div>

            {/* TOURNAMENT INFORMATION */}

            <section className="detail-stats">

                <div>
                    <span>Prize Pool</span>
                    <h2>₹{tournament.prizePool}</h2>
                </div>

                <div>
                    <span>Entry Fee</span>
                    <h2>₹{tournament.entryFee}</h2>
                </div>

                <div>
                    <span>Players / Teams</span>
                    <h2>{tournament.players}</h2>
                </div>

                <div>
                    <span>Match Date</span>
                    <h2>{tournament.date}</h2>
                </div>

            </section>

            {/* MATCH DETAILS */}

            <section className="detail-content">

                <div className="detail-box">

                    <h2>MATCH INFORMATION</h2>

                    <div className="detail-item">
                        <span>Game</span>
                        <strong>BGMI</strong>
                    </div>

                    <div className="detail-item">
                        <span>Map</span>
                        <strong>{tournament.map}</strong>
                    </div>

                    <div className="detail-item">
                        <span>Mode</span>
                        <strong>{tournament.mode}</strong>
                    </div>

                    <div className="detail-item">
                        <span>Team Type</span>
                        <strong>{tournament.perspective}</strong>
                    </div>

                </div>

                <div className="detail-box">

                    <h2>TOURNAMENT RULES</h2>

                    {tournament.rules.map((rule, index) => (
                        <p className="detail-rule" key={index}>
                            <span>✓</span> {rule}
                        </p>
                    ))}

                </div>

            </section>


            <div className="detail-actions">

                {(!tournament.status || tournament.status === "Upcoming") ? (
                    <Link
                        to={`/tournaments/${tournament.id}/register`}
                        className="auth-submit"
                    >
                        REGISTER NOW →
                    </Link>
                ) : (
                    <button
                        type="button"
                        className="registration-closed-btn"
                        disabled
                    >
                        REGISTRATION CLOSED
                    </button>
                )}

                <Link to="/tournaments" className="back-btn">
                    ← Back to Tournaments
                </Link>

            </div>


            <p className="demo-note">
                Demo tournament details. Actual schedules and
                registration will be announced later.
            </p>

        </main>
    );
}

export default TournamentDetails;