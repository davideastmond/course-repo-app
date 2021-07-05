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
}

export interface IProcessedUser {
  _id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar?: Array<{ url: string }>;
  createdAt: Date;
  updatedAt: Date;
}
