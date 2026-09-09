import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="Error">
      <h1>404</h1>
      <p>The page you requested could not be found.</p>
      <Link className="error-home" to="/">
        Return home
      </Link>
    </main>
  );
};

export default Error;
