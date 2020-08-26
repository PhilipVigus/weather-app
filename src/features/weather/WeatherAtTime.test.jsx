import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherAtTime from "./WeatherAtTime";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";

describe("WeatherAtTime", () => {
  it("Renders the weather details", () => {
    render(
      <WeatherAtTime
        weather={{ time: "Now", forecast: londonWeatherForecast.list[0] }}
      />
    );

    expect(screen.getByText(/Now/)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Clouds icon" })
    ).toBeInTheDocument();
    expect(screen.getByText(/19°/)).toBeInTheDocument();
    expect(screen.getByText(/82% humidity/)).toBeInTheDocument();
    expect(screen.getByText(/5 m\/s \(169°\)/)).toBeInTheDocument();
    expect(screen.getByText(/100% cloud coverage/)).toBeInTheDocument();
  });
});
