import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CityList from "./CityList";

const mockStore = configureStore([]);

describe("CityList", () => {
  it("renders the title", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    expect(screen.getByText(/City List/)).toBeInTheDocument();
  });

  it("renders the textbox", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );
    expect(screen.getByText(/Enter city name/)).toBeInTheDocument();
  });
});
