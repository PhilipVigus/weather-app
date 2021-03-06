import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
  locations: [],
  cachedLetters: {},
  defaultLocationId: localStorage.getItem("weatherApp-defaultLocationId")
};

export const fetchLocationsWithInitialLetter = createAsyncThunk(
  "locationList/locationsWithInitialLetterFetched",
  async (letter, thunkAPI) => {
    if (thunkAPI.getState().locationList.cachedLetters[letter]) {
      return {
        toCache: false,
        data: thunkAPI.getState().locationList.cachedLetters[letter]
      };
    } else {
      const result = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/locations/${letter}`
      );
      return {
        toCache: true,
        letterToCache: letter,
        data: result.data
      };
    }
  }
);

const locationListSlice = createSlice({
  name: "locationList",
  initialState,
  reducers: {
    defaultLocationIdSet: {
      reducer(state, action) {
        state.defaultLocationId = action.payload;
        localStorage.setItem("weatherApp-defaultLocationId", action.payload);
      },
      prepare(id) {
        return {
          payload: id
        };
      }
    }
  },
  extraReducers: {
    [fetchLocationsWithInitialLetter.fulfilled]: (state, action) => {
      if (action.payload.toCache) {
        state.cachedLetters[action.payload.letterToCache] = action.payload.data;
      }
      state.locations = action.payload.data;
    }
  }
});

export const { defaultLocationIdSet } = locationListSlice.actions;
export default locationListSlice.reducer;
