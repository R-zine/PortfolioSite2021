import React from "react";
import { render } from "@testing-library/react";
import { useGLTF } from "@react-three/drei";
import Model from "./Diamond";

jest.mock("@react-three/drei", () => {
  const mockedUseGLTF = Object.assign(jest.fn(), { preload: jest.fn() });
  return { useGLTF: mockedUseGLTF };
});

const createModel = () => {
  const nodes: Record<string, { geometry: string }> = {};
  const materials: Record<string, string> = {};

  for (let index = 1; index <= 10; index += 1) {
    nodes[`Cone_${index}`] = { geometry: `geometry-${index}` };
    materials[`SVGMat.${String(index).padStart(3, "0")}`] = `material-${index}`;
  }

  return { nodes, materials };
};

const useGLTFMock = useGLTF as unknown as jest.Mock;

describe("Diamond model", () => {
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
    useGLTFMock.mockReset();
    useGLTFMock.mockReturnValue(createModel());
  });

  test("loads the model from a root-relative public URL", () => {
    render(<Model clicked={false} />);

    expect(useGLTFMock).toHaveBeenCalledWith("/diamond.gltf");
  });

  test("renders every generated mesh", () => {
    const { container } = render(<Model clicked={false} />);

    expect(container.querySelectorAll("mesh")).toHaveLength(10);
  });

  test("changes the inner group rotation when activated", () => {
    const { container, rerender } = render(<Model clicked={false} />);
    const innerGroup = container.querySelectorAll("group")[1];
    const initialRotation = innerGroup.getAttribute("rotation");

    rerender(<Model clicked />);

    expect(container.querySelectorAll("group")[1].getAttribute("rotation")).not.toBe(
      initialRotation
    );
  });
});
