import { useEffect } from "react";
import ProjectComponent from "./ProjectComponent";
import { Proj } from "../functions/functions";
import { nanoid } from "nanoid";
import "./project.css";

const Projects = () => {
  const Projects = [
    new Proj(
      "./img/stacker.jpg",
      "https://stckr.netlify.app/",
      "https://github.com/R-zine/stackr",
      `A fully 3D game made using react-three-fiber/react-three-drei (React integration of three.js). 
      Animations are handled with GSAP. Physics are simulated with Cannon.js.
      The game saves the local highscore to localStorage.`
    ),
    new Proj(
      "./img/mintex.jpg",
      "https://mintex.netlify.app",
      "https://github.com/R-zine/mintex",
      "A Web 3.0 minting site built on React/Vite using HardHat, Solidity, and featuring MetaMask wallet integration."
    ),
    new Proj(
      "./img/art.jpg",
      "https://ivanradevart.netlify.app",
      "https://github.com/R-zine/art",
      "My personal traditional paintings shop. Built on React/Router and Commerce.js. Payments are handled through Stripe."
    ),
    new Proj(
      "./img/snake.jpg",
      "https://r-zine.github.io/snake/",
      "https://github.com/R-zine/snake",
      "This is the classic snake game, featuring localStorage memory for user settings as well as highscore."
    ),
    new Proj(
      "./img/hangman.jpg",
      "https://r-zine.github.io/hangman/",
      "https://github.com/R-zine/hangman",
      "A hangman game with an on-screen keyboard, fetching random words off of an API. The right answer can be found in the console."
    ),

    new Proj(
      "./img/wiki.jpg",
      "https://r-zine.github.io/wiki-search/",
      "https://github.com/R-zine/wiki-search",
      "A real-time Wikipedia search page that offers search results with snippets together with voice recognition."
    ),
  ];
  useEffect(() => {
    setTimeout(() => {
      const projects = document.querySelectorAll(".Project-component");
      projects.forEach((p) => p.classList.remove("unloaded"));
    }, 700);
  }, []);
  return (
    <div className="Projects">
      {Projects.map((p, i) => (
        <ProjectComponent
          style={{ "--index": i }}
          key={nanoid()}
          img={p.img}
          description={p.description}
          source={p.sourceURL}
          demo={p.demoURL}
        />
      ))}
    </div>
  );
};

export default Projects;
