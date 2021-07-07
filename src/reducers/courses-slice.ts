import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCourses } from "../services/courses";
import stateStatus from "../utils/state-status";

interface IInitialCoursesState {
  courses: any[];
  status: any;
}
const initialState: IInitialCoursesState = {
  courses: [],
  status: {
    state: "idle",
  },
};

export const getAllCoursesAsync = createAsyncThunk(
  "courses/getAllCourses",
  async () => {
    const result = await getAllCourses();
    console.log("result from async", result);
    return result;
  }
);

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesAsync.pending, (state) => {
        stateStatus.loading(state, "getting courses");
      })
      .addCase(getAllCoursesAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.courses = action.payload.data;
      })
      .addCase(getAllCoursesAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get courses");
      });
  },
});

export const selectAllCourses = (state: any) => state.courses.courses;

export default coursesSlice.reducer;
