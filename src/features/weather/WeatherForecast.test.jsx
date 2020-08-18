/* eslint-disable no-extend-native */
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
        forecast: {
          list: [
            {
              dt: 1597676400,
              dt_txt: "2020-08-17 15:00:00",
              main: {
                humidity: 75,
                temp: 294.45
              },
              weather: [
                {
                  main: "Clear"
                }
              ],
              wind: {
                speed: 4.3,
                deg: 27
              },
              clouds: {
                all: 1
              }
            }
          ]
        }
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
        forecast: {
          list: [
            {
              dt: 1597676400,
              dt_txt: "2020-08-17 15:00:00",
              main: {
                humidity: 75,
                temp: 294.45
              },
              weather: [
                {
                  main: "Clear"
                }
              ],
              wind: {
                speed: 4.3,
                deg: 27
              },
              clouds: {
                all: 1
              }
            }
          ]
        }
      }
    });

    render(
      <Provider store={store}>
        <WeatherForecast />
      </Provider>
    );

    expect(screen.getByText(/Clear/)).toBeInTheDocument();
    expect(screen.getByText(/Temp = 21 C/)).toBeInTheDocument();
    expect(screen.getByText(/Humidity = 75/)).toBeInTheDocument();
    expect(
      screen.getByText(/Wind = 4.3 m\/s \(27 degrees\)/)
    ).toBeInTheDocument();
    expect(screen.getByText(/1% cloud coverage/)).toBeInTheDocument();

    Date.prototype.getTimezoneOffset = getTimezoneOffset;
  });
});
