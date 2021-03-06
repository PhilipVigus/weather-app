import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter as Router } from "react-router-dom";
import Main from "./Main";
import londonWeatherNow from "../fixtures/londonWeatherNow";
import londonWeatherForecast from "../fixtures/londonWeatherForecast";
import locationsWithInitialL from "../fixtures/locationsWithInitialL";

const mockStore = configureStore([]);

describe("Main", () => {
  let store;

  beforeAll(() => {
    store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locationsWithInitialL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast
      }
    });

    store.dispatch = jest.fn();
  });

  it("renders the Header component", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    render(
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );

    expect(
      screen.getByRole("heading", { name: "Weather" })
    ).toBeInTheDocument();
  });

  it("renders the WeatherNow component", () => {
    render(
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/87% humidity/)).toBeInTheDocument();
  });

  it("renders the LocationList component", () => {
    render(
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText(/Enter location name/)
    ).toBeInTheDocument();
  });
});
