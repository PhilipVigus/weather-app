import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherForecast from "./WeatherForecast";

const mockStore = configureStore([]);

describe("WeatherForecast", () => {
  it("Renders the title", () => {
    const store = mockStore({
      locationList: {
        locations: []
      },
      weather: {
        forecast: {}
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
      weather: {}
    });

    render(
      <Provider store={store}>
        <WeatherForecast />
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });
});
