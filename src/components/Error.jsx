import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="Error" onClick={() => navigate(-1)}>
      <h1> 404 </h1>
    </div>
  );
};

export default Error;
