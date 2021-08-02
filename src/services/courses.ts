import axios from "axios";
import {
  ICourse,
  ICourseRecommendationPost,
  ICourseRecommendationSubmission,
} from "../types";

export const getAllCourses = async () => {
  const req = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/courses`,
  });
  const courses = req.data as ICourse[];
  return courses.sort(
    (a, b) =>
      parseInt(b.createdAt.replace(/[-.:\D]/g, "")) -
      parseInt(a.createdAt.replace(/[-.:\D]/g, ""))
  );
};

export const postCourseRecommendation = async (
  data: ICourseRecommendationSubmission
) => {
  const { courseTitle, courseUrl, description, category, tags } = data;
  const req = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/courses`,
    data: {
      courseTitle,
      courseUrl,
      description,
      category,
      tags,
    },
  });
  const courses = req.data as ICourse[];
  return courses.sort(
    (a, b) =>
      parseInt(b.createdAt.replace(/[-.:\D]/g, "")) -
      parseInt(a.createdAt.replace(/[-.:\D]/g, ""))
  );
};
