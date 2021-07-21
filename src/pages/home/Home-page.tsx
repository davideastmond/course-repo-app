// import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import BodyHeader from "../../components/body-header";
import SideBrowser from "../../components/Browser";
import ActionButton from "../../components/Buttons/ActionButton";

import CourseContainer from "../../components/course-container";
import HeaderBar from "../../components/header-bar";
import FormDialog from "../../components/modal";
import StatusModule from "../../components/StatusModule";
import TextInput from "../../components/Text-Input";
import ZenSpinner from "../../components/ZenSpinner";
import {
  checkIsAuthedAsync,
  getLoggedInUserAsync,
  logOutAsync,
  selectAllCourses,
  selectAppStatus,
  selectIsLoggedIn,
  selectLoggedInUser,
  setCourseFilterOpen,
} from "../../reducers";
import doGoogleLogin from "../../services/auth";

import "./home-page-style.css";
function HomePage() {
  const [open, setOpen] = useState(false);
  const courses = useSelector(selectAllCourses, shallowEqual);
  const [done, setDone] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [authInProgress, setAuthInProgress] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const userData = useSelector(selectLoggedInUser, shallowEqual);
  const status = useSelector(selectAppStatus, shallowEqual);

  const handleGoogleLogin = () => {
    doGoogleLogin({ setDone, setErrorMessage });
    setAuthInProgress(true);
    dispatch(checkIsAuthedAsync());
  };

  const handleLogOut = () => {
    dispatch(logOutAsync());
  };

  useEffect(() => {
    dispatch(checkIsAuthedAsync());
    if (isLoggedIn) {
      dispatch(getLoggedInUserAsync());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (done) {
      setAuthInProgress(false);
    }
  }, [done]);

  const openModal = (isOpen: boolean) => {
    if (isOpen === true) {
      setOpen(true);
      dispatch(setCourseFilterOpen(true));
    } else {
      setOpen(false);
      dispatch(setCourseFilterOpen(false));
    }
  };

  return (
    <div className={`Home-Page__container`}>
      {authInProgress && (
        <div className="Home-Page__Spinner-Overlay">
          <ZenSpinner />
        </div>
      )}
      <HeaderBar
        googleLoginAction={handleGoogleLogin}
        loggedIn={isLoggedIn}
        logOutAction={handleLogOut}
        userData={userData}
      />
      <div className="Home-Page__main-body">
        <BodyHeader />
        {isLoggedIn && (
          <div className="Home-Page__middle-section__header">
            <div className="Middle-section__header-text">
              Don’t see a course that you like? Add your own!
            </div>
          </div>
        )}

        <div className="Home-Page__middle-section">
          <SideBrowser />
          <div className="Home-Page__center-column">
            <div className="Home-Page__search-section">
              <TextInput placeHolderText="Search for a course..." />
            </div>
            {courses && <CourseContainer courses={courses} />}
          </div>
          {isLoggedIn && (
            <ActionButton
              plusSymbol={true}
              title={"Recommend a course"}
              classNames={"recommend-course-button-size left-margin"}
              action={() => openModal(true)}
            />
          )}
          <FormDialog open={open} setOpen={openModal} />
        </div>
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
