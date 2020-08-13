import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = { currentCity: "", cities: [] };

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
  reducers: {
    currentCitySet: {
      reducer(state, action) {
        state.currentCity = action.payload.city;
      },
      prepare(city) {
        return {
          payload: {
            city
          }
        };
      }
    }
  },
  extraReducers: {
    [fetchCitiesWithInitialLetter.fulfilled]: (state, action) => {
      state.cities = action.payload;
    }
  }
});

export const { currentCitySet } = cityListSlice.actions;
export const getCurrentCity = (state) => state.currentCity;
export const getCitiesList = (state) => state.cities;

export default cityListSlice.reducer;
