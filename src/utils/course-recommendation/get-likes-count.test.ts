import { ICourse } from "../../types";
import { getLikesCount } from "./get-likes-count";

const mockCourse: ICourse = {
  _id: "course123",
  postedByUserId: "",
  title: "",
  url: "",
  description: "",
  reviews: {},
  tags: [],
  likes: {
    user123: new Date().toString(),
    someOTher2: new Date().toString(),
    beebee: new Date().toString(),
  },
  createdAt: "",
  updatedAt: "",
  category: "",
};
describe("get likes count tests", () => {
  test("returns correct count", () => {
    const result = getLikesCount({ data: mockCourse.likes });
    expect(result).toBe(3);
  });
});
