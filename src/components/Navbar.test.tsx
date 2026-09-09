import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Navbar";

const RouterProbe = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <output aria-label="Current path">{location.pathname}</output>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
    </>
  );
};

describe("Navbar", () => {
  const renderNavigation = (initialPath = "/") =>
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Navbar />
        <Routes>
          <Route path="*" element={<RouterProbe />} />
        </Routes>
      </MemoryRouter>
    );

  test("uses semantic links and identifies the active page", () => {
    renderNavigation("/projects");

    expect(screen.getByRole("navigation", { name: /primary/i })).toBeVisible();
    expect(screen.getByRole("link", { name: "Projects." })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Home." })).not.toHaveAttribute(
      "aria-current"
    );
  });

  test("pushes navigation so browser Back returns to the previous page", () => {
    renderNavigation();

    userEvent.click(screen.getByRole("link", { name: "Projects." }));
    expect(screen.getByLabelText("Current path")).toHaveTextContent("/projects");

    userEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByLabelText("Current path")).toHaveTextContent("/");
  });

  test("provides secure external profile links", () => {
    renderNavigation();

    const github = screen.getByRole("link", { name: /on github/i });
    const linkedin = screen.getByRole("link", { name: /on linkedin/i });

    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ivan-radev"
    );
  });
});
