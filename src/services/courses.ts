import axios from "axios";
import {
  HtmlExtractionData,
  ICourse,
  ICourseRecommendationSubmission,
  IDetailedCourse,
  IProcessedUser,
} from "../types";
import { getUserInterests } from "./users";
import { intersection } from "lodash";
import { API_URL, AUTH_HEADER } from "../utils/environment";

export function getAllCourses({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}): Promise<ICourse[]> {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API_URL}/api/courses`,
      params: {
        limit,
        skip,
      },
      headers: AUTH_HEADER,
    })
      .then((req) => {
        const courses = req.data as ICourse[];
        getUserInterests("me")
          .then((interestTags) => {
            if (interestTags && interestTags.length > 0) {
              resolve(sortCoursesByInterest({ courses, interestTags }));
            } else {
              resolve(sortCoursesByDate(courses));
            }
          })
          .catch(() => {
            resolve(sortCoursesByDate(courses));
          });
      })
      .catch((error) => {
        reject(new Error("Unable to fetch"));
      });
  });
}

export const getDetailedCourseById = async (
  courseId: string
): Promise<IDetailedCourse> => {
  const req = await axios({
    method: "get",
    url: `${API_URL}/api/courses/${courseId}`,
    headers: AUTH_HEADER,
  });
  return req.data as IDetailedCourse;
};

export const postCourseRecommendation = async (
  data: ICourseRecommendationSubmission,
  setDone: (isDone: boolean) => void,
  successHandler: (success: boolean) => void
) => {
  const { title, url, rating, description, category, tags, notes } = data;
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
      headers: AUTH_HEADER,
    });
    if (req.status === 200) {
      const courses = req.data as ICourse[];
      setDone(false);
      successHandler(true);
      return courses;
    } else {
      successHandler(false);
      return [];
    }
  } catch (err: any) {
    successHandler(false);
    throw new Error(err);
  }
};

export const deleteCourseRecommendation = ({
  courseIds,
  onSuccess,
  onFail,
}: {
  courseIds: string[];
  onSuccess: (responseData: IProcessedUser) => void;
  onFail: (errorMessage: string) => void;
}) => {
  axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/api/courses`,
    data: { courseIds: courseIds },
    withCredentials: true,
    headers: AUTH_HEADER,
  })
    .then((response) => {
      if (response) {
        onSuccess(response.data as IProcessedUser);
      }
    })
    .catch((error) => {
      onFail(error);
    });
};

export const getCourseAutoComplete = async ({
  url,
}: {
  url: string;
}): Promise<HtmlExtractionData> => {
  const req = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/utils/courses/auto_complete`,
    withCredentials: true,
    headers: AUTH_HEADER,
    data: { url },
  });
  if (req.status === 200) {
    return req.data as HtmlExtractionData;
  } else {
    throw new Error("Unable to do auto complete");
  }
};

const sortCoursesByDate = (courses: ICourse[]): ICourse[] => {
  return courses.sort(
    (a, b) =>
      parseInt(b.createdAt.replace(/[-.:\D]/g, "")) -
      parseInt(a.createdAt.replace(/[-.:\D]/g, ""))
  );
};

const sortCoursesByInterest = ({
  courses,
  interestTags,
}: {
  courses: ICourse[];
  interestTags: string[];
}): ICourse[] => {
  return courses.sort((a, b) => {
    const aIntersection = intersection(
      a.tags.map((tag) => tag.trim().toLowerCase()),
      interestTags
    );
    const bIntersection = intersection(
      b.tags.map((tag) => tag.trim().toLowerCase()),
      interestTags
    );
    if (aIntersection > bIntersection) {
      return 1;
    } else if (aIntersection < bIntersection) {
      return 0;
    }
    return 0;
  });
};

export const toggleCourseLike = async ({
  id,
}: {
  id: string;
}): Promise<{ courses: ICourse[]; actionTaken: string }> => {
  const req = await axios({
    withCredentials: true,
    method: "PATCH",
    url: `${API_URL}/api/courses/${id}/like`,
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data;
  }
  return Promise.reject("Unable to toggle like");
};
