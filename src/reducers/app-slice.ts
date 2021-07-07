import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkIsAuthed from "../services/auth/check-if-authorized";
import stateStatus from "../utils/state-status";

const initialState = {
  status: {
    state: "idle",
  },
  isLoggedIn: false,
};

export const checkIsAuthedAsync = createAsyncThunk(
  "app/checkAuth",
  async (): Promise<any> => {
    console.log("async function called here! 14");
    const res = await checkIsAuthed();
    return res;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIsAuthedAsync.pending, (state) => {
        stateStatus.loading(state, "getting logged in status");
      })
      .addCase(checkIsAuthedAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        console.log("31 action payload", action.payload);
        state.isLoggedIn = action.payload;
      })
      .addCase(checkIsAuthedAsync.rejected, (state) => {
        stateStatus.error("can't do this");
        console.log("error in checking if logged in");
      });
  },
});

export const selectIsLoggedIn = (state: any) => state.app.isLoggedIn;
export default appSlice.reducer;
