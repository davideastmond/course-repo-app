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
}

export interface IProcessedUser {
  _id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar?: { url: string }[];
  createdAt: Date;
  updatedAt: Date;
  department: string;
  interestTags: string[];
}
