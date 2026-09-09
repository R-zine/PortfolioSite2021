import type { CSSProperties } from "react";
import ProjectComponent from "./ProjectComponent";
import { publicAsset } from "../utils/publicAsset";
import "./project.css";

export interface Project {
  id: string;
  title: string;
  img: string;
  demoURL: string;
  sourceURL: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: "portfolio-2023",
    title: "Portfolio 2023",
    img: "img/portfolio2023.jpg",
    demoURL: "https://ivanradev2023.netlify.app/",
    sourceURL: "https://github.com/R-zine/Portfolio-2023",
    description:
      "The new version of this website. Made entirely in 3D with React Three Fiber, Drei, and Rapier physics, powered by Redux Toolkit and GSAP.",
  },
  {
    id: "stacker",
    title: "Stacker",
    img: "img/stacker.jpg",
    demoURL: "https://stckr.netlify.app/",
    sourceURL: "https://github.com/R-zine/stackr",
    description:
      "A fully 3D game made using React Three Fiber and Drei. Animations are handled with GSAP, physics with Cannon.js, and the local high score is saved to localStorage.",
  },
  {
    id: "personal-paintings",
    title: "Personal Paintings",
    img: "img/art.jpg",
    demoURL: "https://ivanradevart.netlify.app",
    sourceURL: "https://github.com/R-zine/personal-paintings-website",
    description:
      "My traditional paintings shop, built with React and Redux Toolkit. Animations use GSAP and React Spring, and content is supplied through a custom WordPress API/CMS.",
  },
  {
    id: "next-snake",
    title: "Next Snake",
    img: "img/snake.jpg",
    demoURL: "https://next-snake-r-zine.vercel.app/",
    sourceURL: "https://github.com/R-zine/snake-next-js",
    description:
      "The classic Snake game made as a full-stack Next.js app, with Prisma and PostgreSQL for user profiles, settings, and high scores.",
  },
  {
    id: "item-hunter",
    title: "Item Hunter",
    img: "img/native.jpg",
    demoURL: "https://item-hunter-preview.netlify.app/",
    sourceURL: "https://github.com/R-zine/ItemHunter",
    description:
      "An AI-powered React Native game that awards points for finding real-world objects. It uses Expo, TensorFlow.js object recognition, and persisted Redux state.",
  },
  {
    id: "architect-portfolio",
    title: "Architect Portfolio",
    img: "img/arch.jpg",
    demoURL: "https://dradeva.netlify.app/",
    sourceURL: "https://github.com/R-zine/architect-portfolio",
    description:
      "A responsive architectural portfolio with custom animation treatments and a bespoke 3D model on the contact page.",
  },
  {
    id: "mintex",
    title: "Mintex",
    img: "img/mintex.jpg",
    demoURL: "https://mintex.netlify.app",
    sourceURL: "https://github.com/R-zine/mintex",
    description:
      "A Web3 minting site built with React and Vite, using Hardhat, Solidity, and MetaMask wallet integration.",
  },
  {
    id: "wiki-search",
    title: "Wiki Search",
    img: "img/wiki.jpg",
    demoURL: "https://r-zine.github.io/wiki-search/",
    sourceURL: "https://github.com/R-zine/wiki-search",
    description:
      "A real-time Wikipedia search page that presents result snippets and supports voice recognition.",
  },
];

const Projects = () => {
  return (
    <main className="Projects" aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="sr-only">
        Projects
      </h1>
      {projects.map((project, index) => (
        <ProjectComponent
          key={project.id}
          style={{ "--index": index } as CSSProperties}
          title={project.title}
          img={publicAsset(project.img)}
          description={project.description}
          source={project.sourceURL}
          demo={project.demoURL}
        />
      ))}
    </main>
  );
};

export default Projects;
