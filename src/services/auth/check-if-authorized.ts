import axios from "axios";
import { setCookie } from "../../utils/cookie/cookie";
import { API_URL } from "../../utils/environment";

const checkIsAuthed = async (): Promise<boolean> => {
  try {
    const res = await axios.get(`${API_URL}/api/auth`, {
      withCredentials: true,
    });
    if (res.data.authed && res.data.authed === true) {
      setCookie("has-existing-auth-cookie", "true", 90);
      return true;
    } else {
      setCookie("has-existing-auth-cookie", "false", 90);
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const testCheckAuth = async () => {
  return true;
};

export default checkIsAuthed;
