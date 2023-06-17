import React, { useState } from "react";

const ProjectComponent = (props) => {
  const [open, setOpen] = useState(false);



  return (
    <div className="Project-component unloaded" style={props.style}>
      <div className="project--main">
        <img
          src={props.img}
          alt=""
          onClick={() => window.open(props.demo)}
          onMouseOver={() => setOpen(true)}
          onMouseOut={() => setOpen(false)}
        />
      </div>
      <div className="project--btn--container">
        <div className="source-btn" onClick={() => window.open(props.source)}>
          Source
        </div>
      </div>
      <div
        className={open ? "project--sidebar open" : "project--sidebar"}
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setOpen(false)}
      >
        {props.description}
      </div>
    </div>
  );
};

export default ProjectComponent;
