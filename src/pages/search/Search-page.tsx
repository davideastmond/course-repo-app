import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import "./search-page-style.css";
import HeaderBar from "../../components/header-bar";
import {
  checkIsAuthedAsync,
  clearCurrentCourseContext,
  getDetailedCourseByIdAsync,
  getLoggedInUserAsync,
  logOutAsync,
  selectCurrentCourseContext,
  selectIsLoggedIn,
  selectLoggedInUser,
} from "../../reducers";

import RadioGroup from "../../components/radio-group";
import { IRadioClicked } from "../../components/radio-group/Radio-toggle-set";
import StylizedTextInput from "../../components/stylized-text-input";
import {
  performSearchAsync,
  selectSearchResults,
  selectSearchStatus,
  selectSearchString,
  setSearchString,
} from "../../reducers/search-slice";
import DataContainer from "../../components/course-container";
import doGoogleLogin from "../../services/auth";
import ZenSpinner from "../../components/Spinner";
import { StatusState } from "../../utils/state-status";
import { AlertType } from "../../components/alert-toast/types";
import AlertToast from "../../components/alert-toast";
import { ModalType } from "../../types/modal.types";
import ProfileView from "../../components/Profile-view";
import DetailedCourseViewModal from "../../components/detailed-course-view-modal";

enum SearchResultFilterSetting {
  Courses = 0,
  Users = 1,
}
function SearchPage() {
  const [filterSetting, setFilterSetting] = useState<SearchResultFilterSetting>(
    SearchResultFilterSetting.Courses
  );
  const [done, setDone] = useState<boolean>(false);
  const searchErrorStatus = useSelector(selectSearchStatus, shallowEqual);
  const [spinnerOn, setSpinnerOn] = useState<boolean>(false);
  const [, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const userData = useSelector(selectLoggedInUser, shallowEqual);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const searchResults = useSelector(selectSearchResults, shallowEqual);
  const searchString = useSelector(selectSearchString, shallowEqual);
  const [profileDetailUserId, setProfileDetailUserId] = useState<string>("");
  const [modalType, setModalType] = useState<ModalType>(ModalType.nullModal);
  const currentCourseContext = useSelector(
    selectCurrentCourseContext,
    shallowEqual
  );
  const handleGoogleLogin = () => {
    doGoogleLogin({ setDone, setErrorMessage });
    setAuthInProgress(true);
    dispatch(checkIsAuthedAsync());
  };
  const handleLogOut = () => {
    dispatch(logOutAsync());
  };
  const handleRadioFilterClicked = (e: IRadioClicked) => {
    switch (e.label) {
      case "Courses":
        setFilterSetting(SearchResultFilterSetting.Courses);
        break;
      case "Users":
        setFilterSetting(SearchResultFilterSetting.Users);
        break;
    }
  };

  const handleOnCompleted = (completionData: boolean) => {
    if (completionData === true) {
      setSpinnerOn(false);
      setTimer(false);
    }
  };

  const handleOnSearchSubmit = (textInputValue: string) => {
    dispatch(
      performSearchAsync({
        searchQuery: textInputValue,
        onCompleted: handleOnCompleted,
      })
    );
    setSpinnerOn(true);
    setTimer(true);
  };

  const handleSearchTextBoxChange = (e: any) => {
    const queryString = e.target.value;
    if (queryString && queryString.trim()) {
      dispatch(setSearchString(queryString));
      setTimer(true);
    }
  };

  const setTimer = (start: boolean) => {
    let seconds = 0;
    const timer = setInterval(() => {
      seconds += 1;
      if (seconds >= 5) clearInterval(timer);
    }, 500);

    if (!start) {
      clearInterval(timer);
    }
  };
  const handleModalClosed = () => {
    setModalVisible(false);
    setModalType(ModalType.nullModal);
    dispatch(clearCurrentCourseContext());
    document.body.classList.remove("no-body-scroll");
  };

  const handleGenericUserProfileClick = (id: string) => {
    if (id) {
      setProfileDetailUserId(id);
      setModalType(ModalType.ProfileDetailView);
      setModalVisible(true);
      document.body.classList.add("no-body-scroll");
    }
  };

  const handleCourseCardClickedSearchPage = (id: string) => {
    dispatch(getDetailedCourseByIdAsync({ id }));
  };

  useEffect(() => {
    if (searchString && searchString.trim() !== "") {
      dispatch(
        performSearchAsync({
          searchQuery: searchString,
          onCompleted: handleOnCompleted,
        })
      );
      setSpinnerOn(true);
      setTimer(true);
    }
  }, [searchString]);

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
  });

  return (
    <div className="Search-Page__container">
      {spinnerOn && (
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
      <div className="Search-Page__main-body middle-column">
        {/* <div className="column-width-40vw"></div> */}
        <div className="Search-Page__search_inner-column">
          <div className="Search-Page__search-section">
            <StylizedTextInput
              id="SearchPageTextBox"
              placeholderText="Search for a course..."
              inputBoxClassNames="search-box-styling main-font max-text-width text-padding"
              onEnterKeyPressed={handleOnSearchSubmit}
              onTextChange={handleSearchTextBoxChange}
              maxLength={255}
            />
          </div>
          <div className="Search-Page__filter-settings-container">
            {isLoggedIn && (
              <RadioGroup
                id="SearchPageResultsFilter"
                header="Filter by"
                options={["Courses", "Users"]}
                onRadioClicked={handleRadioFilterClicked}
              />
            )}
          </div>
          <div className="Search-Page__search-results-container">
            {searchErrorStatus &&
              searchErrorStatus.state === StatusState.Error && (
                <AlertToast
                  message={`Server error: ${searchErrorStatus.error}`}
                  alertType={AlertType.Error}
                  textClassNames="error-text"
                  classNames="justify-center"
                />
              )}
            {filterSetting === SearchResultFilterSetting.Courses && (
              <DataContainer
                loggedInUser={userData}
                courses={searchResults.courses ? searchResults.courses : []}
                genericUserProfileClickHandler={handleGenericUserProfileClick}
                courseCardClickHandler={handleCourseCardClickedSearchPage}
                showCourseCardLikes={true}
              />
            )}
            {filterSetting === SearchResultFilterSetting.Users && (
              <DataContainer
                loggedInUser={userData}
                users={searchResults.users ? searchResults.users : []}
                genericUserProfileClickHandler={handleGenericUserProfileClick}
                courseCardClickHandler={() => {}}
                showCourseCardLikes={true}
              />
            )}
          </div>
        </div>
        {/* <div className="column-width-40vw"></div> */}
      </div>
      {modalVisible && modalType === ModalType.ProfileDetailView && (
        <div className="Page-Modal">
          <ProfileView
            onModalClose={handleModalClosed}
            userId={profileDetailUserId}
            closeButtonVisible={true}
          />
        </div>
      )}
      {modalVisible && modalType === ModalType.DetailedCourseView && (
        <div className="Page-Modal">
          <DetailedCourseViewModal
            courseContext={currentCourseContext}
            onModalClose={handleModalClosed}
          />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
function setAuthInProgress(arg0: boolean) {
  //throw new Error("Function not implemented.");
}
