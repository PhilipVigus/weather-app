import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDays from "./WeatherDays";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";

describe("WeatherDays", () => {
  it("renders the days in the forecast", () => {
    render(<WeatherDays forecast={londonWeatherForecast} />);

    expect(screen.getByText(/Wednesday/)).toBeInTheDocument();
    expect(screen.getByText(/Thursday/)).toBeInTheDocument();
    expect(screen.getByText(/Friday/)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/)).toBeInTheDocument();
    expect(screen.getByText(/Sunday/)).toBeInTheDocument();
  });
});
