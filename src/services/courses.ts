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

export const postDummyCourseDataToAPI = async () => {
  const request = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/courses/test`,
  });
  return request.data;
};
