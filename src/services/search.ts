import axios from "axios";
import { ISearchResults } from "../types/search.types";
import { API_URL, AUTH_HEADER } from "../utils/environment";

export const doSearch = async ({
  query,
}: {
  query: string;
}): Promise<ISearchResults> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${API_URL}/api/search`,
      params: { queryString: query.toLowerCase().trim() },
      headers: AUTH_HEADER,
    });

    if (res.status === 200) {
      return res.data as ISearchResults;
    } else {
      throw new Error("Error searching");
    }
  } catch (exception) {
    console.log(`Error in search ${exception}`);
    throw new Error("Error searching");
  }
};
