import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BodyHeader from "../../components/body-header";
import HeaderBar from "../../components/header-bar";
import {
  getAllCoursesAsync,
  selectAllCourses,
} from "../../reducers/courses-slice";

import "./home-page-style.css";
function HomePage() {
  const dispatch = useDispatch();
  const courses = useSelector(selectAllCourses, shallowEqual);

  useEffect(() => {
    dispatch(getAllCoursesAsync());
  });

  useEffect(() => {
    console.log("all courses", courses);
  }, [dispatch]);
  return (
    <div>
      <HeaderBar />
      <BodyHeader />
    </div>
  );
}

export default HomePage;
