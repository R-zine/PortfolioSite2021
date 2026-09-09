import React from "react";
import { act, render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("shows the current year and descriptive logo text", () => {
    render(<Footer />);

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeVisible();
    expect(screen.getByAltText("R-design logo")).toBeInTheDocument();
  });

  test("runs its staged animation through component refs", () => {
    const { container } = render(<Footer />);
    const name = container.querySelector(".name");
    const job = container.querySelector(".job");
    const logo = screen.getByAltText("R-design logo");

    act(() => jest.advanceTimersByTime(1500));
    expect(name).not.toHaveClass("name-start");
    expect(job).not.toHaveClass("job-start");

    act(() => jest.advanceTimersByTime(4500));
    expect(name).toHaveClass("name-mid");
    expect(job).toHaveClass("job-mid");

    act(() => jest.advanceTimersByTime(1200));
    expect(name).toHaveClass("lifted");
    expect(logo).toHaveClass("shown");
  });

  test("cleans up animation timers when unmounted", () => {
    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");
    const { unmount } = render(<Footer />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(3);
    clearTimeoutSpy.mockRestore();
  });
});
