import ReactDOM from "react-dom/client";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({ render: jest.fn() })),
}));

jest.mock("./App", () => () => <div>Portfolio app</div>);

test("mounts the application at the root element", () => {
  const renderRoot = jest.fn();
  const createRootMock = ReactDOM.createRoot as unknown as jest.Mock;
  createRootMock.mockReturnValue({ render: renderRoot });
  document.body.innerHTML = '<div id="root"></div>';

  jest.isolateModules(() => require("./index"));

  expect(createRootMock).toHaveBeenCalledWith(document.getElementById("root"));
  expect(renderRoot).toHaveBeenCalledTimes(1);
});
