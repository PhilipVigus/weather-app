import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter as Router } from "react-router-dom";
import WeatherNow from "./WeatherNow";
import londonWeatherNow from "../../fixtures/londonWeatherNow";

const mockStore = configureStore([]);

describe("WeatherNow", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the heading", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: []
      },
      weather: {
        now: londonWeatherNow,
        GPSAvailable: true
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <WeatherNow />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Weather in London right now/)).toBeInTheDocument();
  });

  it("renders the loading message", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: []
      },
      weather: { GPSAvailable: true }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <WeatherNow />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it("renders the state value in the redux store", async () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: []
      },
      weather: {
        now: londonWeatherNow,
        GPSAvailable: true
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <WeatherNow />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Clouds/)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Clouds icon" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Temp = 31 C/)).toBeInTheDocument();
    expect(screen.getByText(/Humidity = 42/)).toBeInTheDocument();
    expect(
      screen.getByText(/Wind = 2.6 m\/s \(80 degrees\)/)
    ).toBeInTheDocument();
    expect(screen.getByText(/13% cloud coverage/)).toBeInTheDocument();
  });
});
