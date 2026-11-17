function About() {
  return (
    <main className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <p className="about-tag">WHO WE ARE</p>

        <h1>
          ABOUT <span>BGMI ESPORTS HUB</span>
        </h1>

        <p>
          More than just gaming. We are building a competitive
          battleground where skills, teamwork and passion matter.
        </p>
      </section>

      {/* OUR STORY */}
      <section className="about-story">

        <div className="story-content">
          <p className="about-tag">OUR STORY</p>

          <h2>BUILT FOR <span>GAMERS</span></h2>

          <p>
            BGMI ESPORTS HUB is a platform designed for
            competitive BGMI players who want to showcase
            their skills and participate in exciting tournaments.
          </p>

          <p>
            Our goal is to create a gaming community where
            every player gets an opportunity to compete,
            improve and grow.
          </p>
        </div>

        <div className="story-box">
          <h2>BGMI</h2>
          <h3>ESPORTS HUB</h3>
          <p>PLAY. COMPETE. WIN.</p>
        </div>

      </section>

      {/* MISSION & VISION */}
      <section className="mission-section">

        <div className="mission-card">
          <div className="about-icon">🎯</div>
          <h2>OUR MISSION</h2>
          <p>
            To provide players with an exciting and fair
            competitive gaming experience.
          </p>
        </div>

        <div className="mission-card">
          <div className="about-icon">🚀</div>
          <h2>OUR VISION</h2>
          <p>
            To build a strong esports community and
            create opportunities for talented gamers.
          </p>
        </div>

        <div className="mission-card">
          <div className="about-icon">🤝</div>
          <h2>OUR VALUES</h2>
          <p>
            Fair play, teamwork, transparency and
            respect for every player.
          </p>
        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="about-features">

        <p className="about-tag">OUR ADVANTAGES</p>

        <h2>WHY CHOOSE <span>US?</span></h2>

        <div className="features-grid">

          <div className="feature-item">
            <h3>🏆 Competitive Tournaments</h3>
            <p>Participate in exciting gaming competitions.</p>
          </div>

          <div className="feature-item">
            <h3>⚡ Easy Registration</h3>
            <p>Explore tournaments through a simple interface.</p>
          </div>

          <div className="feature-item">
            <h3>📊 Player Rankings</h3>
            <p>Track player performance and leaderboard rankings.</p>
          </div>

          <div className="feature-item">
            <h3>🎮 Gaming Community</h3>
            <p>Connect with competitive gaming enthusiasts.</p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default About;