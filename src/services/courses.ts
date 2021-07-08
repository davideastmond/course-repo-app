import axios from "axios";
import { ICourseRecommendationPost } from "../types";

export const getAllCourses = async () => {
  const req = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/courses`,
  });
  return req.data;
};

export const postCourseRecommendation = async (
  data: ICourseRecommendationPost
) => {
  const req = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/courses`,
  });
  return req.data;
};
