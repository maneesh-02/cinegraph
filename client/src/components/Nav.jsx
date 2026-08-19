import { useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/movies", label: "Movies" },
  { to: "/actors", label: "Actors" },
  { to: "/directors", label: "Directors" },
  { to: "/explore", label: "Explore Connections" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="marquee-nav">
      <div className="marquee-nav-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          Cine<span className="brand-mark">Graph</span>
        </NavLink>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
