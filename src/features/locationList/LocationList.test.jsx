import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter as Router, Route } from "react-router-dom";
import LocationList from "./LocationList";
import * as locationListSlice from "./locationListSlice";
import * as weatherSlice from "../weather/weatherSlice";
import londonWeatherNow from "../../fixtures/londonWeatherNow";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";
import locationsWithInitialLetterL from "../../fixtures/locationsWithInitialL";

jest.mock("./locationListSlice");
jest.mock("../weather/weatherSlice");

const mockStore = configureStore([]);

describe("LocationList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches a fetchLocationsWithInitialLetter action when change the first letter of the textbox", () => {
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

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(
      locationListSlice.fetchLocationsWithInitialLetter
    ).toHaveBeenCalledTimes(1);
    expect(
      locationListSlice.fetchLocationsWithInitialLetter
    ).toHaveBeenCalledWith("p");
  });

  it("dispatches defaultLocationIdSet when you click the home button", () => {
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
        <Router initialEntries={["/1"]}>
          <Route path="/:id">
            <LocationList />
          </Route>
        </Router>
      </Provider>
    );

    const homeButton = screen.getByRole("button", {
      name: "bookmark as your default location"
    });
    fireEvent.click(homeButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(locationListSlice.defaultLocationIdSet).toHaveBeenCalledTimes(1);
    expect(locationListSlice.defaultLocationIdSet).toHaveBeenCalledWith("1");
  });

  it("clears the textbox when it gains focus", () => {
    const store = mockStore({
      locationList: {
        cachedLetters: {},
        locations: locationsWithInitialLetterL
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

  describe("the filtered list", () => {
    it("shows the full filtered list when there are 20 or fewer items on the list", () => {
      const store = mockStore({
        locationList: {
          cachedLetters: {},
          locations: locationsWithInitialLetterL.slice(0, 20)
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
          locations: locationsWithInitialLetterL
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
          locations: locationsWithInitialLetterL
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
          locations: locationsWithInitialLetterL
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

    it("hides the filtered list when you press the search button", () => {
      const store = mockStore({
        locationList: {
          cachedLetters: {},
          locations: locationsWithInitialLetterL
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

      const searchButton = screen.getByRole("button", { name: "search" });
      fireEvent.click(searchButton);

      expect(
        screen.queryByText(/L'Ametlla del Vallès, Spain \(2\.27°, 41\.67°\)/)
      ).toBeNull();
    });

    it("shows no matches if there are no filtered locations", () => {
      const store = mockStore({
        locationList: {
          cachedLetters: {},
          locations: locationsWithInitialLetterL
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
  });

  describe("getting GPS location", () => {
    it("shows the button for setting the location to GPS", () => {
      const store = mockStore({
        locationList: {
          cachedLetters: {},
          locations: locationsWithInitialLetterL
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
        screen.getByRole("button", { name: "weather at my location" })
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
          locations: locationsWithInitialLetterL
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

      const button = screen.getByRole("button", {
        name: "weather at my location"
      });
      fireEvent.click(button);

      expect(weatherSlice.getWeatherByGPS).toHaveBeenCalledTimes(1);
    });

    it("the GPS button is disabled when GPS is unavailable", async () => {
      const store = mockStore({
        locationList: {
          cachedLetters: {},
          locations: locationsWithInitialLetterL
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

      const button = screen.getByRole("button", {
        name: "weather at my location"
      });
      fireEvent.click(button);

      expect(weatherSlice.getWeatherByGPS).toHaveBeenCalledTimes(0);
    });
  });

  describe("the home button", () => {
    it("dispatches a defaultLocationIDSet action when you click it", () => {
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
          <Router initialEntries={["/1"]}>
            <Route path="/:id">
              <LocationList />
            </Route>
          </Router>
        </Provider>
      );

      const homeButton = screen.getByRole("button", {
        name: "bookmark as your default location"
      });
      fireEvent.click(homeButton);

      expect(locationListSlice.defaultLocationIdSet).toHaveBeenCalledTimes(1);
      expect(locationListSlice.defaultLocationIdSet).toHaveBeenCalledWith("1");
    });
  });
});
