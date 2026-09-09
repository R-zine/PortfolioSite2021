import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emailjs from "@emailjs/browser";
import type { EmailJSResponseStatus } from "@emailjs/browser";
import Contact from "./Contact";

jest.mock("@emailjs/browser", () => ({
  sendForm: jest.fn(),
}));

const sendFormMock = emailjs.sendForm as jest.MockedFunction<
  typeof emailjs.sendForm
>;

const fillForm = () => {
  userEvent.type(screen.getByLabelText("Name"), "Ada Lovelace");
  userEvent.type(screen.getByLabelText("Email"), "ada@example.com");
  userEvent.type(screen.getByLabelText("Subject"), "Portfolio enquiry");
  userEvent.type(screen.getByLabelText("Message"), "Hello from the test suite.");
};

describe("Contact", () => {
  beforeEach(() => {
    sendFormMock.mockReset();
  });

  test("associates labels with required contact fields", () => {
    render(<Contact />);

    ["Name", "Email", "Subject", "Message"].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeRequired();
    });
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "placeholder",
      "Message"
    );
  });

  test("keeps the form visible until EmailJS confirms delivery", async () => {
    let resolveRequest!: (response: EmailJSResponseStatus) => void;
    sendFormMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        })
    );
    render(<Contact />);
    fillForm();

    userEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    expect(screen.queryByText("Message sent.")).not.toBeInTheDocument();

    await act(async () =>
      resolveRequest({ status: 200, text: "OK" } as EmailJSResponseStatus)
    );

    expect(screen.getByRole("status")).toHaveTextContent("Message sent.");
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });

  test("shows a recoverable error instead of a false success message", async () => {
    sendFormMock.mockRejectedValue(new Error("Network unavailable"));
    render(<Contact />);
    fillForm();

    userEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The message could not be sent"
    );
    expect(screen.getByRole("button", { name: "Send" })).toBeEnabled();
    expect(screen.getByLabelText("Message")).toHaveValue(
      "Hello from the test suite."
    );
    expect(screen.queryByText("Message sent.")).not.toBeInTheDocument();
  });

  test("passes the form and configured identifiers to EmailJS", async () => {
    sendFormMock.mockResolvedValue({
      status: 200,
      text: "OK",
    } as EmailJSResponseStatus);
    render(<Contact />);
    fillForm();

    userEvent.click(screen.getByRole("button", { name: "Send" }));
    await screen.findByText("Message sent.");

    expect(sendFormMock).toHaveBeenCalledTimes(1);
    expect(sendFormMock.mock.calls[0].slice(0, 3)).toEqual([
      "service_0lnz0ab",
      "template_dw76dor",
      expect.any(HTMLFormElement),
    ]);
  });

  test("renders secure, named social profile links", () => {
    render(<Contact />);

    const github = screen.getByRole("link", { name: /on github/i });
    const linkedin = screen.getByRole("link", { name: /on linkedin/i });

    expect(github).toHaveAttribute("href", "https://github.com/R-zine");
    expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ivan-radev"
    );
    expect(github).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(linkedin).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    expect(github).toBeEmptyDOMElement();
    expect(linkedin).toBeEmptyDOMElement();
  });
});
