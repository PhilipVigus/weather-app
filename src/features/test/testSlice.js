import { createSlice } from "@reduxjs/toolkit";

const initialState = "This is a test";

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {}
});

export default testSlice.reducer;
