import { configureStore } from "@reduxjs/toolkit";
import weatherNowReducer from "../features/weatherNow/weatherNowSlice";
import cityListReducer from "../features/locationList/locationListSlice";

export default configureStore({
  reducer: {
    weatherNow: weatherNowReducer,
    cityList: cityListReducer
  }
});
