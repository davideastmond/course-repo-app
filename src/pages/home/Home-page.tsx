import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BodyHeader from "../../components/body-header";
import SideBrowser from "../../components/Browser";
import ActionButton from "../../components/Buttons/ActionButton";

import CourseContainer from "../../components/course-container";
import DetailedCourseViewModal from "../../components/detailed-course-view-modal";
import HeaderBar from "../../components/header-bar";

import SuggestCourseModal from "../../components/suggest-course-modal";
import TextInput from "../../components/Text-Input";
import ZenSpinner from "../../components/ZenSpinner";
import {
  checkIsAuthedAsync,
  getDetailedCourseByIdAsync,
  getLoggedInUserAsync,
  logOutAsync,
  selectAllCourses,
  selectCurrentCourseContext,
  selectIsLoggedIn,
  selectLoggedInUser,
} from "../../reducers";
import doGoogleLogin from "../../services/auth";

import "./home-page-style.css";
enum ModalType {
  nullModal = -1,
  SuggestCourse = 0,
  DetailedCourseView = 1,
}
function HomePage() {
  const courses = useSelector(selectAllCourses, shallowEqual);
  const currentCourseContext = useSelector(
    selectCurrentCourseContext,
    shallowEqual
  );
  const [done, setDone] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [authInProgress, setAuthInProgress] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const userData = useSelector(selectLoggedInUser, shallowEqual);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.nullModal);
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

  useEffect(() => {
    if (currentCourseContext) {
      setModalType(ModalType.DetailedCourseView);
      setModalVisible(true);
    }
  }, [currentCourseContext]);

  // const openModal = (isOpen: boolean) => {
  //   setModalVisible(true);
  // };

  const handleOpenCourseRecommendModal = () => {
    setModalType(ModalType.SuggestCourse);
    setModalVisible(true);
  };

  const handleCourseCardClickedHomePage = (id: string) => {
    dispatch(getDetailedCourseByIdAsync({ id }));
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
        logOutAction={handleLogOut}
        loggedIn={isLoggedIn}
        userData={userData}
      />
      <div className="Home-Page__main-body">
        <BodyHeader />
        <div className="Home-Page__middle-section">
          <SideBrowser />
          <div className="Home-Page__center-column">
            <div className="Home-Page__search-section">
              <TextInput placeHolderText="Search for a course..." />
            </div>
            {courses && (
              <CourseContainer
                courses={courses}
                courseCardClickHandler={handleCourseCardClickedHomePage}
              />
            )}
          </div>
          {isLoggedIn && (
            <div className="Home-Page__middle-section__header">
              <div className="Middle-section__header-text">
                Don’t see a course that you like? Add your own!
              </div>
              <ActionButton
                plusSymbol={true}
                title={"Recommend a course"}
                classNames={"recommend-course-button-size"}
                action={handleOpenCourseRecommendModal}
              />
            </div>
          )}
        </div>
      </div>
      <footer className="Home-page__footer">
        <ActionButton
          plusSymbol={false}
          title={"Load more courses"}
          classNames={"add-course-button-size"}
        />
      </footer>
      {modalVisible && modalType === ModalType.SuggestCourse && (
        <div className="Page-Modal">
          <SuggestCourseModal onModalClose={setModalVisible} />
        </div>
      )}
      {modalVisible && modalType === ModalType.DetailedCourseView && (
        <div className="Page-Modal">
          <DetailedCourseViewModal
            courseContext={currentCourseContext}
            onModalClose={setModalVisible}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
