import axios from "axios";
import { ICourse, ICourseRecommendationSubmission } from "../types";

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
  data: ICourseRecommendationSubmission,
  setDone: (isDone: boolean) => void,
  successHandler: (success: boolean) => void
) => {
  const { title, url, rating, description, category, tags, notes } = data;
  console.log("category", category);
  try {
    const req = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/courses`,
      withCredentials: true,
      data: {
        title,
        rating,
        url,
        description,
        category,
        notes,
        tags,
      },
    });
    if (req.status === 200) {
      const courses = req.data as ICourse[];
      setDone(false);
      successHandler(true);

      return courses.sort(
        (a, b) =>
          parseInt(b.createdAt.replace(/[-.:\D]/g, "")) -
          parseInt(a.createdAt.replace(/[-.:\D]/g, ""))
      );
    } else {
      successHandler(false);
      return [];
    }
  } catch (err) {
    successHandler(false);
    throw new Error(err);
  }
};
