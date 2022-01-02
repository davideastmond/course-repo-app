import axios from "axios";
import { ISearchResults } from "../types/search.types";
import { sortCoursesByDate } from "../utils/course-recommendation/sort-courses-by-interest-and-date";
import { API_URL, AUTH_HEADER } from "../utils/environment";

export const doSearch = async ({
  query,
  onCompleted,
}: {
  query: string;
  onCompleted: (completed: boolean) => void;
}): Promise<ISearchResults> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${API_URL}/api/search`,
      params: { queryString: query.toLowerCase().trim() },
      headers: AUTH_HEADER,
    });

    if (res.status === 200) {
      onCompleted(true);
      const sortedCourses = sortCoursesByDate(res.data.courses);
      return {
        courses: sortedCourses,
        users: res.data.users,
      };
    } else {
      onCompleted(true);
      throw new Error("Error searching");
    }
  } catch (exception) {
    console.log(`Error in search ${exception}`);
    onCompleted(true);
    throw new Error("Error searching");
  }
};
