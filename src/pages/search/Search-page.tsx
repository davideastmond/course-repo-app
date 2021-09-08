import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "./search-page-style.css";
import HeaderBar from "../../components/header-bar";
import TextInput from "../../components/Text-Input";
import {
  checkIsAuthedAsync,
  logOutAsync,
  selectAllCourses,
  selectIsLoggedIn,
  selectLoggedInUser,
} from "../../reducers";
import doGoogleLogin from "../../services/auth";
import CourseContainer from "../../components/course-container";
function SearchPage() {
  const dispatch = useDispatch();
  const userData = useSelector(selectLoggedInUser, shallowEqual);
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const courses = useSelector(selectAllCourses, shallowEqual);
  const handleGoogleLogin = () => {
    // doGoogleLogin({ setDone, setErrorMessage });
    // setAuthInProgress(true);
    dispatch(checkIsAuthedAsync());
  };
  const handleLogOut = () => {
    dispatch(logOutAsync());
  };
  return (
    <div className="Search-Page__container">
      <HeaderBar
        googleLoginAction={handleGoogleLogin}
        logOutAction={handleLogOut}
        loggedIn={isLoggedIn}
        userData={userData}
      />
      <div className="Search-Page__main-body display-flex">
        <div className="column-width-40vw"></div>
        <div className="Search-Page__search_inner-column column-width-40vw">
          <div className="Search-Page__search-section">
            <TextInput placeHolderText="Search for a course..." />
          </div>
          <div className="Search-Page__search-results-container">
            <CourseContainer
              courses={courses}
              genericUserProfileClickHandler={() => {}}
              courseCardClickHandler={() => {}}
            />
          </div>
        </div>
        <div className="column-width-40vw"></div>
      </div>
    </div>
  );
}

export default SearchPage;
