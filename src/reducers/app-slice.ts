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
    return checkIsAuthed();
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
        state.isLoggedIn = action.payload;
      })
      .addCase(checkIsAuthedAsync.rejected, (state) => {
        stateStatus.error(state, "can't do this");
      });
  },
});

export const selectIsLoggedIn = (state: any) => state.app.isLoggedIn;
export default appSlice.reducer;
