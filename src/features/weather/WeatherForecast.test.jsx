import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherForecast from "./WeatherForecast";

describe("WeatherForecast", () => {
  it("Renders the title", () => {
    render(<WeatherForecast />);

    expect(screen.getByText(/Forecast/)).toBeInTheDocument();
  });
});
