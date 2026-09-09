import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const hasFinePointer = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(pointer: fine)").matches;

interface MousePosition {
  x: number | null;
  y: number | null;
}

const Landing = () => {
  const [mousePos, SetMousePos] = useState<MousePosition>({ x: null, y: null });
  const [hasMouse, setHasMouse] = useState(hasFinePointer);
  const [centered, setCentered] = useState(false);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => SetMousePos({ x: event.clientX, y: event.clientY }),
    []
  );

  useEffect(() => {
    const pointerQuery = window.matchMedia?.("(pointer: fine)");
    if (!pointerQuery) return undefined;

    const handlePointerChange = (event: MediaQueryListEvent) =>
      setHasMouse(event.matches);
    pointerQuery.addEventListener?.("change", handlePointerChange);

    return () =>
      pointerQuery.removeEventListener?.("change", handlePointerChange);
  }, []);

  useEffect(() => {
    if (!hasMouse || centered) return undefined;

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [centered, handleMouseMove, hasMouse]);

  const circleIsCentered =
    !hasMouse || centered || mousePos.x === null || mousePos.y === null;
  const circleStyle =
    hasMouse &&
    !circleIsCentered &&
    mousePos.x !== null &&
    mousePos.y !== null
      ? { right: mousePos.x, bottom: mousePos.y }
      : undefined;

  const centerCircle = () => setCentered(true);

  return (
    <main className="Landing">
      <Link
        to="/projects"
        className={`btn${centered ? " activated" : ""}`}
        aria-label="View projects"
      >
        <h2 className="landing-btn main-btn">Projects</h2>

        <h1 className="slogan">Design. Execute.</h1>
      </Link>
      <Link
        to="/projects"
        className={`circle${circleIsCentered ? " centered" : ""}`}
        style={circleStyle}
        onPointerEnter={centerCircle}
        onFocus={centerCircle}
        aria-label="View projects"
      />
    </main>
  );
};

export default Landing;
