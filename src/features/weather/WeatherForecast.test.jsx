/* eslint-disable no-extend-native */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherForecast from "./WeatherForecast";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";

const mockStore = configureStore([]);

describe("WeatherForecast", () => {
  it("Renders the loading message", () => {
    const store = mockStore({
      locationList: {
        locations: []
      },
      weather: { GPSAvailable: true }
    });

    render(
      <Provider store={store}>
        <WeatherForecast />
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it("Renders the forecast", () => {
    const { getTimezoneOffset } = Date.prototype;
    Date.prototype.getTimezoneOffset = () => {
      return -60;
    };

    const store = mockStore({
      locationList: {
        locations: []
      },
      weather: {
        forecast: londonWeatherForecast,
        GPSAvailable: true
      }
    });

    render(
      <Provider store={store}>
        <WeatherForecast />
      </Provider>
    );

    expect(screen.getByText(/Clouds/)).toBeInTheDocument();
    expect(screen.getByText(/82% humidity/)).toBeInTheDocument();
    expect(
      screen.getByText(/Wind = 4.64 m\/s \(169 degrees\)/)
    ).toBeInTheDocument();

    Date.prototype.getTimezoneOffset = getTimezoneOffset;
  });

  it("Change the day displayed when you click the button", () => {
    const { getTimezoneOffset } = Date.prototype;
    Date.prototype.getTimezoneOffset = () => {
      return -60;
    };

    const store = mockStore({
      locationList: {
        locations: []
      },
      weather: {
        forecast: londonWeatherForecast,
        GPSAvailable: true
      }
    });

    render(
      <Provider store={store}>
        <WeatherForecast />
      </Provider>
    );

    const thursdayButton = screen.getByRole("button", { name: "Thursday" });
    fireEvent.click(thursdayButton);

    expect(screen.getByText(/01:00/)).toBeInTheDocument();

    Date.prototype.getTimezoneOffset = getTimezoneOffset;
  });
});
