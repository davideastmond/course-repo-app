import axios from "axios";
import { setCookie } from "../../utils/cookie/cookie";
import { API_URL } from "../../utils/environment";

const logout = async () => {
  try {
    const res = await axios({
      method: "post",
      url: `${API_URL}/api/auth/logout`,
      withCredentials: true,
    });
    if (res.status === 200) {
      setCookie("has-existing-auth-cookie", "false", 90);
      sessionStorage.clear();
    }
  } catch (error) {
    console.error(error);
  }
};

export default logout;
