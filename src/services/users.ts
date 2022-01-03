import axios from "axios";
import { ICourse, IProcessedUser } from "../types";
import { API_URL, AUTH_HEADER } from "../utils/environment";

export const getUserById = async (
  id: string
): Promise<IProcessedUser | undefined> => {
  try {
    const req = await axios({
      method: "get",
      url: `${API_URL}/api/users/${id}`,
      withCredentials: true,
      headers: AUTH_HEADER,
    });

    return req.data as IProcessedUser;
  } catch (exception) {}
};

export const updateUserInterestTags = async (
  id: string,
  tags: string[]
): Promise<string[]> => {
  const req = await axios({
    withCredentials: true,
    method: "post",
    url: `${API_URL}/api/users/${id}/interests`,
    data: { interestTags: tags },
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data as string[];
  }
  return Promise.reject("Unable to update interests");
};

export const deleteUserInterestTags = async (
  id: string,
  tags: string[]
): Promise<string[]> => {
  const req = await axios({
    withCredentials: true,
    method: "delete",
    url: `${API_URL}/api/users/${id}/interests`,
    data: { interestTags: tags },
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data as string[];
  }
  return Promise.reject("Unable to delete interests");
};

export const getUserInterests = async (id: string): Promise<string[]> => {
  const req = await axios({
    withCredentials: true,
    method: "get",
    url: `${API_URL}/api/users/${id}/interests`,
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data as string[];
  }
  return Promise.reject("Unable to get interests");
};

export const updateUserJobTitleDepartment = async (
  id: string,
  jobTitle: string,
  department: string
): Promise<IProcessedUser> => {
  const req = await axios({
    withCredentials: true,
    method: "patch",
    url: `${API_URL}/api/users/${id}/profile`,
    data: {
      jobTitle: jobTitle || "",
      department: department || "",
    },
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data as IProcessedUser;
  }
  return Promise.reject("Unable to update user profile data");
};

export const getCourseRecommendationsByUser = async ({
  id,
}: {
  id: string;
}): Promise<ICourse[]> => {
  const req = await axios({
    withCredentials: true,
    method: "GET",
    url: `${API_URL}/api/users/${id}/courses`,
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data as ICourse[];
  }
  return Promise.reject("Unable to get courses by postedByUserId");
};

export const toggleFollowUser = async ({ id }: { id: string }) => {
  const req = await axios({
    withCredentials: true,
    method: "PATCH",
    url: `${API_URL}/api/users/${id}/follow`,
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
  }
  return Promise.reject("Unable to process follow request");
};
