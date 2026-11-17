import { Link } from "react-router-dom";

function PlayerProfile() {
  // DEMO PLAYER DATA
  const player = {
    name: "TAGVISHU45",
    bgmiId: "5123456789",
    level: 82,
    rank: "Conqueror",
    team: "Team Apex Gaming",
    matches: 250,
    wins: 45,
    kills: 1250,
    kd: "4.85",
    winRate: "18%",
    avgDamage: 850,
  };

  const achievements = [
    {
      icon: "🏆",
      title: "Winner",
      description: "Tournament Champion",
    },
    {
      icon: "🎯",
      title: "Sharpshooter",
      description: "1000+ Total Kills",
    },
    {
      icon: "🔥",
      title: "Hot Streak",
      description: "5 Consecutive Wins",
    },
  ];

  const recentMatches = [
    {
      id: 1,
      map: "Erangel",
      position: "#1",
      kills: 12,
      points: 25,
    },
    {
      id: 2,
      map: "Miramar",
      position: "#3",
      kills: 8,
      points: 18,
    },
    {
      id: 3,
      map: "Sanhok",
      position: "#2",
      kills: 10,
      points: 22,
    },
  ];

  return (
    <main className="profile-page">

      {/* PROFILE HERO */}
      <section className="profile-hero">

        <div className="profile-avatar">
          <span>V</span>
        </div>

        <div className="profile-main-info">

          <p className="profile-tag">PLAYER PROFILE</p>

          <h1>{player.name}</h1>

          <p className="profile-team">
            🎮 {player.team}
          </p>

          <div className="profile-badges">
            <span>⭐ Level {player.level}</span>
            <span>🏅 {player.rank}</span>
          </div>

          <p className="bgmi-id">
            BGMI ID: {player.bgmiId}
          </p>

        </div>

        <div className="profile-status">
          <span className="online-dot"></span>
          PLAYER PROFILE
        </div>

      </section>

      {/* PLAYER STATISTICS */}
      <section className="profile-stats-section">

        <div className="profile-section-heading">
          <p>PLAYER PERFORMANCE</p>
          <h2>GAMING <span>STATISTICS</span></h2>
        </div>

        <div className="profile-stats-grid">

          <div className="profile-stat-card">
            <span>🎮</span>
            <h2>{player.matches}</h2>
            <p>Total Matches</p>
          </div>

          <div className="profile-stat-card">
            <span>🏆</span>
            <h2>{player.wins}</h2>
            <p>Chicken Dinners</p>
          </div>

          <div className="profile-stat-card">
            <span>💀</span>
            <h2>{player.kills}</h2>
            <p>Total Kills</p>
          </div>

          <div className="profile-stat-card">
            <span>⚡</span>
            <h2>{player.kd}</h2>
            <p>K/D Ratio</p>
          </div>

          <div className="profile-stat-card">
            <span>📈</span>
            <h2>{player.winRate}</h2>
            <p>Win Rate</p>
          </div>

          <div className="profile-stat-card">
            <span>🎯</span>
            <h2>{player.avgDamage}</h2>
            <p>Average Damage</p>
          </div>

        </div>

      </section>

      {/* ACHIEVEMENTS */}
      <section className="profile-achievements">

        <div className="profile-section-heading">
          <p>PLAYER MILESTONES</p>
          <h2>MY <span>ACHIEVEMENTS</span></h2>
        </div>

        <div className="achievement-grid">

          {achievements.map((achievement, index) => (

            <div className="achievement-card" key={index}>

              <div className="achievement-icon">
                {achievement.icon}
              </div>

              <h3>{achievement.title}</h3>

              <p>{achievement.description}</p>

            </div>

          ))}

        </div>

      </section>

      {/* RECENT MATCHES */}
      <section className="recent-matches">

        <div className="profile-section-heading">
          <p>YOUR LATEST PERFORMANCE</p>
          <h2>RECENT <span>MATCHES</span></h2>
        </div>

        <div className="match-table-wrapper">

          <table className="match-table">

            <thead>
              <tr>
                <th>MAP</th>
                <th>POSITION</th>
                <th>KILLS</th>
                <th>POINTS</th>
              </tr>
            </thead>

            <tbody>

              {recentMatches.map((match) => (

                <tr key={match.id}>
                  <td>{match.map}</td>
                  <td className="match-position">
                    {match.position}
                  </td>
                  <td>{match.kills}</td>
                  <td>{match.points}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* BACK BUTTON */}
      <div className="profile-back">
        <Link to="/tournaments">
          Explore Tournaments →
        </Link>
      </div>

      <p className="profile-demo-note">
        Demo player profile — statistics and achievements
        are sample data, not verified BGMI records.
      </p>

    </main>
  );
}

export default PlayerProfile;