import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const btn = document.querySelector(".btn");
  const circle = document.querySelector(".circle");

  const [mousePos, SetMousePos] = useState({ x: null, y: null });
  const [hasMouse, setHasMouse] = useState(true);

  const handleMouseMove = useCallback(
    (e) => SetMousePos({ x: e.x, y: e.y }),
    []
  );

  useEffect(() => {
    hasMouse && window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const mouseCheck = matchMedia("(pointer:fine)").matches;

  useEffect(() => setHasMouse(mouseCheck), [mouseCheck]);

  useEffect(() => {
    if (circle)
      circle.onmouseover = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        circle.removeAttribute("style");
        circle.classList.add("centered");
        btn.classList.add("activated");
      };
  }, [circle]);

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    (path = "") => {
      let curtain = document.querySelector(".curtain");
      curtain.classList.remove("lifted");
      setTimeout(() => curtain.classList.add("fallen"), 100);

      setTimeout(() => {
        navigate(`/${path}`, { replace: true });
        curtain.classList.remove("fallen");
        setTimeout(() => curtain.classList.add("lifted"), 500);
      }, 700);
    },
    [navigate]
  );

  return (
    <div className="Landing">
      <div className="btn">
        <h2
          className="landing-btn main-btn"
          onClick={() => handleOnClick("projects")}
        >
          Projects
        </h2>

        <h1 className="slogan">Design. Execute.</h1>
      </div>
      {hasMouse ? (
        <div
          className="circle"
          style={{ right: mousePos.x, bottom: mousePos.y }}
          onClick={() => {
            circle.classList.add("clicked");
            handleOnClick("projects");
          }}
        />
      ) : (
        <div
          className="circle centered"
          onClick={() => {
            circle.classList.add("clicked");
            handleOnClick("projects");
          }}
        />
      )}
    </div>
  );
};

export default Landing;
