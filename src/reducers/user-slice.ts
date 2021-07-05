import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  interests: string[];
  courses: string[];
}
const initialState: IUserState = {
  interests: [],
  courses: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
