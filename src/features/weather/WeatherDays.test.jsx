import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherDays from "./WeatherDays";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";
import londonWeatherNow from "../../fixtures/londonWeatherNow";

const mockStore = configureStore([]);

describe("WeatherDays", () => {
  it("renders the days in the forecast", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: []
      },
      weather: {
        weather: {
          GPSAvailable: true,
          now: londonWeatherNow
        }
      }
    });

    render(
      <Provider store={store}>
        <WeatherDays forecast={londonWeatherForecast} />
      </Provider>
    );

    expect(screen.getByText(/Wednesday/)).toBeInTheDocument();
    expect(screen.getByText(/Thursday/)).toBeInTheDocument();
    expect(screen.getByText(/Friday/)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/)).toBeInTheDocument();
    expect(screen.getByText(/Sunday/)).toBeInTheDocument();
  });
});
