import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter as Router } from "react-router-dom";
import LocationList from "./LocationList";
import * as locationListSlice from "./locationListSlice";

jest.mock("./locationListSlice");

const mockStore = configureStore([]);

describe("LocationList", () => {
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
      locationList: {
        locations: []
      },
      weatherNow: {
        weather: {}
      }
    });

    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Location List/)).toBeInTheDocument();
  });

  it("dispatchs fetchLocationsWithInitialLetter action when you press return", () => {
    const store = mockStore({
      locationList: {
        locations: []
      },
      weatherNow: {
        weather: {}
      }
    });

    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    const textBox = screen.getByPlaceholderText(/Enter location name/);
    fireEvent.change(textBox, { target: { value: "Paris" } });
    fireEvent.focus(textBox);
    fireEvent.keyDown(textBox, { key: "Enter", code: "Enter" });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(
      locationListSlice.fetchLocationsWithInitialLetter
    ).toHaveBeenCalledTimes(1);
    expect(
      locationListSlice.fetchLocationsWithInitialLetter
    ).toHaveBeenCalledWith("p");
  });

  it("clears the box when it gains focus", () => {
    const store = mockStore({
      locationList: {
        locations: []
      },
      weatherNow: {
        now: { name: "London" }
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    const textbox = screen.getByPlaceholderText(/Enter location name/);
    expect(textbox.value).toBe("London");
    fireEvent.focus(textbox);
    expect(textbox.value).toBe("");
  });

  it("shows the filtered list", () => {
    const store = mockStore({
      locationList: {
        locations: [
          { id: 1, name: "London" },
          { id: 2, name: "Liverpool" },
          { id: 3, name: "Lincoln" }
        ]
      },
      weatherNow: {
        weather: { now: { name: "London" } }
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    const textbox = screen.getByPlaceholderText(/Enter location name/);
    fireEvent.focus(textbox);
    fireEvent.change(textbox, { target: { value: "l" } });

    expect(screen.getByText(/London/)).toBeInTheDocument();
    expect(screen.getByText(/Liverpool/)).toBeInTheDocument();
    expect(screen.getByText(/Lincoln/)).toBeInTheDocument();
  });

  it("shows the shortened filtered list", () => {
    const store = mockStore({
      locationList: {
        locations: [
          { id: 1, name: "London" },
          { id: 2, name: "Liverpool" },
          { id: 3, name: "Lincoln" },
          { id: 4, name: "Liverpool" },
          { id: 5, name: "Liverpool" },
          { id: 6, name: "Liverpool" },
          { id: 7, name: "Liverpool" },
          { id: 8, name: "Liverpool" },
          { id: 9, name: "Liverpool" },
          { id: 10, name: "Liverpool" },
          { id: 11, name: "Liverpool" },
          { id: 12, name: "Liverpool" },
          { id: 13, name: "Liverpool" },
          { id: 14, name: "Liverpool" },
          { id: 15, name: "Liverpool" },
          { id: 16, name: "Liverpool" },
          { id: 17, name: "Liverpool" },
          { id: 18, name: "Liverpool" },
          { id: 19, name: "Liverpool" },
          { id: 20, name: "Liverpool" },
          { id: 21, name: "Liverpool" },
          { id: 22, name: "Liverpool" }
        ]
      },
      weatherNow: {
        weather: { now: { name: "London" } }
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    const textbox = screen.getByPlaceholderText(/Enter location name/);
    fireEvent.focus(textbox);
    fireEvent.change(textbox, { target: { value: "l" } });

    expect(screen.getByText(/\+2 matches/)).toBeInTheDocument();
  });

  it("hides the filtered list when you click it", () => {
    const store = mockStore({
      locationList: {
        locations: [
          { id: 1, name: "London" },
          { id: 2, name: "Liverpool" },
          { id: 3, name: "Lincoln" }
        ]
      },
      weatherNow: {
        weather: { now: { name: "London" } }
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    const textbox = screen.getByPlaceholderText(/Enter location name/);
    fireEvent.focus(textbox);
    fireEvent.change(textbox, { target: { value: "l" } });
    const london = screen.getByText(/London/);
    fireEvent.click(london);

    expect(screen.queryByText(/London/)).toBeNull();
    expect(screen.queryByText(/Liverpool/)).toBeNull();
    expect(screen.queryByText(/Lincoln/)).toBeNull();
  });

  it("hides the filtered list when you press enter", () => {
    const store = mockStore({
      locationList: {
        locations: [
          { id: 1, name: "London" },
          { id: 2, name: "Liverpool" },
          { id: 3, name: "Lincoln" }
        ]
      },
      weatherNow: {
        weather: { now: { name: "London" } }
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    const textbox = screen.getByPlaceholderText(/Enter location name/);
    fireEvent.focus(textbox);
    fireEvent.change(textbox, { target: { value: "l" } });
    fireEvent.keyDown(textbox, { key: "Enter", code: "Enter" });

    expect(screen.queryByText(/London/)).toBeNull();
    expect(screen.queryByText(/Liverpool/)).toBeNull();
    expect(screen.queryByText(/Lincoln/)).toBeNull();
  });

  it("shows no matches if there are no filtered locations", () => {
    const store = mockStore({
      locationList: {
        locations: [
          { id: 1, name: "London" },
          { id: 2, name: "Liverpool" },
          { id: 3, name: "Lincoln" }
        ]
      },
      weatherNow: {
        now: { name: "London" }
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    const textbox = screen.getByPlaceholderText(/Enter location name/);
    fireEvent.focus(textbox);
    fireEvent.change(textbox, { target: { value: "p" } });

    expect(screen.getByText(/No matches/)).toBeInTheDocument();
  });
});
