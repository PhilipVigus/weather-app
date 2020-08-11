import { configureStore } from "@reduxjs/toolkit";
import weatherNowReducer from "../features/weatherNow/weatherNowSlice";

export default configureStore({
  reducer: {
    weatherNow: weatherNowReducer
  }
});
