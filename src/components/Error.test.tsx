import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Error from "./Error";

describe("Error", () => {
  test("explains the error and provides an explicit route home", () => {
    render(
      <MemoryRouter initialEntries={["/missing"]}>
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "404" })).toBeVisible();
    expect(screen.getByText(/could not be found/i)).toBeVisible();

    userEvent.click(screen.getByRole("link", { name: "Return home" }));
    expect(screen.getByRole("heading", { name: "Home page" })).toBeVisible();
  });
});
