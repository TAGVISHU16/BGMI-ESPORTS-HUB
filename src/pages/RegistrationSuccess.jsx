import { Link } from "react-router-dom";

function RegistrationSuccess() {
    const savedData =
    localStorage.getItem("registrationData") ||
    sessionStorage.getItem("registrationData");

    const registration = savedData ? JSON.parse(savedData) : null;

    if (!registration) {
        return (
            <main className="success-page">
                <div className="success-card">
                    <h1>No Registration Found</h1>
                    <Link to="/tournaments">Explore Tournaments</Link>
                </div>
            </main>
        );
    }

    const { tournament, formData } = registration;

    return (
        <main className="success-page">
            <div className="success-card">

                <div className="success-icon">✓</div>

                <p className="auth-tag">BGMI ESPORTS HUB</p>

                <h1>
                    REGISTRATION <span>SUCCESSFUL!</span>
                </h1>

                <p className="success-description">
                    Your tournament registration has been submitted successfully.
                </p>

                <div className="success-details">

                    <h2>Registration Details</h2>

                    <div>
                        <span>Tournament</span>
                        <strong>{tournament.name}</strong>
                    </div>

                    <div>
                        <span>Player Name</span>
                        <strong>{formData.playerName}</strong>
                    </div>

                    <div>
                        <span>BGMI ID</span>
                        <strong>{formData.bgmiId}</strong>
                    </div>

                    <div>
                        <span>In-Game Name</span>
                        <strong>{formData.inGameName}</strong>
                    </div>

                    {formData.teamName && (
                        <div>
                            <span>Team Name</span>
                            <strong>{formData.teamName}</strong>
                        </div>
                    )}

                    <div>
                        <span>Mode</span>
                        <strong>{tournament.type}</strong>
                    </div>

                    <div>
                        <span>Entry Fee</span>
                        <strong>₹{tournament.entryFee}</strong>
                    </div>

                </div>

                <p className="success-note">
                    Note: This is a demo registration. Your details are stored
                    temporarily in this browser session.
                </p>

                <div className="success-buttons">
                    <Link to="/tournaments" className="auth-submit">
                        EXPLORE TOURNAMENTS
                    </Link>

                    <Link to="/my-registrations" className="auth-submit">
                        VIEW MY REGISTRATIONS →
                    </Link>

                    <Link to="/" className="back-home">
                        ← Back to Home
                    </Link>
                </div>

            </div>
        </main>
    );
}

export default RegistrationSuccess;