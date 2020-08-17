import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getWeatherById } from "./weatherNowSlice";

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
    it("creates an action when the data has been fetched", async () => {
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
        });

      const store = mockStore({ locations: [] });
      const result = await store.dispatch(getWeatherById(2643743));

      expect(result.type).toEqual("weatherNow/getWeatherById/fulfilled");
      expect(result.payload).toEqual({
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
      });
    });
  });
});
