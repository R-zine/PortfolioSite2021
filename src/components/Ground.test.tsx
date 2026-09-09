import React from "react";
import { render, screen } from "@testing-library/react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Ground from "./Ground";

jest.mock("@react-three/fiber", () => ({
  useFrame: jest.fn(),
  useLoader: jest.fn(),
}));

jest.mock("@react-three/drei", () => ({
  MeshReflectorMaterial: ({
    resolution,
    blur,
  }: {
    resolution: number;
    blur: number[];
  }) => (
    <div
      data-testid="reflector-material"
      data-resolution={resolution}
      data-blur={blur.join(",")}
    />
  ),
}));

interface TextureStub {
  wrapS: number | null;
  wrapT: number | null;
  encoding: number | null;
  repeat: { set: jest.Mock };
  offset: { set: jest.Mock };
}

const createTexture = (): TextureStub => ({
  wrapS: null,
  wrapT: null,
  encoding: null,
  repeat: { set: jest.fn() },
  offset: { set: jest.fn() },
});

const useLoaderMock = useLoader as unknown as jest.Mock;
const useFrameMock = useFrame as unknown as jest.Mock;

describe("Ground", () => {
  let roughness: TextureStub;
  let normal: TextureStub;
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
    roughness = createTexture();
    normal = createTexture();
    useLoaderMock.mockReset();
    useLoaderMock.mockReturnValue([roughness, normal]);
    useFrameMock.mockReset();
    Object.defineProperty(process.env, "PUBLIC_URL", {
      configurable: true,
      value: "",
      writable: true,
    });
  });

  test("loads the original lossless, root-relative texture maps", () => {
    render(<Ground />);

    expect(useLoaderMock).toHaveBeenCalledWith(TextureLoader, [
      "/textures/rough.png",
      "/textures/normal.png",
    ]);
  });

  test("preserves the original reflection resolution and blur pass", () => {
    render(<Ground />);

    expect(screen.getByTestId("reflector-material")).toHaveAttribute(
      "data-resolution",
      "1024"
    );
    expect(screen.getByTestId("reflector-material")).toHaveAttribute(
      "data-blur",
      "700,300"
    );
  });

  test("configures and animates both textures", () => {
    render(<Ground />);

    expect(roughness.repeat.set).toHaveBeenCalledWith(2, 2);
    expect(normal.repeat.set).toHaveBeenCalledWith(2, 2);

    const updateFrame = useFrameMock.mock.calls[0][0] as (state: {
      clock: { getElapsedTime: () => number };
    }) => void;
    updateFrame({ clock: { getElapsedTime: () => 10 } });

    expect(roughness.offset.set).toHaveBeenLastCalledWith(0, -0.2);
    expect(normal.offset.set).toHaveBeenLastCalledWith(0, -0.2);
  });
});
