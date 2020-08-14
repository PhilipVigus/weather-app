import { configureStore } from "@reduxjs/toolkit";
import weatherNowReducer from "../features/weatherNow/weatherNowSlice";
import cityListReducer from "../features/cityList/locationListSlice";

export default configureStore({
  reducer: {
    weatherNow: weatherNowReducer,
    cityList: cityListReducer
  }
});
