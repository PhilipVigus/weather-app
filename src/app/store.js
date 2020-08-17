import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";
import locationListReducer from "../features/locationList/locationListSlice";

export default configureStore({
  reducer: {
    weather: weatherReducer,
    locationList: locationListReducer
  }
});
