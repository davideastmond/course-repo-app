import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteNotification,
  dismissNotification,
  fetchAllNotifications,
} from "../services/users";
import { INotification } from "../types/notification.types";
import { IS_ZEN } from "../utils/environment";
import stateStatus from "../utils/state-status";

interface INotificationState {
  status: any;
  notifications: Array<INotification>;
  unreadCount: number;
}

const initialState: INotificationState = {
  status: {
    state: "idle",
  },
  notifications: [],
  unreadCount: 0,
};

export const fetchAllNotificationsAsync = createAsyncThunk(
  "notification/getNotifications",
  async () => {
    const res = await fetchAllNotifications();
    return res;
  }
);

export const dismissAllNotificationsAsReadAsync = createAsyncThunk(
  "notification/dismissAllNotificationsAsRead",
  async () => {}
);

export const dismissNotificationAsReadAsync = createAsyncThunk(
  "notification/dismissNotification",
  async ({ id }: { id: string }) => {
    const res = await dismissNotification({ id });
    return res;
  }
);

export const deleteNotificationAsync = createAsyncThunk(
  "notification/deleteNotification",
  async ({ id }: { id: string }) => {
    console.log("Do some async operation concerning delete notificaitons");
    const res = await deleteNotification({ id });
    return res;
  }
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
        state.notifications = action.payload;
        const count = getNotificationCount({ notifications: action.payload });
        updateAppTitle({ count });
        state.unreadCount = count;
      })
      .addCase(fetchAllNotificationsAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to fetch all notifications");
      })
      .addCase(dismissNotificationAsReadAsync.pending, (state) => {
        stateStatus.loading(state, "dismissing notification by id");
      })
      .addCase(dismissNotificationAsReadAsync.fulfilled, (state, action) => {
        state.notifications = action.payload;
        const count = getNotificationCount({ notifications: action.payload });
        updateAppTitle({ count });
        state.unreadCount = count;
      })
      .addCase(dismissNotificationAsReadAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to dismiss notification by id");
      })
      .addCase(deleteNotificationAsync.pending, (state) => {
        stateStatus.loading(state, "deleting notification by id");
      })
      .addCase(deleteNotificationAsync.fulfilled, (state, action) => {
        state.notifications = action.payload;
        const count = getNotificationCount({ notifications: action.payload });
        updateAppTitle({ count });
        state.unreadCount = count;
      })
      .addCase(deleteNotificationAsync.rejected, (state) => {
        stateStatus.error(state, "Unable to delete notification by id");
      });
  },
});

const getNotificationCount = ({
  notifications,
}: {
  notifications: INotification[];
}): number => {
  return notifications.reduce((acc, cv) => {
    return cv.read === false ? (acc += 1) : (acc += 0);
  }, 0);
};

const updateAppTitle = ({ count }: { count: number }): void => {
  if (count > 0) {
    document.title = IS_ZEN
      ? `(${count}) Zen Course Repo`
      : `(${count}) Course Repo`;
  } else {
    document.title = IS_ZEN ? `Zen Course Repo` : `Course Repo`;
  }
};
export const selectNotificationStatus = (state: any) =>
  state.notification.status;
export const selectAllNotifications = (state: any): INotification[] =>
  state.notification.notifications;
export const selectNotificationUnreadCount = (state: any): number =>
  state.notification.unreadCount;
export default notificationSlice.reducer;
