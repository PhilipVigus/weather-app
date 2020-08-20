import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherDay from "./WeatherDay";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";
import londonWeatherNow from "../../fixtures/londonWeatherNow";

const mockStore = configureStore([]);

describe("WeatherDay", () => {
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
        <WeatherDay
          forecast={{
            day: "Monday",
            forecast: londonWeatherForecast.list.slice(0, 3)
          }}
          today
        />
      </Provider>
    );

    expect(screen.getByText(/Monday/)).toBeInTheDocument();
    expect(screen.getByText(/10:00/)).toBeInTheDocument();
    expect(screen.getByText(/13:00/)).toBeInTheDocument();
    expect(screen.getByText(/16:00/)).toBeInTheDocument();
  });
});
