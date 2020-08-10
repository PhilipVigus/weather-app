import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../features/test/testSlice";
import weatherNowReducer from "../features/weatherNow/weatherNowSlice";

export default configureStore({
  reducer: {
    test: testReducer,
    weatherNow: weatherNowReducer
  }
});
