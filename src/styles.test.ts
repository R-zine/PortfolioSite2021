import { readFileSync } from "fs";
import { join } from "path";

type Declarations = Record<string, string>;

const readStylesheet = (relativePath: string) =>
  readFileSync(join(process.cwd(), "src", relativePath), "utf8");

const readPublicFile = (relativePath: string) =>
  readFileSync(join(process.cwd(), "public", relativePath), "utf8");

const declarationsFor = (stylesheet: string, selector: string) => {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const rulePattern = new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`, "g");

  return Array.from(stylesheet.matchAll(rulePattern), ({ 1: body }) =>
    body
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split(";")
      .reduce<Declarations>((declarations, entry) => {
        const separator = entry.indexOf(":");
        if (separator === -1) return declarations;

        const property = entry.slice(0, separator).trim();
        const value = entry.slice(separator + 1).trim().replace(/\s+/g, " ");
        if (property) declarations[property] = value;
        return declarations;
      }, {})
  );
};

describe("layout regression contracts", () => {
  test("paints a black background before stylesheets or JavaScript load", () => {
    const documentTemplate = readPublicFile("index.html");
    const head = documentTemplate.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
    const criticalStyle =
      head.match(
        /<style data-critical-background>([\s\S]*?)<\/style>/
      )?.[1] ?? "";

    expect(criticalStyle).toMatch(
      /html,\s*body,\s*#root\s*\{[^}]*background-color:\s*#000;/
    );
    expect(criticalStyle).toMatch(/body\s*\{[^}]*margin:\s*0;/);
    expect(head.indexOf("<style data-critical-background>")).toBeLessThan(
      head.indexOf('<link rel="preconnect"')
    );
  });

  test("keeps the project information panel inside the card border", () => {
    const stylesheet = readStylesheet("components/project.css");
    const [basePanel, ...responsivePanels] = declarationsFor(
      stylesheet,
      ".project--sidebar"
    );
    const [openPanel] = declarationsFor(stylesheet, ".open");

    expect(basePanel).toEqual(
      expect.objectContaining({
        bottom: "1px",
        left: "1px",
        right: "1px",
        width: "auto",
      })
    );
    expect(openPanel).not.toHaveProperty("bottom");
    expect(openPanel).not.toHaveProperty("margin-bottom");
    responsivePanels.forEach((panel) => {
      expect(panel).not.toHaveProperty("bottom");
      expect(panel).not.toHaveProperty("left");
      expect(panel).not.toHaveProperty("right");
      expect(panel).not.toHaveProperty("width");
      expect(panel).not.toHaveProperty("margin-bottom");
    });
  });

  test("preserves the deployed navbar box model at every breakpoint", () => {
    const stylesheet = readStylesheet("App.css");
    const [navbar] = declarationsFor(stylesheet, ".Navbar");
    const [navbarLink] = declarationsFor(stylesheet, ".navbar-link");
    const [socialLink] = declarationsFor(stylesheet, ".social-link");
    const iconContainers = declarationsFor(stylesheet, ".navbar-icons");

    expect(navbar).toEqual(
      expect.objectContaining({
        "box-sizing": "content-box",
        "min-width": "100vw !important",
      })
    );
    expect(navbarLink["box-sizing"]).toBe("content-box");
    expect(navbarLink).not.toHaveProperty("display");
    expect(socialLink["line-height"]).toBe("0");
    expect(socialLink).not.toHaveProperty("min-width");
    expect(iconContainers.map(({ width }) => width)).toEqual([
      "100px",
      "80px",
      "50px",
    ]);
  });

  test("preserves the contact placeholder and original social artwork", () => {
    const stylesheet = readStylesheet("App.css");
    const [placeholder] = declarationsFor(
      stylesheet,
      ".contact-form textarea::placeholder"
    );
    const [contact] = declarationsFor(stylesheet, ".Contact");
    const [input] = declarationsFor(stylesheet, ".contact-form input");
    const [textarea] = declarationsFor(stylesheet, ".contact-form textarea");
    const [github] = declarationsFor(stylesheet, ".github");
    const [linkedin] = declarationsFor(stylesheet, ".linkedin");

    expect(placeholder).toEqual(
      expect.objectContaining({
        color: "rgba(255, 255, 255, 0.527)",
        opacity: "1",
      })
    );
    expect(contact["box-sizing"]).toBe("content-box");
    expect(input["box-sizing"]).toBe("content-box");
    expect(textarea["box-sizing"]).toBe("content-box");
    expect(github).toEqual(
      expect.objectContaining({
        "background-image": 'url("./assets/git-square-brands.svg")',
        "background-position-x": "93%",
        "box-sizing": "content-box",
        "padding-right": "6vw",
        width: "6vw",
      })
    );
    expect(linkedin).toEqual(
      expect.objectContaining({
        "background-image": 'url("./assets/linkedin-brands.svg")',
        "background-position-x": "10px",
        "box-sizing": "content-box",
        "padding-right": "6vw",
        width: "6vw",
      })
    );
  });
});
