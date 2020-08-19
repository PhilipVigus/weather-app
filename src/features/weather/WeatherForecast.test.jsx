/* eslint-disable no-extend-native */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherForecast from "./WeatherForecast";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";

const mockStore = configureStore([]);

describe("WeatherForecast", () => {
  it("Renders the title", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
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

    expect(screen.getByText(/Forecast/)).toBeInTheDocument();
  });

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

    expect(screen.getAllByText(/Clear/).length).toBe(9);
    expect(screen.getAllByText(/Temp = 21 C/).length).toBe(7);
    expect(screen.getByText(/Humidity = 82/)).toBeInTheDocument();
    expect(
      screen.getByText(/Wind = 4.73 m\/s \(235 degrees\)/)
    ).toBeInTheDocument();
    expect(screen.getByText(/99% cloud coverage/)).toBeInTheDocument();

    Date.prototype.getTimezoneOffset = getTimezoneOffset;
  });
});
