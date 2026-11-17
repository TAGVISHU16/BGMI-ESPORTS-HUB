import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            {/* HERO SECTION */}

            <main>
                <section className="hero" id="home">
                    <div className="hero-content">
                        <p className="hero-tag">
                            INDIA'S GAMING BATTLEGROUND
                        </p>

                        <h1>
                            DOMINATE THE
                            <span> BATTLEGROUND</span>
                        </h1>

                        <p className="hero-description">
                            Join the ultimate BGMI esports experience.
                            Compete with the best players, participate
                            in tournaments and win exciting prizes.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/tournaments">
                                <button className="primary-btn">
                                    Explore Tournaments →
                                </button>
                            </Link>

                            <Link to="/about">
                                <button className="secondary-btn">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="hero-badge">
                        <h3>BGMI</h3>
                        <p>ESPORTS HUB</p>
                        <span>PLAY. COMPETE. WIN.</span>
                    </div>
                </section>

                {/* STATS SECTION */}

                <section className="stats">
                    <div className="stat-box">
                        <h2>10K+</h2>
                        <p>Registered Players</p>
                    </div>

                    <div className="stat-box">
                        <h2>500+</h2>
                        <p>Tournaments</p>
                    </div>

                    <div className="stat-box">
                        <h2>₹10L+</h2>
                        <p>Prize Pool</p>
                    </div>

                    <div className="stat-box">
                        <h2>24/7</h2>
                        <p>Gaming Community</p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;