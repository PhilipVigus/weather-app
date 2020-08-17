import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import WeatherContainer from "./WeatherContainer";
import * as weatherNowSlice from "./weatherSlice";

jest.mock("./weatherSlice");

const mockStore = configureStore([]);

describe("WeatherContainer", () => {
  it("calls dispatch on the redux store with the correct action", async () => {
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
          name: "location",
          cod: 200
        }
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router initialEntries={["/15"]}>
          <Route path="/:id">
            <WeatherContainer />
          </Route>
        </Router>
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(weatherNowSlice.getWeatherById).toHaveBeenCalledTimes(1);
    expect(weatherNowSlice.getWeatherById).toHaveBeenCalledWith("15");
  });
});
