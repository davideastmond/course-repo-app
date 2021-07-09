import axios from "axios";
import { IProcessedUser } from "../types";

export const getUserById = async (id: string): Promise<IProcessedUser> => {
  const req = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/users/${id}`,
  });

  if (req.status === 200) {
    return req.data;
  }
  return Promise.reject("Unable to retrieve user by id");
};
