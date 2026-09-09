import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const installMatchMedia = () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
};

describe("App routing", () => {
  beforeEach(() => {
    installMatchMedia();
    window.history.pushState({}, "", "/");
  });

  test("renders the landing route and navigates to a lazy-loaded page", async () => {
    render(<App />);

    expect(await screen.findByRole("heading", { name: "Design. Execute." })).toBeVisible();

    userEvent.click(screen.getByRole("link", { name: "Contact." }));

    expect(await screen.findByLabelText("Name")).toBeRequired();
    expect(window.location.pathname).toBe("/contact");
  });

  test("renders an explicit recovery link for unknown routes", async () => {
    window.history.pushState({}, "", "/missing-page");
    render(<App />);

    expect(await screen.findByRole("heading", { name: "404" })).toBeVisible();
    userEvent.click(screen.getByRole("link", { name: "Return home" }));

    expect(await screen.findByRole("heading", { name: "Design. Execute." })).toBeVisible();
  });
});
