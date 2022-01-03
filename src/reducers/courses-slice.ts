import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCourses,
  getDetailedCourseById,
  postCourseRecommendation,
  toggleCourseLike,
} from "../services/courses";
import {
  ICourse,
  ICourseRecommendationSubmission,
  IDetailedCourse,
} from "../types";
import stateStatus from "../utils/state-status";

interface ICourseState {
  courses: ICourse[];
  coursesByTags: ICourse[];
  status: any;
  filter: string;
  currentCourseContext: IDetailedCourse | null;
  limit: number;
  skip: number;
  likeInProgress: boolean;
  likedCourseContext: ICourse | null;
}
const initialState: ICourseState = {
  courses: [],
  coursesByTags: [],
  filter: "all",
  status: {
    state: "idle",
  },
  currentCourseContext: null,
  limit: 1000,
  skip: 0,
  likeInProgress: false,
  likedCourseContext: null,
};

export const getAllCoursesAsync = createAsyncThunk(
  "courses/getAllCourses",
  async ({ limit, skip }: { limit: number; skip: number }) => {
    return getAllCourses({ limit, skip });
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

export const toggleCourseLikeAsync = createAsyncThunk(
  "courses/toggleCourseLikeAsync",
  async ({ id }: { id: string }) => {
    const res = await toggleCourseLike({ id });
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
    clearCurrentCourseContext(state) {
      state.currentCourseContext = null;
      state.likedCourseContext = null;
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
        stateStatus.error(state, "Unable to get courses");
      })
      .addCase(postCourseRecommendationAsync.pending, (state) => {
        stateStatus.loading(state, "posting course");
      })
      .addCase(postCourseRecommendationAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.courses = action.payload;
      })
      .addCase(postCourseRecommendationAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to post courses");
      })
      .addCase(getDetailedCourseByIdAsync.pending, (state) => {
        stateStatus.loading(state, "getting course...");
      })
      .addCase(getDetailedCourseByIdAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.currentCourseContext = action.payload;
        state.likedCourseContext = action.payload;
      })
      .addCase(getDetailedCourseByIdAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to retrieve course details");
      })
      .addCase(toggleCourseLikeAsync.pending, (state) => {
        stateStatus.loading(state, "processing like toggle");
        state.likeInProgress = true;
      })
      .addCase(toggleCourseLikeAsync.fulfilled, (state, action) => {
        stateStatus.idle(state, "processing like toggle");
        state.courses = action.payload.courses;
        if (
          state.currentCourseContext?._id === action.payload.courseChanged._id
        ) {
          state.likedCourseContext = action.payload.courseChanged;
        }
        state.likeInProgress = false;
      })
      .addCase(toggleCourseLikeAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to toggle like");
        state.likeInProgress = false;
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

export const selectCourseQueryType = (state: any) => {
  return state.courses.queryType;
};

export const selectLimit = (state: any) => {
  return state.courses.limit;
};

export const selectSkip = (state: any) => {
  return state.courses.courses.length;
};

export const selectCourseStateStatus = (state: any) => {
  return state.courses.status;
};
export const selectLikeInProgress = (state: any) => {
  return state.courses.likeInProgress;
};

export const selectCurrentCourseContextLike = (state: any) => {
  return state.courses.likedCourseContext;
};
export const { setCourseFilter, clearCurrentCourseContext } =
  coursesSlice.actions;
export default coursesSlice.reducer;
