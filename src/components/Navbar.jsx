import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as Git } from "../assets/git-square-brands.svg";
import { ReactComponent as Linkedin } from "../assets/linkedin-brands.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    (path = "") => {
      let curtain = document.querySelector(".curtain");
      curtain.classList.remove("lifted");
      setTimeout(() => curtain.classList.add("fallen"), 100);

      setTimeout(() => {
        navigate(`/${path}`, { replace: true });
        curtain.classList.remove("fallen");
        setTimeout(() => curtain.classList.add("lifted"), 1000);
      }, 1500);
    },
    [navigate]
  );

  const [currentPage, setCurrentPage] = useState("");

  const location = useLocation().pathname;

  useEffect(() => {
    setCurrentPage(location);
  }, [location]);

  return (
    <div className="Navbar">
      <div className="navbar-links">
        {currentPage === "/" ? (
          <div className="navbar-link active-page">Home.</div>
        ) : (
          <div
            className="navbar-link"
            onClick={(e) => {
              e.target.classList.add("active-page");
              handleOnClick("");
            }}
          >
            Home.
          </div>
        )}

        {currentPage === "/projects" ? (
          <div className="navbar-link active-page">Projects.</div>
        ) : (
          <div
            className="navbar-link"
            onClick={(e) => {
              e.target.classList.add("active-page");
              handleOnClick("projects");
            }}
          >
            Projects.
          </div>
        )}
        {currentPage === "/tech" ? (
          <div className="navbar-link active-page">Tech.</div>
        ) : (
          <div
            className="navbar-link"
            onClick={(e) => {
              e.target.classList.add("active-page");
              handleOnClick("tech");
            }}
          >
            Tech.
          </div>
        )}

        {currentPage === "/contact" ? (
          <div className="navbar-link active-page">Contact.</div>
        ) : (
          <div
            className="navbar-link"
            onClick={(e) => {
              e.target.classList.add("active-page");
              handleOnClick("contact");
            }}
          >
            Contact.
          </div>
        )}
      </div>
      <div className="navbar-icons">
        <Git
          className="git-icon"
          onClick={() => window.open("https://github.com/R-zine")}
        />
        <Linkedin
          className="linkedin-icon"
          onClick={() => window.open("http://www.linkedin.com/in/ivan-radev")}
        />
      </div>
    </div>
  );
};

export default Navbar;
