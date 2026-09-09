import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "./Landing";

type MediaQueryListener = (event: MediaQueryListEvent) => void;

const installMatchMedia = (matches: boolean) => {
  const listeners = new Set<MediaQueryListener>();
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches,
    media: "(pointer: fine)",
    addEventListener: (_event: string, listener: MediaQueryListener) =>
      listeners.add(listener),
    removeEventListener: (_event: string, listener: MediaQueryListener) =>
      listeners.delete(listener),
  } as unknown as MediaQueryList));
  return listeners;
};

describe("Landing", () => {
  test("exposes the primary call to action as keyboard-operable links", () => {
    installMatchMedia(false);
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const projectLinks = screen.getAllByRole("link", { name: "View projects" });
    expect(projectLinks).toHaveLength(2);
    projectLinks.forEach((link) => expect(link).toHaveAttribute("href", "/projects"));
  });

  test("tracks a fine pointer without querying or mutating the document", () => {
    installMatchMedia(true);
    const { container } = render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    const circle = container.querySelector(".circle") as HTMLElement;

    fireEvent.mouseMove(window, { clientX: 120, clientY: 80 });

    expect(circle).toHaveStyle({ right: "120px", bottom: "80px" });
    expect(circle).not.toHaveClass("centered");
  });

  test("centers the animated control on pointer entry or keyboard focus", () => {
    installMatchMedia(true);
    const { container } = render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    const circle = container.querySelector(".circle") as HTMLElement;
    const primaryButton = container.querySelector(".btn") as HTMLElement;

    fireEvent.pointerEnter(circle);

    expect(circle).toHaveClass("centered");
    expect(primaryButton).toHaveClass("activated");
  });

  test("responds when the device pointer capability changes", () => {
    const listeners = installMatchMedia(true);
    const { container } = render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    act(() =>
      listeners.forEach((listener) =>
        listener({ matches: false } as MediaQueryListEvent)
      )
    );

    expect(container.querySelector(".circle")).toHaveClass("centered");
  });
});
