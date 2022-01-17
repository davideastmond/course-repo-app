import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkIsAuthed from "../services/auth/check-if-authorized";
import logout from "../services/auth/log-out";
import { getUserById, updateUserJobTitleDepartment } from "../services/users";
import { IProcessedUser } from "../types";
import stateStatus from "../utils/state-status";

interface IAppState {
  status: {
    state: string;
  };
  isLoggedIn: boolean;
  user: IProcessedUser | {};
  courseRecommenderModalOpen: boolean;
}
const initialState: IAppState = {
  status: {
    state: "idle",
  },
  isLoggedIn: false,
  user: {},
  courseRecommenderModalOpen: false,
};

export const checkIsAuthedAsync = createAsyncThunk(
  "app/checkAuth",
  async (): Promise<any> => {
    return checkIsAuthed();
  }
);

export const getLoggedInUserAsync = createAsyncThunk(
  "app/getLoggedInUser",
  async (): Promise<any> => {
    return getUserById("me");
  }
);

export const logOutAsync = createAsyncThunk(
  "app/logout",
  async (): Promise<any> => {
    return logout();
  }
);

export const updateUserJobTitleDepartmentAsync = createAsyncThunk(
  "app/updateUserProfileJobTitleDepartment",
  async ({
    id,
    jobTitle,
    department,
  }: {
    id: string;
    jobTitle: string;
    department: string;
  }): Promise<IProcessedUser> => {
    return updateUserJobTitleDepartment(id, jobTitle, department);
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCourseFilterOpen(state, action: { payload: boolean }) {
      state.courseRecommenderModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIsAuthedAsync.pending, (state) => {
        stateStatus.loading(state, "getting logged in status");
      })
      .addCase(checkIsAuthedAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.isLoggedIn = action.payload;
      })
      .addCase(checkIsAuthedAsync.rejected, (state) => {
        stateStatus.error(state, "Authentication error");
      })
      .addCase(getLoggedInUserAsync.pending, (state) => {
        stateStatus.loading(state, "getting logged in user");
      })
      .addCase(getLoggedInUserAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        window?.sessionStorage.setItem(
          "user_data",
          JSON.stringify(action.payload)
        );
        state.user = action.payload;
      })
      .addCase(getLoggedInUserAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to get logged in user");
        window?.sessionStorage.clear();
      })
      .addCase(logOutAsync.pending, (state) => {
        stateStatus.loading(state, "Logging out");
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.user = {};
        state.isLoggedIn = false;
        window?.sessionStorage.clear();
      })
      .addCase(updateUserJobTitleDepartmentAsync.pending, (state) => {
        stateStatus.loading(state, "Updating user profile data");
      })
      .addCase(updateUserJobTitleDepartmentAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.user = action.payload;
      })
      .addCase(updateUserJobTitleDepartmentAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to update user profile data");
      });
  },
});

export const selectIsLoggedIn = (state: any): boolean => state.app.isLoggedIn;
export const selectLoggedInUser = (state: any): IProcessedUser =>
  state.app.user;
export const selectCourseRecommendationModalOpenState = (state: any): boolean =>
  state.app.courseRecommenderModalOpen;
export const selectAppStatus = (state: any): { state: string } =>
  state.app.status;
export const { setCourseFilterOpen } = appSlice.actions;
export default appSlice.reducer;
