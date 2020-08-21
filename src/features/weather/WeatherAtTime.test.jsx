import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherAtTime from "./WeatherAtTime";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";

describe("WeatherAtTime", () => {
  it("Renders the weather details", () => {
    render(
      <WeatherAtTime
        forecast={{ time: "Now", forecast: londonWeatherForecast.list[0] }}
      />
    );

    expect(screen.getByText(/Now/)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Clouds icon" })
    ).toBeInTheDocument();
    expect(screen.getByText(/19 C/)).toBeInTheDocument();
    expect(screen.getByText(/82% humidity/)).toBeInTheDocument();
    expect(
      screen.getByText(/Wind = 4\.64 m\/s \(169 degrees\)/)
    ).toBeInTheDocument();
    expect(screen.getByText(/100% cloud coverage/)).toBeInTheDocument();
  });
});
