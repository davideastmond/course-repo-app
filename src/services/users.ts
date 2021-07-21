import axios from "axios";
import { IProcessedUser } from "../types";

export const getUserById = async (id: string): Promise<IProcessedUser> => {
  const req = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/users/${id}`,
    withCredentials: true,
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
    url: `${process.env.REACT_APP_API_URL}/api/users/${id}/interests`,
    data: { interestTags: tags },
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
    url: `${process.env.REACT_APP_API_URL}/api/users/${id}/interests`,
    data: { interestTags: tags },
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
    url: `${process.env.REACT_APP_API_URL}/api/users/${id}/interests`,
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
    url: `${process.env.REACT_APP_API_URL}/api/users/${id}/profile`,
    data: {
      jobTitle: jobTitle || "",
      department: department || "",
    },
  });
  if (req.status === 200) {
    return req.data as IProcessedUser;
  }
  return Promise.reject("Unable to update user profile data");
};
