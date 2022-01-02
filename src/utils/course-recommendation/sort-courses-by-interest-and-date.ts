import { ICourse } from "../../types";

import { intersection } from "lodash";
import { getUserInterests } from "../../services/users";
export async function sortCoursesByInterestsAndDate(
  courses: ICourse[]
): Promise<ICourse[]> {
  try {
    const interestTags = await getUserInterests("me");
    if (interestTags && interestTags.length > 0) {
      return sortCoursesByInterest({ courses, interestTags });
    }
    return sortCoursesByDate(courses);
  } catch (exception) {
    return sortCoursesByDate(courses);
  }
}

export const sortCoursesByDate = (courses: ICourse[]): ICourse[] => {
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
