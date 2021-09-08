import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../types";

interface ISearchState {
  status: {
    state: string;
  };
  searchString: string;
  searchResults: ICourse[];
}

const initialState: ISearchState = {
  status: {
    state: "idle",
  },
  searchString: "",
  searchResults: [],
};
