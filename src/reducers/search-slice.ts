import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doSearch } from "../services/search";
import { ISearchResults } from "../types/search.types";
import stateStatus from "../utils/state-status";

interface ISearchState {
  status: {
    state: string;
  };
  searchString: string;
  searchResults: ISearchResults;
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
};

export const performSearchAsync = createAsyncThunk(
  "search/performSearch",
  async ({ searchQuery }: { searchQuery: string }): Promise<ISearchResults> => {
    const res = await doSearch({ query: searchQuery });
    return res;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
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
      });
  },
});

export const selectSearchResults = (state: any) => state.search.searchResults;
export default searchSlice.reducer;
