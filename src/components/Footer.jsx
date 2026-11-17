import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      {/* FOOTER TOP */}
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>
            BGMI <span>ESPORTS HUB</span>
          </h2>

          <p>
            Your battleground. Your skills. Your victory.
            Join the competitive gaming community and
            take your esports journey to the next level.
          </p>

          <div className="footer-socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://discord.com/" target="_blank" rel="noreferrer">Discord</a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h3>QUICK LINKS</h3>

          <Link to="/">Home</Link>
          <Link to="/tournaments">Tournaments</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* ACCOUNT */}
        <div className="footer-links">
          <h3>MY ACCOUNT</h3>

          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
          <Link to="/tournaments">Join Tournament</Link>
          <Link to="/leaderboard">Player Rankings</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h3>CONTACT INFO</h3>

          <p>🎮 BGMI Gaming Community</p>
          <p>📧 Support details coming soon</p>
          <p>📍 India</p>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">

        <p>
          © 2026 BGMI ESPORTS HUB. All Rights Reserved.
        </p>

        <p>
          Designed with ❤️ for Gamers
        </p>

      </div>

    </footer>
  );
}

export default Footer;