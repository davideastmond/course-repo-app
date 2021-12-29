import { ICourse, IProcessedUser } from "../../types";
import { getIsLikedByLoggedInUser } from "./is-liked-by-logged-in-user";
const mockCourse: ICourse = {
  _id: "course123",
  postedByUserId: "",
  title: "",
  url: "",
  description: "",
  reviews: {},
  tags: [],
  likes: { user123: new Date().toString() },
  createdAt: "",
  updatedAt: "",
  category: "",
};
const loggedInUser: IProcessedUser = {
  _id: "user123",
  firstName: "John",
  lastName: "Smith",
  jobTitle: "",
  courses: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  department: "",
  interestTags: [],
  likes: {},
};
describe("is liked by logged in user tests", () => {
  test("returns true", () => {
    const result = getIsLikedByLoggedInUser({
      course: mockCourse,
      loggedInUser,
    });
    expect(result).toBe(true);
  });
  test("return false", () => {
    const newMockCourse = {
      ...mockCourse,
      likes: { sdfsd: new Date().toString() },
    };
    const result = getIsLikedByLoggedInUser({
      course: newMockCourse,
      loggedInUser,
    });
    expect(result).toBe(false);
  });
});
