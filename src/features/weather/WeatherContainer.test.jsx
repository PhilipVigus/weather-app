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
  it("calls dispatch on the redux store with the getWeatherById action", async () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: []
      },
      weather: {
        GPSAvailable: true
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

    expect(weatherNowSlice.getWeatherById).toHaveBeenCalledTimes(1);
    expect(weatherNowSlice.getWeatherById).toHaveBeenCalledWith("15");
  });
});
