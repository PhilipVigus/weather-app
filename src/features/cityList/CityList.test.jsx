import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter as Router, Route } from "react-router-dom";
import CityList from "./CityList";
import * as cityListSlice from "./cityListSlice";

jest.mock("./cityListSlice");

const mockStore = configureStore([]);

describe("CityList", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(Axios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders the title", () => {
    const store = mockStore({
      cityList: {
        currentCity: "London",
        cities: []
      },
      weatherNow: {
        locations: []
      }
    });

    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <CityList />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/City List/)).toBeInTheDocument();
  });

  it("dispatchs currentCitySet and getWeather actions when you press return", () => {
    const store = mockStore({
      cityList: {
        currentCity: "London",
        cities: []
      },
      weatherNow: {
        locations: []
      }
    });

    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <CityList />
        </Router>
      </Provider>
    );

    const textBox = screen.getByPlaceholderText(/Enter city name/);
    fireEvent.change(textBox, { target: { value: "Paris" } });
    fireEvent.focus(textBox);
    fireEvent.keyDown(textBox, { key: "Enter", code: "Enter" });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(cityListSlice.fetchCitiesWithInitialLetter).toHaveBeenCalledTimes(1);
    expect(cityListSlice.fetchCitiesWithInitialLetter).toHaveBeenCalledWith(
      "p"
    );
  });
});
