import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ProjectComponent from "./ProjectComponent";

const project = {
  title: "Example Project",
  img: "/img/example.jpg",
  description: "An example project description.",
  source: "https://github.com/example/project",
  demo: "https://example.com/demo",
};

describe("ProjectComponent", () => {
  test("presents named and secure demo and source links", () => {
    render(<ProjectComponent {...project} />);

    const demo = screen.getByRole("link", { name: /open the example project/i });
    const source = screen.getByRole("link", { name: /source code for example/i });

    expect(demo).toHaveAttribute("href", project.demo);
    expect(source).toHaveAttribute("href", project.source);
    expect(demo).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByAltText("Example Project project preview")).toHaveAttribute(
      "loading",
      "lazy"
    );
  });

  test("reveals the project description on hover", () => {
    render(<ProjectComponent {...project} />);
    const article = screen.getByRole("article");
    const description = screen.getByText(project.description).parentElement;

    fireEvent.mouseEnter(article);
    expect(description).toHaveClass("open");

    fireEvent.mouseLeave(article);
    expect(description).not.toHaveClass("open");
  });

  test("reveals the description for keyboard focus", () => {
    render(<ProjectComponent {...project} />);
    const demo = screen.getByRole("link", { name: /open the example project/i });
    const description = screen.getByText(project.description).parentElement;

    fireEvent.focus(demo);
    expect(description).toHaveClass("open");

    fireEvent.blur(demo, { relatedTarget: document.body });
    expect(description).not.toHaveClass("open");
  });
});
