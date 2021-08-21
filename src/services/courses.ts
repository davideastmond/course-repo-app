import axios from "axios";
import {
  CourseQueryType,
  ICourse,
  ICourseRecommendationSubmission,
  IDetailedCourse,
} from "../types";

export const getAllCourses = async ({
  limit,
  skip,
  queryType,
}: {
  limit: number;
  skip: number;
  queryType: CourseQueryType;
}) => {
  const req = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/courses`,
    params: {
      limit: limit,
      skip: skip,
      queryType: queryType,
    },
  });
  const courses = req.data as ICourse[];
  return courses.sort(
    (a, b) =>
      parseInt(b.createdAt.replace(/[-.:\D]/g, "")) -
      parseInt(a.createdAt.replace(/[-.:\D]/g, ""))
  );
};

export const getDetailedCourseById = async (
  courseId: string
): Promise<IDetailedCourse> => {
  const req = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/courses/${courseId}`,
  });
  return req.data as IDetailedCourse;
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

export const getCoursesByRelevance = async ({
  limit,
  skip,
  queryType,
}: {
  limit: number;
  skip: number;
  queryType: CourseQueryType;
}): Promise<ICourse[]> => {
  try {
    const req = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/courses`,
      data: {
        limit,
        skip,
        queryType,
      },
      withCredentials: true,
    });
    if (req.status === 200) {
      return req.data as ICourse[];
    } else {
      throw new Error(req.statusText);
    }
  } catch (exception) {
    throw new Error(exception);
  }
};
