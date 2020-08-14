import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter as Router, Route } from "react-router-dom";
import Main from "./Main";

const mockStore = configureStore([]);

describe("Main", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the WeatherNow component", () => {
    const store = mockStore({
      cityList: {
        currentCity: "London",
        cities: []
      },
      weatherNow: {
        locations: [
          {
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
        ]
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Weather in London right now/)).toBeInTheDocument();
  });

  it("renders the CityList component", () => {
    const store = mockStore({
      cityList: {
        currentCity: "London",
        cities: []
      },
      weatherNow: {
        locations: [
          {
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
        ]
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Location List/)).toBeInTheDocument();
  });
});
