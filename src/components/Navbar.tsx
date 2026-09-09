import React from "react";
import { ReactComponent as Git } from "../assets/git-square-brands.svg";
import { ReactComponent as Linkedin } from "../assets/linkedin-brands.svg";
import { NavLink } from "react-router-dom";

const navigation = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/tech", label: "Tech" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <nav className="Navbar" aria-label="Primary navigation">
      <div className="navbar-links">
        {navigation.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `navbar-link${isActive ? " active-page" : ""}`
            }
          >
            {label}.
          </NavLink>
        ))}
      </div>
      <div className="navbar-icons">
        <a
          className="social-link"
          href="https://github.com/R-zine"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ivan Radev on GitHub"
        >
          <Git className="git-icon" aria-hidden="true" focusable="false" />
        </a>
        <a
          className="social-link"
          href="https://www.linkedin.com/in/ivan-radev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ivan Radev on LinkedIn"
        >
          <Linkedin
            className="linkedin-icon"
            aria-hidden="true"
            focusable="false"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
