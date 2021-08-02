import { ICourseRecommendationSubmission } from "../../types";
import { validateCourseRecommendation } from "./course-recommendation-validation";

const MOCK_DATA = {
  courseRating: 0,
  courseTitle: "Course Title",
  courseURL: "https://www.course.com",
  courseDescription: "Desc",
  courseCategory: "design",
  courseTags: ["tag1", "tag2"],
  takeAwayPackages: {
    0: {
      learningBlurb: "some blurb",
      takeAways: {
        0: "0-first takeaway",
        1: "-sec",
        2: "0-third takeaway",
      },
    },
    1: {
      learningBlurb: "another blurb at index 1",
      takeAways: {
        0: "1-first takeaway",
        1: "1-second takeaway",
        2: "1-third takeaway",
      },
    },
    2: {
      learningBlurb: "alas, indexified at 2",
      takeAways: {
        0: "2-first takeaway",
        1: "2-second takeaway",
        2: "2-third takeaway",
      },
    },
  },
};
describe("course recommendation validation tests", () => {
  test("Validates correctly - everything is valid", () => {
    const result = validateCourseRecommendation(MOCK_DATA);
    expect(result.validated).toBe(true);
    expect(result.invalidFields).toEqual({});
    expect(result.output).toHaveProperty("courseRating");
    expect(result.output).toHaveProperty("courseTitle");
    expect(
      (result.output as ICourseRecommendationSubmission).courseTags
    ).toEqual(["tag1", "tag2"]);
  });

  test("validation error messages are correct", () => {
    const DATA = {
      ...MOCK_DATA,
      courseURL: "ht::/w.id.com",
      courseDescription: "",
      takeAwayPackages: {
        0: {
          learningBlurb: "",
          takeAways: {
            1: "",
          },
        },
      },
    };

    const result = validateCourseRecommendation(DATA);
    expect(result.validated).toBe(false);
  });
});
