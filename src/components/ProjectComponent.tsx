import React, { type CSSProperties, useState } from "react";

interface ProjectComponentProps {
  style?: CSSProperties;
  title: string;
  img: string;
  description: string;
  source: string;
  demo: string;
}

const ProjectComponent = ({
  style,
  title,
  img,
  description,
  source,
  demo,
}: ProjectComponentProps) => {
  const [open, setOpen] = useState(false);

  return (
    <article
      className="Project-component"
      style={style}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <a
        className="project--main"
        href={demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the ${title} live demo`}
        aria-describedby={`${title.replace(/\s+/g, "-").toLowerCase()}-description`}
      >
        <img
          src={img}
          alt={`${title} project preview`}
          loading="lazy"
          decoding="async"
        />
      </a>
      <div className="project--btn--container">
        <a
          className="source-btn"
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View the source code for ${title}`}
        >
          Source
        </a>
      </div>
      <div
        className={open ? "project--sidebar open" : "project--sidebar"}
        id={`${title.replace(/\s+/g, "-").toLowerCase()}-description`}
      >
        <h2 className="project-title">{title}</h2>
        <p>{description}</p>
      </div>
    </article>
  );
};

export default ProjectComponent;
