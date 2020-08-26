/* eslint-disable no-extend-native */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Forecast from "./Forecast";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";
import londonWeatherNow from "../../fixtures/londonWeatherNow";

const mockStore = configureStore([]);

describe("Forecast", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders the loading message", () => {
    const store = mockStore({
      locationList: {
        locations: []
      },
      weather: { GPSAvailable: true }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <Forecast />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it("Renders the forecast", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const store = mockStore({
      locationList: {
        locations: []
      },
      weather: {
        forecast: londonWeatherForecast,
        now: londonWeatherNow,
        GPSAvailable: true
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <Forecast />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/82% humidity/)).toBeInTheDocument();
    expect(screen.getByText(/5 m\/s \(169°\)/)).toBeInTheDocument();
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
        now: londonWeatherNow,
        GPSAvailable: true
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <Forecast />
        </Router>
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Monday" });
    fireEvent.click(button);

    expect(scrollIntoViewMock).toBeCalledTimes(2);
  });
});
