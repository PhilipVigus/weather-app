import React from "react";
import { render, screen } from "@testing-library/react";
import CityList from "./CityList";

describe("CityList", () => {
  it("renders the title", () => {
    render(<CityList />);

    expect(screen.getByText(/City List/)).toBeInTheDocument();
  });

  it("renders the textbox", () => {
    render(<CityList />);

    expect(
      screen.getByRole("textbox", { name: "City Name" })
    ).toBeInTheDocument();
  });
});
