import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BodyHeader from "../../components/body-header";
import SideBrowser from "../../components/Browser";
import ActionButton from "../../components/Buttons/ActionButton";

import DataContainer from "../../components/course-container";
import DetailedCourseViewModal from "../../components/detailed-course-view-modal";
import HeaderBar from "../../components/header-bar";
import ProfileView from "../../components/Profile-view";

import SuggestCourseModal from "../../components/suggest-course-modal";
import ZenSpinner from "../../components/Spinner";
import {
  checkIsAuthedAsync,
  clearCurrentCourseContext,
  getDetailedCourseByIdAsync,
  getLoggedInUserAsync,
  logOutAsync,
  selectAllCourses,
  selectCourseStateStatus,
  selectCurrentCourseContext,
  selectCurrentCourseContextLike,
  selectIsLoggedIn,
  selectLikeInProgress,
  selectLoggedInUser,
  toggleCourseLikeAsync,
} from "../../reducers";
import doGoogleLogin from "../../services/auth";
import { ModalType } from "../../types/modal.types";

import "./home-page-style.css";
import { StatusState } from "../../utils/state-status";
import AlertToast from "../../components/alert-toast";
import { AlertType } from "../../components/alert-toast/types";
import { fetchAllNotificationsAsync } from "../../reducers/notification-slice";

function HomePage() {
  const courses = useSelector(selectAllCourses, shallowEqual);
  const likeInProgress = useSelector(selectLikeInProgress, shallowEqual);
  const courseErrorState = useSelector(selectCourseStateStatus, shallowEqual);
  const currentCourseContext = useSelector(
    selectCurrentCourseContext,
    shallowEqual
  );
  const currentContextLike = useSelector(
    selectCurrentCourseContextLike,
    shallowEqual
  );
  const [done, setDone] = useState<boolean>(false);
  const [, setErrorMessage] = useState<string>("");
  const [authInProgress, setAuthInProgress] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const userData = useSelector(selectLoggedInUser, shallowEqual);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.nullModal);
  const [profileDetailUserId, setProfileDetailUserId] = useState<string>("");

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
  }, [dispatch]);

  useEffect(() => {
    if (done) {
      setAuthInProgress(false);
      window.location.reload();
    }
  }, [done]);

  useEffect(() => {
    if (currentCourseContext) {
      setModalType(ModalType.DetailedCourseView);
      setModalVisible(true);
      document.body.classList.add("no-body-scroll");
    }
  }, [currentCourseContext]);
  useEffect(() => {}, [currentCourseContext]);

  useEffect(() => {
    if (modalVisible) {
      document.body.classList.add("no-body-scroll");
    }
  }, [modalVisible]);
  const handleOpenCourseRecommendModal = () => {
    setModalType(ModalType.SuggestCourse);
    setModalVisible(true);
    document.body.classList.add("no-body-scroll");
  };

  const handleCourseCardClickedHomePage = (id: string) => {
    dispatch(getDetailedCourseByIdAsync({ id }));
  };

  const handleGenericUserProfileClick = (id: string) => {
    if (id) {
      setProfileDetailUserId(id);
      setModalType(ModalType.ProfileDetailView);
      setModalVisible(true);
      document.body.classList.add("no-body-scroll");
    }
  };

  const handleModalClosed = () => {
    setModalVisible(false);
    setModalType(ModalType.nullModal);
    dispatch(clearCurrentCourseContext());
    document.body.classList.remove("no-body-scroll");
  };

  useEffect(() => {
    window.scrollTo({
      top: 5000,
      behavior: "smooth",
    });
  }, [courses]);

  const handleDataContainerCourseToggleLike = (courseId: string) => {
    dispatch(toggleCourseLikeAsync({ id: courseId }));
  };

  return (
    <div className={`Home-Page__container`}>
      {authInProgress && (
        <div className="Home-Page__Spinner-Overlay">
          <ZenSpinner />
        </div>
      )}
      {courseErrorState &&
        courseErrorState.state === StatusState.Loading &&
        !likeInProgress && (
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
            {courseErrorState &&
              courseErrorState.state === StatusState.Error && (
                <AlertToast
                  message={`Server error: ${courseErrorState.error}`}
                  alertType={AlertType.Error}
                  textClassNames="error-text"
                  classNames="justify-center"
                />
              )}
            {courses && (
              <DataContainer
                courses={courses}
                courseCardClickHandler={handleCourseCardClickedHomePage}
                genericUserProfileClickHandler={handleGenericUserProfileClick}
                showCourseCardLikes={isLoggedIn}
                onCourseLikeToggle={handleDataContainerCourseToggleLike}
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
                classNames={"recommend-course-button-size bkg-green"}
                action={handleOpenCourseRecommendModal}
              />
            </div>
          )}
        </div>
      </div>
      <footer className="Home-page__footer">
        {/* <ActionButton
          plusSymbol={false}
          title={"Load more courses"}
          classNames={"add-course-button-size"}
          action={handleLoadCourses}
        /> */}
      </footer>
      {modalVisible && modalType === ModalType.SuggestCourse && (
        <div className="Page-Modal Home-page__suggest-course-modal">
          <SuggestCourseModal onModalClose={handleModalClosed} />
        </div>
      )}
      {modalVisible && modalType === ModalType.DetailedCourseView && (
        <div className="Page-Modal Home-page__detailed-course-view-modal">
          <DetailedCourseViewModal
            courseContext={currentCourseContext}
            onModalClose={handleModalClosed}
            onCourseLikeClicked={handleDataContainerCourseToggleLike}
            showLikes={isLoggedIn}
            currentCourseContextLike={currentContextLike}
          />
        </div>
      )}
      {modalVisible && modalType === ModalType.ProfileDetailView && (
        <div className="Page-Modal Home-page__Profile-view-modal">
          <ProfileView
            onModalClose={handleModalClosed}
            userId={profileDetailUserId}
            closeButtonVisible={true}
            onCourseLikeClicked={handleDataContainerCourseToggleLike}
            courseContext={currentCourseContext}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
