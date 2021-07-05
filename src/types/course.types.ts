export interface ICourse {
  _id: string;
  postedByUserId: string;
  courseTitle: string;
  courseUrl: string;
  description: string;
  reviews: {
    [keyof: string]: string;
  };
  tags: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}
