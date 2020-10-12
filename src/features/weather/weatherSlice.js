import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = { GPSAvailable: true };
const OPENWEATHERMAP_API_URL = "https://api.openweathermap.org/data/2.5/";

export const getWeatherById = createAsyncThunk(
  "weather/getWeatherById",
  async (id) => {
    const nameResponse = await Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/locations/names/${id}`
    );

    const weatherResponse = await Axios.get(
      `${OPENWEATHERMAP_API_URL}weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}`
    );

    const forecastResponse = await Axios.get(
      `${OPENWEATHERMAP_API_URL}forecast?id=${id}&appid=${process.env.REACT_APP_API_KEY}`
    );

    weatherResponse.data.name = nameResponse.data.name;

    return { now: weatherResponse.data, forecast: forecastResponse.data };
  }
);

export const getWeatherByGPS = createAsyncThunk(
  "weather/getWeatherByGPS",
  async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            const weatherResponse = await Axios.get(
              `${OPENWEATHERMAP_API_URL}weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
            );

            const forecastResponse = await Axios.get(
              `${OPENWEATHERMAP_API_URL}forecast?id=${weatherResponse.data.id}&appid=${process.env.REACT_APP_API_KEY}`
            );

            const nameResponse = await Axios.get(
              `${process.env.REACT_APP_SERVER_URL}/locations/names/${weatherResponse.data.id}`
            );

            weatherResponse.data.name = nameResponse.data.name;

            resolve({
              now: weatherResponse.data,
              forecast: forecastResponse.data
            });
          },
          () => {
            reject(new Error("GPS failed"));
          }
        );
      } else {
        reject(new Error("GPS unavailable"));
      }
    });
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
    },
    [getWeatherByGPS.fulfilled]: (state, action) => {
      state.now = action.payload.now;
      state.forecast = action.payload.forecast;
    },
    [getWeatherByGPS.rejected]: (state) => {
      state.GPSAvailable = false;
    }
  }
});

export default weatherSlice.reducer;
