import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import reducer, {
  fetchLocationsWithInitialLetter,
  defaultLocationIdSet
} from "./locationListSlice";
import locationsWithInitialLetterL from "../../fixtures/locationsWithInitialL";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("store", () => {
  let axiosMock;

  beforeAll(() => {
    axiosMock = new MockAdapter(Axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  afterAll(() => {
    axiosMock.restore();
  });

  describe("locationListSlice", () => {
    it("creates an action when the data has been fetched", async () => {
      axiosMock.onGet().replyOnce(200, locationsWithInitialLetterL);

      const store = mockStore({
        locationList: { locations: [], cachedLetters: {} }
      });

      const result = await store.dispatch(fetchLocationsWithInitialLetter("l"));

      expect(result.type).toEqual(
        "locationList/locationsWithInitialLetterFetched/fulfilled"
      );

      expect(result.payload).toEqual({
        data: locationsWithInitialLetterL,
        letterToCache: "l",
        toCache: true
      });
    });

    describe("caching the returning data", () => {
      it("fetches the data if the data is not cached", async () => {
        axiosMock.onGet().replyOnce(200, locationsWithInitialLetterL);

        const store = mockStore({
          locationList: { locations: [], cachedLetters: {} }
        });

        await store.dispatch(fetchLocationsWithInitialLetter("l"));

        expect(axiosMock.history.get.length).toBe(1);
      });

      it("doesn't fetch the data if the data is cached", async () => {
        axiosMock.onGet().replyOnce(200, locationsWithInitialLetterL);

        const store = mockStore({
          locationList: {
            locations: [],
            cachedLetters: { l: locationsWithInitialLetterL }
          }
        });

        await store.dispatch(fetchLocationsWithInitialLetter("l"));

        expect(axiosMock.history.get.length).toBe(0);
      });
    });

    describe("reducer", () => {
      it("returns the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
          cachedLetters: {},
          locations: []
        });
      });

      it("handles fetchLocationsWithInitialLetter actions", () => {
        expect(
          reducer(
            { locations: [], cachedLetters: {} },
            {
              type: fetchLocationsWithInitialLetter.fulfilled.type,
              payload: {
                toCache: true,
                letterToCache: "l",
                data: locationsWithInitialLetterL
              }
            }
          )
        ).toEqual({
          cachedLetters: { l: locationsWithInitialLetterL },
          locations: locationsWithInitialLetterL
        });
      });

      it("handles defaultLocationIdSet actions", () => {
        expect(
          reducer(
            { locations: [], cachedLetters: {} },
            {
              type: defaultLocationIdSet.type,
              payload: "1"
            }
          )
        ).toEqual({
          cachedLetters: {},
          locations: [],
          defaultLocationId: "1"
        });
      });
    });
  });
});
