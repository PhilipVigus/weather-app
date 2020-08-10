import React from "react";
import { render, screen } from "@testing-library/react";
import Main from "./Main";

test("renders Hello World", () => {
  render(<Main />);
  expect(screen.getByText(/Hello World/)).toBeInTheDocument();
});
