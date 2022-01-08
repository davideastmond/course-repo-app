import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllNotifications } from "../services/users";
import { INotification } from "../types/notification.types";
import stateStatus from "../utils/state-status";

interface INotificationState {
  status: any;
  notifications: Array<INotification>;
}

const initialState: INotificationState = {
  status: {
    state: "idle",
  },
  notifications: [],
};

export const fetchAllNotificationsAsync = createAsyncThunk(
  "notification/getNotifications",
  async () => {
    const res = await fetchAllNotifications();
    return res;
  }
);

export const markAllNotificationsAsReadAsync = createAsyncThunk(
  "notification/markAllNotificationsAsRead",
  async () => {}
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotificationsAsync.pending, (state) => {
        stateStatus.loading(state, "getting all notifications");
      })
      .addCase(fetchAllNotificationsAsync.fulfilled, (state, action) => {
        //state.notifications = action.payload;
        console.log("ping fetched", action.payload);
      })
      .addCase(fetchAllNotificationsAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to fetch all notifications");
      });
  },
});

export const selectNotificationStatus = (state: any) =>
  state.notification.status;
export default notificationSlice.reducer;
