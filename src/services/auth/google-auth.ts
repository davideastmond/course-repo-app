import axios from "axios";
import { API_URL } from "../../utils/environment";

interface IGoogleAuthProps {
  setDone:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((isDone: boolean) => void);
  setErrorMessage:
    | React.Dispatch<React.SetStateAction<string>>
    | ((msg: string) => void);
}

const doGoogleLogin = async ({
  setDone,
  setErrorMessage,
}: IGoogleAuthProps) => {
  const requestAuth = async () => {
    try {
      const req = await axios({
        method: `get`,
        url: `${API_URL}/api/auth`,
        withCredentials: true,
      });

      console.log("RES STATUS after making request to /api/auth :", req.status);
      if (req.status === 200) {
        setDone(true);
      } else {
        console.log("Some other status occured: ", req.status);
        setErrorMessage(
          ` Received ${req.status} ${req.statusText} Did not receive an OK (done) response`
        );
      }
    } catch (error) {
      console.log("ERROR ON google auth request?", error);
      setDone(false);
      if (error.status === 401) {
        typeof error?.message === "string" &&
          setErrorMessage(
            "Authentication unsuccessful, please select a google account to sign in with."
          );
      } else {
        setErrorMessage("An authentication error occurred");
        console.error(error);
      }
    }
  };
  const googleAuthPage = window.open(
    `${API_URL}/api/auth/google`,
    "googleAuthPage",
    "onclose"
  );
  let intTest = setInterval(() => {
    if (googleAuthPage?.closed) {
      setTimeout(() => requestAuth(), 1000);
      clearInterval(intTest);
    }
  }, 1000);
};

export default doGoogleLogin;
