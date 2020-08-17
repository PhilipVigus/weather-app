import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {};

export const getWeatherById = createAsyncThunk(
  "weather/getWeatherById",
  async (id) => {
    const nameResponse = await Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/locations/names/${id}`
    );

    const weatherResponse = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}`
    );
    weatherResponse.data.name = nameResponse.data.name;

    const forecastResponse = await Axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${process.env.REACT_APP_API_KEY}`
    );

    return { now: weatherResponse.data, forecast: forecastResponse.data };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: {
    [getWeatherById.fulfilled]: (state, action) => {
      state.now = action.payload.now;
      state.forecast = action.payload.forecast;
    }
  }
});

export default weatherSlice.reducer;
