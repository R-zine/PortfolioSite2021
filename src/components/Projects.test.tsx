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

    expect(screen.getByAltText("Portfolio 2023 project preview")).toHaveAttribute(
      "src",
      "/img/portfolio2023.jpg"
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
