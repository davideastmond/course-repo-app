import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/app-slice";
import coursesReducer from "./reducers/courses-slice";
import userSlice from "./reducers/user-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    courses: coursesReducer,
    user: userSlice,
  },
});
