import { configureStore } from "@reduxjs/toolkit";
import weatherNowReducer from "../features/weatherNow/weatherNowSlice";
import locationListReducer from "../features/locationList/locationListSlice";

export default configureStore({
  reducer: {
    weatherNow: weatherNowReducer,
    locationList: locationListReducer
  }
});
