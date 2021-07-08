// import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import BodyHeader from "../../components/body-header";
import SideBrowser from "../../components/Browser";
import ActionButton from "../../components/Buttons/ActionButton";

import CourseContainer from "../../components/course-container";
import HeaderBar from "../../components/header-bar";
import TextInput from "../../components/Text-Input";
import { selectAllCourses } from "../../reducers";

import "./home-page-style.css";
function HomePage() {
  const courses = useSelector(selectAllCourses, shallowEqual);

  useEffect(() => {
    console.log("courses!", courses);
  }, [courses]);
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
        <div className="Home-Page__center-column">
          <div className="Home-Page__search-section">
            <TextInput placeHolderText="Search for a course..." />
          </div>
          {courses && <CourseContainer courses={courses} />}
        </div>
        <ActionButton
          plusSymbol={true}
          title={"Recommend a course"}
          classNames={"recommend-course-button-size"}
        />
      </div>
      <footer className="Home-page__footer">
        <ActionButton
          plusSymbol={false}
          title={"Load more courses"}
          classNames={"add-course-button-size"}
        />
      </footer>
    </div>
  );
}

export default HomePage;
