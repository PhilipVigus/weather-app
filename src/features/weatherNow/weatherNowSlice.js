import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = { london: "" };

export const getWeather = createAsyncThunk(
  "weatherNow/getWeather",
  async () => {
    const result = await Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.REACT_APP_API_KEY}`
    );
    return result.data;
  }
);

const weatherNowSlice = createSlice({
  name: "weatherNow",
  initialState,
  reducers: {},
  extraReducers: {
    [getWeather.fulfilled]: (state, action) => {
      state.london = action.payload;
    }
  }
});

export default weatherNowSlice.reducer;
