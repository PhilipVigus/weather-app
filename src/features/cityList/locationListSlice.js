import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = { locations: [] };

export const fetchLocationsWithInitialLetter = createAsyncThunk(
  "locationList/locationsWithInitialLetterFetched",
  async (letter) => {
    const result = await Axios.get(
      `https://weather-app-server-phil.herokuapp.com/cities/${letter}`
    );
    return result.data;
  }
);

const locationListSlice = createSlice({
  name: "locationList",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLocationsWithInitialLetter.fulfilled]: (state, action) => {
      state.locations = action.payload;
    }
  }
});

export default locationListSlice.reducer;
