import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCourses, postCourseRecommendation } from "../services/courses";
import {
  ICourse,
  ICourseRecommendationPost,
  ICourseRecommendationSubmission,
} from "../types";
import stateStatus from "../utils/state-status";

interface IInitialCoursesState {
  courses: ICourse[];
  status: any;
  filter: string;
}
const initialState: IInitialCoursesState = {
  courses: [],
  filter: "all",
  status: {
    state: "idle",
  },
};

export const getAllCoursesAsync = createAsyncThunk(
  "courses/getAllCourses",
  async () => {
    return getAllCourses();
  }
);

export const postCourseRecommendationAsync = createAsyncThunk(
  "courses/postCourseRecommendation",
  async (data: ICourseRecommendationSubmission) => {
    const res = await postCourseRecommendation(data);
    return res;
  }
);

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourseFilter(state, action: { payload: string }) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesAsync.pending, (state) => {
        stateStatus.loading(state, "getting courses");
      })
      .addCase(getAllCoursesAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.courses = action.payload;
      })
      .addCase(getAllCoursesAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get courses");
      })
      .addCase(postCourseRecommendationAsync.pending, (state) => {
        stateStatus.loading(state, "posting course");
      })
      .addCase(postCourseRecommendationAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.courses = action.payload;
      })
      .addCase(postCourseRecommendationAsync.rejected, (state) => {
        stateStatus.error(state, "unable to post courses");
      });
  },
});

export const selectAllCourses = (state: any) => {
  if (state.courses.filter === "all") return state.courses.courses;
  return state.courses.courses.filter(
    (course: ICourse) => course.category === state.courses.filter
  );
};
export const { setCourseFilter } = coursesSlice.actions;
export default coursesSlice.reducer;
