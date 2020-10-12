import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the heading", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", { name: "Weather" })
    ).toBeInTheDocument();
  });
});
