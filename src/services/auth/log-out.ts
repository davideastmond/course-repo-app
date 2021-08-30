import axios from "axios";
import { setCookie } from "../../utils/cookie/cookie";

const logout = async () => {
  console.log("logOut auth util");
  try {
    await axios({
      method: "post",
      url: "/api/auth/logout",
    });
    setCookie("has-existing-auth-cookie", "false", 90);
    sessionStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export default logout;
