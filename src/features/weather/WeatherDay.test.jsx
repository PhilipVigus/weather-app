import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDay from "./WeatherDay";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";

describe("WeatherDay", () => {
  it("renders the days in the forecast", () => {
    render(
      <WeatherDay
        forecast={{
          day: "Monday",
          forecast: londonWeatherForecast.list.slice(0, 3)
        }}
      />
    );

    expect(screen.getByText(/Monday/)).toBeInTheDocument();
    expect(screen.getByText(/10:00/)).toBeInTheDocument();
    expect(screen.getByText(/13:00/)).toBeInTheDocument();
    expect(screen.getByText(/16:00/)).toBeInTheDocument();
  });
});
