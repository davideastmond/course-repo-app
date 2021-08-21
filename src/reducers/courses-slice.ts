import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCourses,
  getDetailedCourseById,
  postCourseRecommendation,
} from "../services/courses";
import {
  CourseQueryType,
  ICourse,
  ICourseRecommendationSubmission,
  IDetailedCourse,
} from "../types";
import stateStatus from "../utils/state-status";

interface IInitialCoursesState {
  courses: ICourse[];
  status: any;
  filter: string;
  currentCourseContext: IDetailedCourse | null;
  limit: number;
  queryType: CourseQueryType;
}
const initialState: IInitialCoursesState = {
  courses: [],
  filter: "all",
  status: {
    state: "idle",
  },
  currentCourseContext: null,
  limit: 2,
  queryType: CourseQueryType.All,
};

export const getAllCoursesAsync = createAsyncThunk(
  "courses/getAllCourses",
  async ({
    limit,
    skip,
    queryType,
  }: {
    limit: number;
    skip: number;
    queryType: CourseQueryType;
  }) => {
    return getAllCourses({ limit, skip, queryType });
  }
);

export const postCourseRecommendationAsync = createAsyncThunk(
  "courses/postCourseRecommendation",
  async ({
    data,
    setDone,
    successHandler,
  }: {
    data: ICourseRecommendationSubmission;
    setDone: (done: boolean) => void;
    successHandler: (success: boolean) => void;
  }) => {
    const res = await postCourseRecommendation(data, setDone, successHandler);
    return res;
  }
);

export const getDetailedCourseByIdAsync = createAsyncThunk(
  "courses/getCourseByIdAsync",
  async ({ id }: { id: string }) => {
    const res = await getDetailedCourseById(id);
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
    setCourseQueryType(state, action: { payload: CourseQueryType }) {
      state.queryType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesAsync.pending, (state) => {
        stateStatus.loading(state, "getting courses");
      })
      .addCase(getAllCoursesAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.courses = [...state.courses, ...action.payload];
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
      })
      .addCase(getDetailedCourseByIdAsync.pending, (state) => {
        stateStatus.loading(state, "getting course...");
      })
      .addCase(getDetailedCourseByIdAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.currentCourseContext = action.payload;
      })
      .addCase(getDetailedCourseByIdAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to retrieve course details");
      });
  },
});

export const selectAllCourses = (state: any) => {
  if (state.courses.filter === "all") return state.courses.courses;
  return state.courses.courses.filter(
    (course: ICourse) => course.category === state.courses.filter
  );
};

export const selectCurrentCourseContext = (state: any) => {
  return state.courses.currentCourseContext;
};

export const selectCourseSkip = (state: any) => {
  return state.courses.courses.length;
};

export const selectCourseLimit = (state: any) => {
  return state.courses.limit;
};

export const selectCourseQueryType = (state: any) => {
  return state.courses.queryType;
};

export const { setCourseFilter, setCourseQueryType } = coursesSlice.actions;
export default coursesSlice.reducer;
