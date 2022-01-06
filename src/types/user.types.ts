import { INotification } from "./notification.types";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  auth: {
    googleId: string;
    email: string;
    accessToken: string;
  };
  avatar?: Array<{ url: string }>;
  createdAt: Date;
  updatedAt: Date;
  department: string;
  interestTags: string[];
  likes: { [keyof: string]: string };
  following: { [keyof: string]: Date };
  followedBy: { [keyof: string]: Date };
}

export interface IProcessedUser {
  _id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar?: { url: string }[];
  courses: string[];
  createdAt: Date;
  updatedAt: Date;
  department: string;
  interestTags: string[];
  likes: { [keyof: string]: string };
  following: { [keyof: string]: Date };
  followedBy: { [keyof: string]: Date };
  notifications: {
    unread: Array<INotification>;
    read: Array<string>;
  };
}

export type TToggleFollowReturnData = {
  sourceUser: IProcessedUser;
  targetUser: IProcessedUser;
  actionTaken: ToggleFollowAction;
};

export enum ToggleFollowAction {
  Follow = "follow",
  Unfollow = "unfollow",
}
