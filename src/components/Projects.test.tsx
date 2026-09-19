import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Projects, { projects } from "./Projects";

describe("Projects", () => {
  test("renders every project with a title, preview, demo, and source", () => {
    render(<Projects />);

    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    projects.forEach(({ title }) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: `Open the ${title} live demo` })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: `View the source code for ${title}` })
      ).toBeInTheDocument();
    });
  });

  test("uses root-relative image URLs at the domain root", () => {
    render(<Projects />);

    expect(screen.getByAltText("Portfolio 2024 project preview")).toHaveAttribute(
      "src",
      "/img/portfolio2024.jpg"
    );
  });

  test("matches the current Netlify-hosted project set", () => {
    expect(projects.map(({ id }) => id)).toEqual([
      "portfolio-2024",
      "aiditorial",
      "wasm-benchmark",
      "rust-model-viewer",
      "go-model-viewer",
      "unfair-pong",
      "portfolio-2023",
      "stackr",
      "personal-paintings",
      "item-hunter",
      "architect-portfolio",
    ]);
    expect(projects.every(({ demoURL }) => demoURL.startsWith("https://"))).toBe(
      true
    );
  });

  test("preserves child state when the project list rerenders", () => {
    const { rerender } = render(<Projects />);
    const firstArticle = screen.getAllByRole("article")[0];

    fireEvent.mouseEnter(firstArticle);
    expect(firstArticle.querySelector(".project--sidebar")).toHaveClass("open");

    rerender(<Projects />);
    expect(screen.getAllByRole("article")[0].querySelector(".project--sidebar")).toHaveClass(
      "open"
    );
  });
});
