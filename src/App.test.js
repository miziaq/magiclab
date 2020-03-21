import React from "react";
import { render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/";
import App from "./App";

expect.extend({ toBeInTheDocument });

test("renders title", () => {
  const { getByTestId } = render(<App />);
  const titleElement = getByTestId("header");
  expect(titleElement).toBeInTheDocument();
});
