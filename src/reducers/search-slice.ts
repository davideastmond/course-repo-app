import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailedCourseById, toggleCourseLike } from "../services/courses";
import { doSearch } from "../services/search";
import { ICourse } from "../types";
import { ISearchResults } from "../types/search.types";
import { sortCoursesByDate } from "../utils/course-recommendation/sort-courses-by-interest-and-date";
import stateStatus from "../utils/state-status";

interface ISearchState {
  status: {
    state: string;
  };
  searchString: string;
  searchResults: ISearchResults;
  searchCurrentCourseContext: ICourse | null;
  likedSearchCurrentContext: ICourse | null;
}

const initialState: ISearchState = {
  status: {
    state: "idle",
  },
  searchString: "",
  searchResults: {
    users: [],
    courses: [],
  },
  searchCurrentCourseContext: null,
  likedSearchCurrentContext: null,
};

export const performSearchAsync = createAsyncThunk(
  "search/performSearch",
  async ({
    searchQuery,
    onCompleted,
  }: {
    searchQuery: string;
    onCompleted: (completed: boolean) => void;
  }): Promise<ISearchResults> => {
    const res = await doSearch({
      query: searchQuery,
      onCompleted: onCompleted,
    });
    return res;
  }
);

export const toggleLikeForSearchCourseContextAsync = createAsyncThunk(
  "search/toggleLikeForSearchCourseContext",
  async ({ id }: { id: string }) => {
    const res = await toggleCourseLike({ id });
    return res;
  }
);

export const getDetailedCourseInfoByIdFromSearchAsync = createAsyncThunk(
  "search/getDetailedCourseInfoByIdFromSearch",
  async ({ id }: { id: string }) => {
    const res = await getDetailedCourseById(id);
    return res;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchString(state, action: { payload: string }) {
      state.searchString = action.payload;
    },
    clearSearchCurrentCourseContext(state) {
      state.searchCurrentCourseContext = null;
      state.likedSearchCurrentContext = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearchAsync.pending, (state) => {
        stateStatus.loading(state, "search in progress");
      })
      .addCase(performSearchAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.searchResults = action.payload;
      })
      .addCase(performSearchAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to complete search");
      })
      .addCase(toggleLikeForSearchCourseContextAsync.pending, (state) => {
        stateStatus.loading(state, "like toggle in progress");
      })
      .addCase(
        toggleLikeForSearchCourseContextAsync.fulfilled,
        (state, action) => {
          // When the response comes back, we can manipulate the state.searchResults and find the course that was liked, updating it.
          const { courseChanged } = action.payload;
          const updatedCourses = updateSearchResultsState({
            courseChanged,
            state,
          });
          if (updatedCourses) {
            state.searchResults = updatedCourses;
          }
          if (
            state.searchCurrentCourseContext?._id ===
            action.payload.courseChanged._id
          ) {
            state.searchCurrentCourseContext = courseChanged;
            state.likedSearchCurrentContext = courseChanged;
          }
          stateStatus.idle(state);
        }
      )
      .addCase(toggleLikeForSearchCourseContextAsync.rejected, (state) => {
        stateStatus.error(state, "search: unable to like course");
      })
      .addCase(getDetailedCourseInfoByIdFromSearchAsync.pending, (state) => {
        stateStatus.loading(
          state,
          "attempting to get detailed course information..."
        );
      })
      .addCase(
        getDetailedCourseInfoByIdFromSearchAsync.fulfilled,
        (state, action) => {
          state.searchCurrentCourseContext = action.payload;
          state.likedSearchCurrentContext = action.payload;
          stateStatus.idle(state);
        }
      )
      .addCase(getDetailedCourseInfoByIdFromSearchAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get search current course context");
      });
  },
});

const updateSearchResultsState = ({
  courseChanged,
  state,
}: {
  courseChanged: ICourse;
  state: any;
}): ISearchResults => {
  const { courses } = state.searchResults;
  if (courses.some((course: ICourse) => course._id === courseChanged._id)) {
    const filteredCourses = courses.filter(
      (course: ICourse) => course._id !== courseChanged._id
    );

    return {
      courses: sortCoursesByDate([...filteredCourses, courseChanged]),
      users: state.users,
    };
    //return [...filteredCourses, courseChanged]
  }
  return {
    courses: sortCoursesByDate(state.searchResults.courses),
    users: state.searchResults.users,
  };
};

export const selectSearchResults = (state: any) => state.search.searchResults;
export const selectSearchString = (state: any) => state.search.searchString;
export const selectSearchStatus = (state: any) => state.search.status;
export const selectSearchCurrentCourseContext = (state: any) =>
  state.search.searchCurrentCourseContext;
export const selectLikedSearchCurrentCourseContext = (state: any) =>
  state.search.likedSearchCurrentContext;

export const { setSearchString, clearSearchCurrentCourseContext } =
  searchSlice.actions;
export default searchSlice.reducer;
