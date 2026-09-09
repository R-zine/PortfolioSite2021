import { publicAsset } from "./publicAsset";

describe("publicAsset", () => {
  test("returns a root-relative URL when PUBLIC_URL is empty", () => {
    expect(publicAsset("textures/rough.jpg", "")).toBe("/textures/rough.jpg");
  });

  test("supports applications deployed below the domain root", () => {
    expect(publicAsset("/diamond.gltf", "/portfolio/")).toBe(
      "/portfolio/diamond.gltf"
    );
  });

  test("normalizes extra leading slashes in the asset path", () => {
    expect(publicAsset("///img/wiki.jpg", "/portfolio")).toBe(
      "/portfolio/img/wiki.jpg"
    );
  });
});
