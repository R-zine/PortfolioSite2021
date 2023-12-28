import { useEffect } from "react";
import ProjectComponent from "./ProjectComponent";
import { Proj } from "../functions/functions";
import { nanoid } from "nanoid";
import "./project.css";

const Projects = () => {
  const Projects = [
    new Proj(
      "./img/portfolio2023.jpg",
      "https://ivanradev2023.netlify.app/",
      "https://github.com/R-zine/Portfolio-2023",
      `The new version of this website. Made entirely in 3D with React-Fiber with Drei and Rapier physics, powered by Redux Toolkit and GSAP.`
    ),
    new Proj(
      "./img/stacker.jpg",
      "https://stckr.netlify.app/",
      "https://github.com/R-zine/stackr",
      `A fully 3D game made using react-three-fiber/react-three-drei (React integration of three.js). 
      Animations are handled with GSAP. Physics are simulated with Cannon.js.
      The game saves the local highscore to localStorage.`
    ),
    new Proj(
      "./img/art.jpg",
      "https://ivanradevart.netlify.app",
      "https://github.com/R-zine/personal-paintings-website",
      "My personal traditional paintings shop. Built on React with Redux Toolkit. Animations are handled by GSAP and React Spring. The site uses custom Wordpress API/CMS."
    ),
    new Proj(
      "./img/snake.jpg",
      "https://next-snake-r-zine.vercel.app/",
      "https://github.com/R-zine/snake-next-js",
      "This is the classic snake game made as a full-stack NextJS app with Prisma for backend/DB management and PostgreSQL for saving user profiles, settings, and highscores."
    ),
    new Proj(
      "./img/native.jpg",
      "https://item-hunter-preview.netlify.app/",
      "https://github.com/R-zine/ItemHunter",
      "An AI-powered game in which the user gets points when they find one of 300 items in the real world. This App is built on React Native (Expo) and has TensorFlowJS object recognition. The score and current selection are handled via Redux with persistors. The built .APK is available in the GitHub repository."
    ),
    new Proj(
      "./img/arch.jpg",
      "https://dradeva.netlify.app/",
      "https://github.com/R-zine/architect-portfolio",
      "An architectural portfolio website, featuring many different types of animations and an unique styling approach. The website is fully responsive and has a custom 3D model in the contacts' page."
    ),
    new Proj(
      "./img/mintex.jpg",
      "https://mintex.netlify.app",
      "https://github.com/R-zine/mintex",
      "A Web 3.0 minting site built on React/Vite using HardHat, Solidity, and featuring MetaMask wallet integration."
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
