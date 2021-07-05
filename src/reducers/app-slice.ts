import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "idle",
  isLoggedIn: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
