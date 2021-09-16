import { ICourse, IProcessedUser } from ".";

export type ISearchResults = {
  courses: ICourse[];
  users: IProcessedUser[];
};
