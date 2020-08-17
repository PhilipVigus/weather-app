import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchLocationsWithInitialLetter } from "../features/locationList/locationListSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("store", () => {
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

  describe("fetchLocationsWithInitialLetter", () => {
    it("creates an action when the data has been fetched", async () => {
      mock.onGet().replyOnce(200, [
        { id: 1, name: "London" },
        { id: 2, name: "Liverpool" },
        { id: 3, name: "Lincoln" }
      ]);

      const store = mockStore({ locations: [] });
      const result = await store.dispatch(fetchLocationsWithInitialLetter("l"));
      console.log(result);

      expect(result.type).toEqual(
        "locationList/locationsWithInitialLetterFetched/fulfilled"
      );
      expect(result.payload).toEqual([
        { id: 1, name: "London" },
        { id: 2, name: "Liverpool" },
        { id: 3, name: "Lincoln" }
      ]);
    });
  });
});
