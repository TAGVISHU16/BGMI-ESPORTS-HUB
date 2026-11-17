import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${menuOpen ? "menu-open" : ""}`}>

      {/* LOGO */}
      <div className="logo">
        BGMI <span>ESPORTS HUB</span>
      </div>

      {/* HAMBURGER BUTTON */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* NAVIGATION */}
      <nav>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/tournaments" onClick={closeMenu}>Tournaments</NavLink>
        <NavLink to="/leaderboard" onClick={closeMenu}>Leaderboard</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/profile" onClick={closeMenu}>My Profile</NavLink>
      </nav>

      {/* BUTTONS */}
      <div className="nav-buttons">

        <Link to="/login" onClick={closeMenu}>
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/signup" onClick={closeMenu}>
          <button className="signup-btn">Sign Up</button>
        </Link>

      </div>

    </header>
  );
}

export default Navbar;