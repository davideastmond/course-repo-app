import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BodyHeader from "../../components/body-header";
import SideBrowser from "../../components/Browser";
import CourseContainer from "../../components/course-container";
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
      <div className="Home-Page__middle-section__header">
        <div className="Middle-section__header-text">
          Don’t see a course that you like? Add your own!
        </div>
      </div>
      <div className="Home-Page__middle-section">
        <SideBrowser />
        <CourseContainer />
      </div>
    </div>
  );
}

export default HomePage;
