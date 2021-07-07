import axios from "axios";

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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setDone(true);
      }
    } catch (error) {
      setDone(false);
      if (error.status === 401) {
        typeof error?.message === "string" &&
          setErrorMessage(
            "Authentication unsuccessful, please select a google account to sign in with."
          );
      } else {
        setErrorMessage("An authentication error occured");
        console.error(error);
      }
    }
  };
  const googleAuthPage = window.open(
    `${process.env.REACT_APP_API_URL}/api/auth/google`,
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
