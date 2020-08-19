import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter as Router } from "react-router-dom";
import LocationList from "./LocationList";
import * as locationListSlice from "./locationListSlice";
import * as weatherSlice from "../weather/weatherSlice";
import londonWeatherNow from "../../fixtures/londonWeatherNow";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";
import locatioinsWithInitialLetterL from "../../fixtures/locationsWithInitialL";

jest.mock("./locationListSlice");
jest.mock("../weather/weatherSlice");

const mockStore = configureStore([]);

describe("LocationList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title", () => {
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
        <Router>
          <LocationList />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Location List/)).toBeInTheDocument();
  });

  it("dispatchs a fetchLocationsWithInitialLetter action when you press return", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: []
      },
      weather: {
        weather: {
          GPSAvailable: true
        }
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

  it("clears the textbox when it gains focus", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: true
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

  it("shows the full filtered list when there are 20 or fewer items on the list", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL.slice(0, 20)
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: true
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

    expect(
      screen.getByText(/L'Abbaye, Switzerland \(6\.30°, 46\.64°\)/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/L'Aulnois, Belgium \(4\.34°, 50\.51°\)/)
    ).toBeInTheDocument();
    expect(screen.queryByText(/matches/)).toBeNull();
  });

  it("shows the shortened filtered list with a summary of excess matches not shown", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: true
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

    expect(
      screen.getByText(/L'Aulnois, Belgium \(4\.34°, 50\.51°\)/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/L'Aunay, France \(0\.38°, 48\.73°\)/)
    ).toBeNull();

    expect(screen.getByText(/\+2 matches/)).toBeInTheDocument();
  });

  it("hides the filtered list when you click it", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: true
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
    const filteredLocation = screen.getByText(
      /L'Ametlla del Vallès, Spain \(2\.27°, 41\.67°\)/
    );
    fireEvent.click(filteredLocation);

    expect(
      screen.queryByText(/L'Ametlla del Vallès, Spain \(2\.27°, 41\.67°\)/)
    ).toBeNull();
  });

  it("hides the filtered list when you press enter", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: true
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

    expect(
      screen.queryByText(/L'Ametlla del Vallès, Spain \(2\.27°, 41\.67°\)/)
    ).toBeNull();
  });

  it("shows no matches if there are no filtered locations", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: true
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

  it("shows the button for setting the location to GPS", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: true
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

    expect(
      screen.getByRole("button", { name: "Where I am" })
    ).toBeInTheDocument();
  });

  it("the GPS button calls the getWeatherByGPS action", async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 51.1,
              longitude: 45.3
            }
          })
        )
      )
    };

    global.navigator.geolocation = mockGeolocation;

    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: true
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

    const button = screen.getByRole("button", { name: "Where I am" });
    fireEvent.click(button);

    expect(weatherSlice.getWeatherByGPS).toHaveBeenCalledTimes(1);
  });

  it("the GPS button is disabled when GPS is unavailable", async () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locatioinsWithInitialLetterL
      },
      weather: {
        now: londonWeatherNow,
        forecast: londonWeatherForecast,
        GPSAvailable: false
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

    const button = screen.getByRole("button", { name: "Where I am" });
    fireEvent.click(button);

    expect(weatherSlice.getWeatherByGPS).toHaveBeenCalledTimes(0);
  });
});
