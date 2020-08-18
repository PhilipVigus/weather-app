import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import reducer, { getWeatherById, getWeatherByGPS } from "./weatherSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("store", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(Axios);
  });

  afterAll(() => {
    mock.restore();
  });

  describe("weatherNowSlice", () => {
    it("creates an action when getWeatherById is called", async () => {
      mock
        .onGet()
        .replyOnce(200, { name: "London" })
        .onGet()
        .replyOnce(200, {
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
          name: "London",
          cod: 200
        })
        .onGet()
        .replyOnce(200, { weather: "some weather" });

      const store = mockStore({ locations: [] });
      const result = await store.dispatch(getWeatherById(2643743));

      expect(result.type).toEqual("weather/getWeatherById/fulfilled");
      expect(result.payload).toEqual({
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
          name: "London",
          cod: 200
        },
        forecast: { weather: "some weather" }
      });
    });

    it("creates an action when getWeatherByGPS is called and is available", async () => {
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

      mock
        .onGet()
        .replyOnce(200, {
          coord: { lon: -0.13, lat: 51.51 },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ]
        })
        .onGet()
        .replyOnce(200, { weather: "a weather forecast" })
        .onGet()
        .replyOnce(200, { name: "London" });

      const store = mockStore({ locations: [] });
      const result = await store.dispatch(getWeatherByGPS());

      expect(result.type).toEqual("weather/getWeatherByGPS/fulfilled");
      expect(result.payload).toEqual({
        forecast: { weather: "a weather forecast" },
        now: {
          coord: { lat: 51.51, lon: -0.13 },
          name: "London",
          weather: [
            { description: "few clouds", icon: "02d", id: 801, main: "Clouds" }
          ]
        }
      });
    });

    it("creates throws an error when getWeatherByGPS is called and is unavailable", async () => {
      global.navigator.geolocation = undefined;

      mock
        .onGet()
        .replyOnce(200, {
          coord: { lon: -0.13, lat: 51.51 },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ]
        })
        .onGet()
        .replyOnce(200, { weather: "a weather forecast" })
        .onGet()
        .replyOnce(200, { name: "London" });

      const store = mockStore({ locations: [] });
      const result = await store.dispatch(getWeatherByGPS());

      expect(result.type).toEqual("weather/getWeatherByGPS/rejected");
    });

    describe("reducer", () => {
      it("returns the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
          GPSAvailable: true
        });
      });

      it("handles getWeatherByGPS actions when GPS is available", () => {
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

        expect(
          reducer(
            { GPSAvailable: true },
            {
              type: getWeatherByGPS.fulfilled.type,
              payload: {
                now: { weather: "good" },
                forecast: { weather: "bad" }
              }
            }
          )
        ).toEqual({
          GPSAvailable: true,
          now: { weather: "good" },
          forecast: { weather: "bad" }
        });
      });

      it("handles getWeatherByGPS actions when GPS is unavailable", () => {
        global.navigator.geolocation = undefined;

        expect(
          reducer(
            { GPSAvailable: true },
            {
              type: getWeatherByGPS.rejected.type,
              payload: {}
            }
          )
        ).toEqual({
          GPSAvailable: false
        });
      });
    });
  });
});
