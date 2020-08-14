import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = { locations: [] };

export const getWeatherById = createAsyncThunk(
  "weatherNow/getWeatherById",
  async (id) => {
    const result = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}`
    );
    return result.data;
  }
);

const weatherNowSlice = createSlice({
  name: "weatherNow",
  initialState,
  reducers: {},
  extraReducers: {
    [getWeatherById.fulfilled]: (state, action) => {
      state.locations = [action.payload];
    }
  }
});

export default weatherNowSlice.reducer;
