import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCourses, postCourseRecommendation } from "../services/courses";
import { ICourse, ICourseRecommendationPost } from "../types";
import stateStatus from "../utils/state-status";

interface IInitialCoursesState {
  courses: ICourse[];
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
    return getAllCourses();
  }
);

export const postCourseRecommendationAsync = createAsyncThunk(
  "courses/postCourseRecommendation",
  async (data: ICourseRecommendationPost) => {
    const res = await postCourseRecommendation(data);
    console.log("Reducer res", res);
    return res;
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

export const selectAllCourses = (state: any) => state.courses.courses;

export default coursesSlice.reducer;
