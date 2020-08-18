import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = { GPSAvailable: true };

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
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
            );

            const forecastResponse = await Axios.get(
              `https://api.openweathermap.org/data/2.5/forecast?id=${weatherResponse.data.id}&appid=${process.env.REACT_APP_API_KEY}`
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
        reject(new Error("GPS failed"));
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
