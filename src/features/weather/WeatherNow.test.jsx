import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter as Router } from "react-router-dom";
import WeatherNow from "./WeatherNow";

const mockStore = configureStore([]);

describe("WeatherNow", () => {
  let axiosMock;

  beforeAll(() => {
    axiosMock = new MockAdapter(Axios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    axiosMock.restore();
  });

  it("renders the heading", () => {
    const store = mockStore({
      locationList: {
        locations: []
      },
      weather: {
        now: {
          coord: { lon: -0.13, lat: 51.51 },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ],
          base: "stations",
          main: {
            temp: 304.61,
            feels_like: 305.31,
            temp_min: 304.15,
            temp_max: 305.93,
            pressure: 1013,
            humidity: 43
          },
          visibility: 10000,
          wind: { speed: 2.6, deg: 80 },
          clouds: { all: 13 },
          dt: 1597063048,
          sys: {
            type: 1,
            id: 1414,
            country: "GB",
            sunrise: 1597034324,
            sunset: 1597087983
          },
          timezone: 3600,
          id: 2643743,
          name: "London",
          cod: 200
        }
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
        locations: []
      },
      weather: {}
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
        locations: []
      },
      weather: {
        now: {
          coord: { lon: -0.13, lat: 51.51 },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ],
          base: "stations",
          main: {
            temp: 304.61,
            feels_like: 305.31,
            temp_min: 304.15,
            temp_max: 305.93,
            pressure: 1013,
            humidity: 43
          },
          visibility: 10000,
          wind: { speed: 2.6, deg: 80 },
          clouds: { all: 13 },
          dt: 1597063048,
          sys: {
            type: 1,
            id: 1414,
            country: "GB",
            sunrise: 1597034324,
            sunset: 1597087983
          },
          timezone: 3600,
          id: 2643743,
          name: "London",
          cod: 200
        }
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
    expect(screen.getByText(/Humidity = 43/)).toBeInTheDocument();
    expect(
      screen.getByText(/Wind = 2.6 m\/s \(80 degrees\)/)
    ).toBeInTheDocument();
    expect(screen.getByText(/13% cloud coverage/)).toBeInTheDocument();
  });
});