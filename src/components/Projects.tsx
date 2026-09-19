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
    id: "portfolio-2024",
    title: "Portfolio 2024",
    img: "img/portfolio2024.jpg",
    demoURL: "https://ivanradev.site/",
    sourceURL: "https://github.com/R-zine/Portfolio-2024",
    description:
      "My current developer portfolio uses Astro as a shared shell for React, Svelte, Vue, Angular, and HTMX experiences. Its 3D landing scene loads only on capable devices, with an accessible HTML fallback and automated coverage for navigation and responsive behavior.",
  },
  {
    id: "aiditorial",
    title: "AIditorial",
    img: "img/aiditorial.jpg",
    demoURL: "https://aiditorial.netlify.app/",
    sourceURL: "https://github.com/R-zine/aiditorial",
    description:
      "A privacy-focused writing editor that runs a language model locally through WebLLM and WebGPU. It supports chat, focused edits, document imports, resumable batch processing, and local history without sending the user's writing to an application server.",
  },
  {
    id: "wasm-benchmark",
    title: "WebAssembly Benchmark",
    img: "img/wasm-benchmark.jpg",
    demoURL: "https://wasmbenchmark.netlify.app/",
    sourceURL: "https://github.com/R-zine/awesome-algo-benchmark",
    description:
      "A reproducible browser benchmark comparing sorting algorithms across JavaScript and WebAssembly builds produced with AssemblyScript, Rust, C, C++, Go, and Zig. It uses seeded data, isolated workers, correctness checks, robust statistics, and data export.",
  },
  {
    id: "rust-model-viewer",
    title: "Rust WebGL Model Viewer",
    img: "img/rust-model-viewer.jpg",
    demoURL: "https://rusty-model-viewer.netlify.app/",
    sourceURL: "https://github.com/R-zine/3D-model-viewer--Rust",
    description:
      "A low-level WebGL2 renderer written in Rust and compiled to WebAssembly. It loads binary glTF scenes with transforms, instancing, textures, materials, and multiple primitive modes while explicitly managing GPU resources and the WebAssembly lifecycle.",
  },
  {
    id: "go-model-viewer",
    title: "Go WebGL Model Viewer",
    img: "img/go-model-viewer.jpg",
    demoURL: "https://goland-model-viewer.netlify.app/",
    sourceURL: "https://github.com/R-zine/3D-model-viewer-go",
    description:
      "A GLB 2.0 renderer and parser written in Go and compiled to WebAssembly. It uses browser WebGL2 APIs for strict parsing, scene hierarchies, mesh primitives, embedded textures, materials, responsive rendering, and deterministic GPU cleanup.",
  },
  {
    id: "unfair-pong",
    title: "Unfair Pong",
    img: "img/unfair-pong.jpg",
    demoURL: "https://unfair-pong.netlify.app/",
    sourceURL: "https://github.com/R-zine/PyPong",
    description:
      "A browser game that pits the player against a NEAT-trained agent. Points earned by returning balls can be spent on deliberately unfair upgrades, while the versioned neural network runs directly in the TypeScript client.",
  },
  {
    id: "portfolio-2023",
    title: "Portfolio 2023",
    img: "img/portfolio2023.jpg",
    demoURL: "https://ivanradev2023.netlify.app/",
    sourceURL: "https://github.com/R-zine/Portfolio-2023",
    description:
      "An experimental, desktop-first 3D portfolio. React Three Fiber and Drei render its scenes, Rapier provides physics, Redux Toolkit manages application state, and GSAP drives motion.",
  },
  {
    id: "stackr",
    title: "Stackr",
    img: "img/stacker.jpg",
    demoURL: "https://stckr.netlify.app/",
    sourceURL: "https://github.com/R-zine/stackr",
    description:
      "A responsive 3D shape-stacking game with square, wide, round, and triangular pieces. Each successful placement increases the speed, and a missed placement sends the completed tower into a physics simulation.",
  },
  {
    id: "personal-paintings",
    title: "Traditional Paintings",
    img: "img/art.jpg",
    demoURL: "https://ivanradevart.netlify.app/",
    sourceURL: "https://github.com/R-zine/paitings-website-v2",
    description:
      "A traditional-painting portfolio and storefront built with Astro and React. Local content produces a fast static deployment, while Nanostores, React Spring, and GSAP power the interactive storefront.",
  },
  {
    id: "item-hunter",
    title: "Item Hunter",
    img: "img/native.jpg",
    demoURL: "https://item-hunter-preview.netlify.app/",
    sourceURL: "https://github.com/R-zine/ItemHunter",
    description:
      "A React Native scavenger-hunt game in which players select everyday objects and validate finds with on-device image classification. It uses Apple Vision on iOS, Google ML Kit on Android, and stores progress locally.",
  },
  {
    id: "architect-portfolio",
    title: "Architect Portfolio",
    img: "img/arch.jpg",
    demoURL: "https://dradeva.com/",
    sourceURL: "https://github.com/R-zine/architect-portfolio",
    description:
      "A responsive portfolio for an architect and interior designer, featuring image-rich project galleries, animated route transitions, and a custom 3D contact scene.",
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
