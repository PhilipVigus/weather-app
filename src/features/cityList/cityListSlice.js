import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = { currentCity: "", cities: [] };

export const getCities = createAsyncThunk(
  "cityList/getCity",
  async (letter) => {
    console.log("getting cities");
    const result = await Axios.get(
      `https://weather-app-server-phil.herokuapp.com/cities/${letter}`
    );
    console.log(result.data);
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
    [getCities.fulfilled]: (state, action) => {
      state.cities = [action.payload];
    }
  }
});

export const { currentCitySet } = cityListSlice.actions;
export const getCurrentCity = (state) => state.currentCity;

export default cityListSlice.reducer;
