import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CityList from "./CityList";
import * as weatherNowSlice from "../weatherNow/weatherNowSlice";

jest.mock("../weatherNow/weatherNowSlice");

const mockStore = configureStore([]);

describe("CityList", () => {
  it("renders the title", () => {
    const store = mockStore({
      cityList: {
        currentCity: "London"
      }
    });
    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    expect(screen.getByText(/City List/)).toBeInTheDocument();
  });

  it("renders the textbox with it's initial value", () => {
    const store = mockStore({
      cityList: {
        currentCity: "London"
      }
    });
    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const textBox = screen.getByPlaceholderText(/Enter city name/);
    expect(textBox.value).toBe("London");
  });

  it("dispatchs currentCitySet and getWeather actions when you press return", () => {
    const store = mockStore({
      cityList: {
        currentCity: "London"
      }
    });

    store.dispatch = jest.fn();
    weatherNowSlice.getWeather = jest.fn();

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const textBox = screen.getByPlaceholderText(/Enter city name/);
    fireEvent.change(textBox, { target: { value: "Paris" } });
    fireEvent.click(textBox);
    fireEvent.keyDown(textBox, { key: "Enter", code: "Enter" });

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch.mock.calls[1][0]).toEqual({
      payload: { city: "Paris" },
      type: "cityList/currentCitySet"
    });
    expect(weatherNowSlice.getWeather).toHaveBeenCalledTimes(1);
    expect(weatherNowSlice.getWeather).toHaveBeenCalledWith("Paris");
  });
});
