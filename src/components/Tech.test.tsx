import React, { type MouseEventHandler, type ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import gsap from "gsap";
import Tech from "./Tech";

interface CanvasMockProps {
  children: ReactNode;
  frameloop: string;
  dpr: number[];
}

interface CubeCameraMockProps {
  children: (texture: string) => ReactNode;
  frames: number;
}

interface ModelMockProps {
  onPointerOver: MouseEventHandler<HTMLButtonElement>;
  onPointerOut: MouseEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  clicked: boolean;
}

jest.mock("gsap", () => ({
  __esModule: true,
  default: {
    to: jest.fn(() => ({ kill: jest.fn() })),
  },
}));

jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children, frameloop, dpr }: CanvasMockProps) => (
    <div
      data-testid="canvas"
      data-frameloop={frameloop}
      data-dpr={dpr.join(",")}
    >
      {children}
    </div>
  ),
}));

jest.mock("@react-three/drei", () => ({
  CubeCamera: ({ children, frames }: CubeCameraMockProps) => (
    <div data-testid="cube-camera" data-frames={frames}>
      {children("environment-texture")}
    </div>
  ),
  Environment: () => null,
  OrbitControls: ({ autoRotate }: { autoRotate: boolean }) => (
    <div data-testid="orbit-controls" data-auto-rotate={String(autoRotate)} />
  ),
  PerspectiveCamera: () => null,
}));

jest.mock("@react-three/postprocessing", () => ({
  EffectComposer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Bloom: () => null,
  ChromaticAberration: () => null,
  DepthOfField: () => null,
}));

jest.mock("postprocessing", () => ({
  BlendFunction: { ADD: "ADD", NORMAL: "NORMAL" },
}));

jest.mock("./Diamond", () => ({
  __esModule: true,
  default: ({
    onPointerOver,
    onPointerOut,
    onClick,
    clicked,
  }: ModelMockProps) => (
    <button
      type="button"
      data-testid="diamond-model"
      data-clicked={String(clicked)}
      onMouseEnter={onPointerOver}
      onMouseLeave={onPointerOut}
      onClick={onClick}
    >
      Diamond
    </button>
  ),
}));

jest.mock("./Ground", () => () => <div data-testid="ground" />);

type MediaQueryListener = (event: MediaQueryListEvent) => void;

const installMatchMedia = (matches: boolean) => {
  const listeners = new Set<MediaQueryListener>();
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: (_event: string, listener: MediaQueryListener) =>
      listeners.add(listener),
    removeEventListener: (_event: string, listener: MediaQueryListener) =>
      listeners.delete(listener),
  } as unknown as MediaQueryList));
  return listeners;
};

const gsapToMock = gsap.to as unknown as jest.Mock;

describe("Tech", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    const originalConsoleError = console.error;
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation((message, ...args) => {
      const expectedReactThreeWarning =
        /incorrect casing|is unrecognized in this browser|does not recognize the/.test(
          String(message)
        );
      if (!expectedReactThreeWarning) originalConsoleError(message, ...args);
    });
  });

  afterAll(() => consoleErrorSpy.mockRestore());

  beforeEach(() => {
    gsapToMock.mockReset();
    gsapToMock.mockImplementation(() => ({ kill: jest.fn() }));
  });

  test("caps pixel density and continuously updates cube reflections", () => {
    installMatchMedia(false);
    render(<Tech />);

    expect(screen.getByTestId("canvas")).toHaveAttribute("data-dpr", "1,1.5");
    expect(screen.getByTestId("cube-camera")).toHaveAttribute(
      "data-frames",
      "Infinity"
    );
  });

  test("uses demand rendering and stops rotation for reduced motion", () => {
    installMatchMedia(true);
    render(<Tech />);

    expect(screen.getByTestId("canvas")).toHaveAttribute(
      "data-frameloop",
      "demand"
    );
    expect(screen.getByTestId("orbit-controls")).toHaveAttribute(
      "data-auto-rotate",
      "false"
    );
  });

  test("animates light intensity from an effect after model interaction", () => {
    installMatchMedia(false);
    render(<Tech />);
    gsapToMock.mockClear();

    fireEvent.mouseEnter(screen.getByTestId("diamond-model"));

    expect(gsapToMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ intensity: 0.8, duration: 1.5 })
    );
    expect(gsapToMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ intensity: 0.5, duration: 1.5 })
    );
  });

  test("toggles through direct diamond interaction without a separate control", () => {
    installMatchMedia(false);
    render(<Tech />);
    const model = screen.getByTestId("diamond-model");

    expect(model).toHaveAttribute("data-clicked", "false");
    expect(
      screen.queryByRole("button", { name: /(?:rotate|reset) diamond/i })
    ).not.toBeInTheDocument();

    fireEvent.click(model);
    expect(model).toHaveAttribute("data-clicked", "true");

    fireEvent.click(model);
    expect(model).toHaveAttribute("data-clicked", "false");
  });
});
