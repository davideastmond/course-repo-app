import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISearchResults } from "../types/search.types";

interface ISearchState {
  status: {
    state: string;
  };
  searchString: string;
  searchResults: ISearchResults | null;
}

const initialState: ISearchState = {
  status: {
    state: "idle",
  },
  searchString: "",
  searchResults: null,
};
