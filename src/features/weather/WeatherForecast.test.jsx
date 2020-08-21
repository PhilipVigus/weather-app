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

    expect(screen.getByText(/82% humidity/)).toBeInTheDocument();
    expect(
      screen.getByText(/Wind = 4.64 m\/s \(169 degrees\)/)
    ).toBeInTheDocument();

    Date.prototype.getTimezoneOffset = getTimezoneOffset;
  });

  it("Calls scrollIntoView when you click a day button", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

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

    const button = screen.getByRole("button", { name: "Monday" });
    fireEvent.click(button);

    expect(scrollIntoViewMock).toBeCalled();
  });
});
