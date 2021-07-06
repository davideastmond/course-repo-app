import axios from "axios";

export const getAllCourses = async () => {
  const req = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/courses`,
  });
  console.log("req data", req.data);
  if (req.status === 200) {
    console.log(req.data);
  }
  return req.data;
};
