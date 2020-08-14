import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = { cities: [] };

export const fetchCitiesWithInitialLetter = createAsyncThunk(
  "cityList/fetchCitiesWithInitialLetter",
  async (letter) => {
    const result = await Axios.get(
      `https://weather-app-server-phil.herokuapp.com/cities/${letter}`
    );
    return result.data;
  }
);

const cityListSlice = createSlice({
  name: "cityList",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCitiesWithInitialLetter.fulfilled]: (state, action) => {
      state.cities = action.payload;
    }
  }
});

export const getCitiesList = (state) => state.cities;

export default cityListSlice.reducer;
