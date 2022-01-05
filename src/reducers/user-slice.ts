import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserInterestTags,
  getUserInterests,
  updateUserInterestTags,
} from "../services/users";
import stateStatus from "../utils/state-status";

interface IUserState {
  status: any;
  interests: string[];
}
const initialState: IUserState = {
  status: {
    state: "idle",
  },
  interests: [],
};

export const getInterestTagsAsync = createAsyncThunk(
  "user/getInterestTags",
  async (id: string): Promise<string[]> => {
    const res = await getUserInterests(id);
    return res;
  }
);

export const updateInterestTagsAsync = createAsyncThunk(
  "user/updateInterestTags",
  async ({ id, tags }: { id: string; tags: string[] }): Promise<string[]> => {
    const res = await updateUserInterestTags(id, tags);
    return res;
  }
);

export const deleteInterestTagsAsync = createAsyncThunk(
  "user/deleteInterestTags",
  async ({ id, tags }: { id: string; tags: string[] }): Promise<string[]> => {
    const res = await deleteUserInterestTags(id, tags);
    return res;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInterestTagsAsync.pending, (state) => {
        stateStatus.loading(state, "getting interest tags");
      })
      .addCase(getInterestTagsAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.interests = action.payload;
      })
      .addCase(getInterestTagsAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to retrieve user interests");
      })
      .addCase(updateInterestTagsAsync.pending, (state) => {
        stateStatus.loading(state, "posting interests...");
      })
      .addCase(updateInterestTagsAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.interests = action.payload;
      })
      .addCase(updateInterestTagsAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to update interest tags");
      })
      .addCase(deleteInterestTagsAsync.pending, (state) => {
        stateStatus.loading(state, "deleting interest tags...");
      })
      .addCase(deleteInterestTagsAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.interests = action.payload;
      })
      .addCase(deleteInterestTagsAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to delete interest tags");
      });
  },
});

export const selectInterestTags = (state: any): string[] =>
  state.user.interests;
export const selectUserStatus = (state: any) => state.user.status;
export default userSlice.reducer;
