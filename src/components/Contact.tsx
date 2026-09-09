import React, { type FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const formElement = form.current;
    if (!formElement) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(
        "service_0lnz0ab",
        "template_dw76dor",
        formElement,
        process.env.REACT_APP_EMAIL_API
      );
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="Contact">
      <div className="invoke intro-overlay" aria-hidden="true">
        <h2 className="invoke-text">Connect.</h2>
      </div>
      {status !== "sent" ? (
        <div className="contact-form">
          <form ref={form} onSubmit={sendEmail}>
            <label className="sr-only" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="name"
              required
            />
            <label className="sr-only" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              required
            />
            <label className="sr-only" htmlFor="contact-subject">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              placeholder="Subject"
              autoComplete="off"
              required
            />
            <label className="sr-only" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Message"
              autoComplete="off"
              required
            />
            <button
              className="contact-submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
            {status === "error" && (
              <p className="form-error" role="alert">
                The message could not be sent. Please try again.
              </p>
            )}
          </form>
          <nav className="contact-socials" aria-label="Social profiles">
            <a
              className="github"
              href="https://github.com/R-zine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ivan Radev on GitHub"
            />
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/ivan-radev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ivan Radev on LinkedIn"
            />
          </nav>
        </div>
      ) : (
        <p className="message-sent" role="status">
          Message sent.
        </p>
      )}
    </main>
  );
};

export default Contact;
