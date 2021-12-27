import { ICourse, IProcessedUser } from "../../types";

export const getIsLikedByLoggedInUser = ({
  loggedInUser,
  course,
}: {
  loggedInUser: IProcessedUser;
  course: ICourse | undefined;
}): boolean => {
  return !!(
    loggedInUser &&
    loggedInUser._id &&
    course &&
    course.likes &&
    course.likes[loggedInUser._id]
  );
};
