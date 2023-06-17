import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0lnz0ab",
        "template_dw76dor",
        form.current,
        process.env.REACT_APP_EMAIL_API
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setSent(true);
  };

  useEffect(() => {
    let invoke = document.querySelector(".invoke");

    setTimeout(() => {
      invoke.style.opacity = "0";
    }, 2000);
    setTimeout(() => {
      invoke.style.display = "none";
    }, 4000);
  }, []);

  return (
    <div className="Contact">
      <div className="invoke">
        <h2 className="invoke-text">Connect.</h2>
      </div>
      {!sent ? (
        <div className="contact-form">
          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              autocomplete="off"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              autocomplete="off"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              autocomplete="off"
            />
            <textarea name="message" autocomplete="off" />
            <input type="submit" value={"Send"} />
          </form>
          <div
            className="github"
            onClick={() => window.open("https://github.com/R-zine")}
          />
          <div
            className="linkedin"
            onClick={() => window.open("http://www.linkedin.com/in/ivan-radev")}
          />
        </div>
      ) : (
        <div className="message-sent">Message sent.</div>
      )}
    </div>
  );
};

export default Contact;
