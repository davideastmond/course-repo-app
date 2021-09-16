import axios from "axios";
import { IProcessedUser } from "../types";
import { API_TOKEN, API_URL } from "../utils/environment";

export const getUserById = async (id: string): Promise<IProcessedUser> => {
  const req = await axios({
    method: "get",
    url: `${API_URL}/api/users/${id}`,
    withCredentials: true,
    headers: {
      API_TOKEN: API_TOKEN,
    },
  });

  if (req.status === 200) {
    return req.data as IProcessedUser;
  }
  return Promise.reject("Unable to retrieve user by id");
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
    headers: {
      API_TOKEN: API_TOKEN,
    },
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
    headers: {
      API_TOKEN: API_TOKEN,
    },
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
    headers: {
      API_TOKEN: API_TOKEN,
    },
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
    headers: {
      API_TOKEN: API_TOKEN,
    },
  });
  if (req.status === 200) {
    return req.data as IProcessedUser;
  }
  return Promise.reject("Unable to update user profile data");
};
