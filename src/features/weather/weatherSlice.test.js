import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import reducer, { getWeatherById, getWeatherByGPS } from "./weatherSlice";
import londonFullName from "../../fixtures/londonFullName";
import londonWeatherNow from "../../fixtures/londonWeatherNow";
import londonWeatherForecast from "../../fixtures/londonWeatherForecast";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("store", () => {
  let axiosMock;

  beforeAll(() => {
    axiosMock = new MockAdapter(Axios);
  });

  afterAll(() => {
    axiosMock.restore();
  });

  describe("weatherNowSlice", () => {
    it("creates an action when getWeatherById is called", async () => {
      axiosMock
        .onGet(/\/locations\/names\//)
        .replyOnce(200, londonFullName)
        .onGet(/https:\/\/api\.openweathermap\.org\/data\/2\.5\/weather/)
        .replyOnce(200, londonWeatherNow)
        .onGet(/https:\/\/api\.openweathermap\.org\/data\/2\.5\/forecast/)
        .replyOnce(200, londonWeatherForecast);

      londonWeatherNow.name = londonFullName.name;

      const store = mockStore({ GPSAvailable: true });
      const locationId = 1234; // doesn't matter what this value is
      const result = await store.dispatch(getWeatherById(locationId));

      expect(result.type).toEqual("weather/getWeatherById/fulfilled");
      expect(result.payload).toEqual({
        now: londonWeatherNow,
        forecast: londonWeatherForecast
      });
    });

    it("creates an action when getWeatherByGPS is called and is available", async () => {
      const mockGeolocation = {
        getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
          Promise.resolve(
            success({
              coords: {
                latitude: 50,
                longitude: 50
              }
            })
          )
        )
      };

      global.navigator.geolocation = mockGeolocation;

      axiosMock
        .onGet(/https:\/\/api\.openweathermap\.org\/data\/2\.5\/weather/)
        .replyOnce(200, londonWeatherNow)
        .onGet(/https:\/\/api\.openweathermap\.org\/data\/2\.5\/forecast/)
        .replyOnce(200, londonWeatherForecast)
        .onGet(/\/locations\/names\//)
        .replyOnce(200, londonFullName);

      londonWeatherNow.name = londonFullName.name;

      const store = mockStore({ locations: [] });
      const result = await store.dispatch(getWeatherByGPS());

      expect(result.type).toEqual("weather/getWeatherByGPS/fulfilled");
      expect(result.payload).toEqual({
        forecast: londonWeatherForecast,
        now: londonWeatherNow
      });
    });

    it("throws an error when getWeatherByGPS is called and is unavailable", async () => {
      global.navigator.geolocation = undefined;

      axiosMock
        .onGet(/https:\/\/api\.openweathermap\.org\/data\/2\.5\/weather/)
        .replyOnce(200, londonWeatherNow)
        .onGet(/https:\/\/api\.openweathermap\.org\/data\/2\.5\/forecast/)
        .replyOnce(200, londonWeatherForecast)
        .onGet(/\/locations\/names\//)
        .replyOnce(200, londonFullName);

      const store = mockStore({ locations: [] });
      const result = await store.dispatch(getWeatherByGPS());

      expect(result.type).toEqual("weather/getWeatherByGPS/rejected");
    });

    describe("reducer", () => {
      const sliceInitialState = { GPSAvailable: true };

      it("returns the initial state", () => {
        expect(reducer(undefined, {})).toEqual(sliceInitialState);
      });

      it("handles getWeatherByGPS actions when GPS is available", () => {
        const mockGeolocation = {
          getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
            Promise.resolve(
              success({
                coords: {
                  latitude: 50,
                  longitude: 50
                }
              })
            )
          )
        };

        global.navigator.geolocation = mockGeolocation;

        expect(
          reducer(sliceInitialState, {
            type: getWeatherByGPS.fulfilled.type,
            payload: {
              now: londonWeatherNow,
              forecast: londonWeatherForecast
            }
          })
        ).toEqual({
          GPSAvailable: true,
          now: londonWeatherNow,
          forecast: londonWeatherForecast
        });
      });

      it("handles getWeatherByGPS actions when GPS is unavailable", () => {
        global.navigator.geolocation = undefined;

        expect(
          reducer(sliceInitialState, {
            type: getWeatherByGPS.rejected.type,
            payload: {}
          })
        ).toEqual({
          GPSAvailable: false
        });
      });
    });
  });
});
