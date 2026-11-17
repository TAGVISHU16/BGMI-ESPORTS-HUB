
import { useState } from "react";

function Leaderboard() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("points");

  const players = [
    { name: "ShadowX", team: "Team Alpha", kills: 45, matches: 15, points: 980 },
    { name: "DeadShot", team: "Team Apex", kills: 39, matches: 13, points: 870 },
    { name: "TAGVISHU45", team: "Team Apex Gaming", kills: 35, matches: 10, points: 820 },
    { name: "SniperKing", team: "Team Elite", kills: 30, matches: 8, points: 760 },
    { name: "GodOfWar", team: "Team Legends", kills: 27, matches: 11, points: 710 },
  ];

  // Search players
  const filteredPlayers = players.filter((player) => {
    const searchValue = search.toLowerCase().trim();

    return (
      player.name.toLowerCase().includes(searchValue) ||
      player.team.toLowerCase().includes(searchValue) ||
      player.kills.toString().includes(searchValue) ||
      player.matches.toString().includes(searchValue) ||
      player.points.toString().includes(searchValue)
    );
  });

  // Sort players
  const sortedPlayers = [...filteredPlayers].sort(
    (a, b) => b[sortBy] - a[sortBy]
  );

  // Top 3 players
  const topThree = sortedPlayers.slice(0, 3);
  const medals = ["🥇", "🥈", "🥉"];

  // Leaderboard statistics
  const totalPlayers = players.length;

  const totalKills = players.reduce(
    (total, player) => total + player.kills, 0
  );

  const totalMatches = players.reduce(
    (total, player) => total + player.matches, 0
  );

  const highestPoints = Math.max(
    ...players.map((player) => player.points)
  );

  return (
    <main className="leaderboard-page">

      <div className="leaderboard-header">
        <p className="section-tag">TOP PERFORMERS</p>
        <h1>PLAYER <span>LEADERBOARD</span></h1>
        <p>Compete with the best and climb the rankings.</p>
      </div>

      {/* LEADERBOARD STATS */}

      <section className="leaderboard-stats">

        <div className="leaderboard-stat-card">
          <p>TOTAL PLAYERS</p>
          <h2>{totalPlayers}</h2>
        </div>

        <div className="leaderboard-stat-card">
          <p>TOTAL KILLS</p>
          <h2>{totalKills}</h2>
        </div>

        <div className="leaderboard-stat-card">
          <p>TOTAL MATCHES</p>
          <h2>{totalMatches}</h2>
        </div>

        <div className="leaderboard-stat-card">
          <p>HIGHEST POINTS</p>
          <h2>{highestPoints}</h2>
        </div>

      </section>

      {/* SEARCH AND SORT */}

      <section className="leaderboard-controls">

        <input
          type="search"
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="button" onClick={() => setSearch("")}>
          Clear Search
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="points">Sort by Points</option>
          <option value="kills">Sort by Kills</option>
          <option value="matches">Sort by Matches</option>
        </select>

      </section>

      {/* TOP 3 PLAYERS */}

      <section className="top-players-section">

        {topThree.map((player, index) => (
          <div
            className={`top-player-card top-player-${index + 1}`}
            key={player.name}
          >
            <div className="top-player-medal">{medals[index]}</div>
            <p>RANK #{index + 1}</p>
            <h2>{player.name}</h2>
            <span>{player.team}</span>
            <h3>{player.points} <small>PTS</small></h3>
          </div>
        ))}

      </section>

      {/* LEADERBOARD TABLE */}

      <section className="leaderboard-table">

        <div className="leaderboard-row table-heading">
          <span>Rank</span>
          <span>Player</span>
          <span>Kills</span>
          <span>Matches</span>
          <span>Points</span>
        </div>

        {sortedPlayers.length > 0 ? (
          sortedPlayers.map((player, index) => (
            <div className="leaderboard-row" key={player.name}>

              <span className="player-rank">#{index + 1}</span>

              <div className="player-info">
                <strong className="player-name">{player.name}</strong>
                <small>{player.team}</small>
              </div>

              <span>{player.kills}</span>
              <span>{player.matches}</span>
              <span className="player-points">{player.points}</span>

            </div>
          ))
        ) : (
          <p className="leaderboard-empty">
            No players found!
          </p>
        )}

      </section>

      <p className="demo-note">
        * Demo leaderboard data for frontend preview.
      </p>

    </main>
  );
}

export default Leaderboard;
