import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import HeaderBar from "../../components/header-bar";
import ProfileIcon from "../../components/profile-icon";
import {
  checkIsAuthedAsync,
  deleteInterestTagsAsync,
  getInterestTagsAsync,
  logOutAsync,
  selectInterestTags,
  selectIsLoggedIn,
  selectLoggedInUser,
  selectUserStatus,
  updateInterestTagsAsync,
  updateUserJobTitleDepartmentAsync,
} from "../../reducers";
import doGoogleLogin from "../../services/auth";
import { IProcessedUser } from "../../types";
import ProfileChangeIcon from "../../images/icons/add-photo.svg";
import TextFieldUpdateIcon from "../../images/icons/text-field-update-icon.svg";
import "./profile-page-style.css";
import "./table-styling.css";
import InterestsTable from "../../components/interests-table";
import AddInterestsModal from "../../components/addInterestsModal";
import StatusModule from "../../components/StatusModule";
import StylizedTextInput from "../../components/stylized-text-input";

function ProfilePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const userData = useSelector(
    selectLoggedInUser,
    shallowEqual
  ) as IProcessedUser;
  const [authInProgress, setAuthInProgress] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [masterInterestTags, setMasterInterestTags] = useState<string[]>([]);
  const [isProfileEditMode, setIsProfileEditMode] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>(userData.jobTitle || "");
  const [department, setDepartment] = useState<string>(
    userData.department || ""
  );
  const dispatch = useDispatch();
  const fetchedInterests = useSelector(selectInterestTags, shallowEqual);
  const status = useSelector(selectUserStatus, shallowEqual);

  const handleGoogleLogin = () => {
    doGoogleLogin({ setDone, setErrorMessage });
    setAuthInProgress(true);
    dispatch(checkIsAuthedAsync());
  };

  const handleLogOut = () => {
    dispatch(logOutAsync());
  };

  const handleAddTags = (tags: string[]) => {
    if (tags && tags.length > 0) {
      const updatedTags = [...masterInterestTags, ...tags];
      setMasterInterestTags(updatedTags);
      dispatch(updateInterestTagsAsync({ id: "me", tags: updatedTags }));
    }
    setModalVisible(false);
  };

  const handleDeleteSingleTag = (title: string) => {
    const tags = [title];
    dispatch(deleteInterestTagsAsync({ id: "me", tags }));
  };

  useEffect(() => {
    if (fetchedInterests) {
      setMasterInterestTags(fetchedInterests);
    }
  }, [fetchedInterests]);

  useEffect(() => {
    dispatch(getInterestTagsAsync("me"));
  }, []);

  const handleJobTitleTextChanged = (e: any) => {
    if (e.target.value) {
      setJobTitle(e.target.value);
    }
  };

  const handleDepartmentTextChanged = (e: any) => {
    if (e.target.value) {
      setDepartment(e.target.value);
    }
  };

  const handleJobTitleInputEnterPressed = () => {
    dispatch(
      updateUserJobTitleDepartmentAsync({ id: "me", jobTitle, department })
    );
    setIsProfileEditMode(false);
  };
  const handleDepartmentInputEnterPressed = () => {
    dispatch(
      updateUserJobTitleDepartmentAsync({ id: "me", jobTitle, department })
    );
    setIsProfileEditMode(false);
  };

  return (
    <div className="Profile-page__container">
      <StatusModule status={status} />
      <HeaderBar
        googleLoginAction={handleGoogleLogin}
        loggedIn={isLoggedIn}
        logOutAction={handleLogOut}
        userData={userData || undefined}
      />
      <div className="Profile-page__Main-body">
        <div className="Profile-page__Welcome_header">
          <div className="Profile-page__Profile-Icon__enclosure">
            <ProfileIcon
              showProfileMenuHandler={() => {}}
              genericUser={!isLoggedIn}
              imageSrc={userData && userData.avatar && userData.avatar[0].url}
              classNames="large round"
            />
            <div className="Profile-icon-change-button">
              <img alt="change profile" src={ProfileChangeIcon} />
            </div>
          </div>
          <div className="Profile-page__Welcome-message-enclosure">
            <div className="Profile-page__Welcome_header-welcome-back mont-font bold title-text-vertically-centered large-font-size">
              {`Welcome back, ${userData.firstName}`}
            </div>
          </div>
        </div>
        <div className="Profile-page__Center-body">
          <table id="table-profile-data" className="profile-table table-font">
            <thead>
              <tr>
                <td className="Main-table-header-profile bottom-border cell-padding label-category-width">
                  Profile
                </td>
                <td className="bottom-border empty"></td>
                <td className="bottom-border empty"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="Table__job-title-label cell-padding bottom-border label-category-width font-category-title">
                  JOB TITLE
                </td>
                <td className="bottom-border font-plain-text-cell-data">
                  {isProfileEditMode ? (
                    <StylizedTextInput
                      value={jobTitle || userData.jobTitle}
                      id="jobTitleTextInput"
                      onTextChange={handleJobTitleTextChanged}
                      onEnterKeyPressed={handleJobTitleInputEnterPressed}
                    />
                  ) : (
                    userData.jobTitle
                  )}
                </td>
                <td className="bottom-border edit-text-icon-spacing">
                  <img
                    className="Profile-edit-icon"
                    src={TextFieldUpdateIcon}
                    alt="Update job title"
                    onClick={() => setIsProfileEditMode(true)}
                  />
                </td>
              </tr>
              <tr
                className="Department-row"
                onClick={() => console.log("clicked department row")}
              >
                <td className="cell-padding label-category-width font-category-title">
                  DEPARTMENT
                </td>
                <td className="font-plain-text-cell-data">
                  {isProfileEditMode ? (
                    <StylizedTextInput
                      value={department || userData.department}
                      id="departmentTextInput"
                      onTextChange={handleDepartmentTextChanged}
                      onEnterKeyPressed={handleDepartmentInputEnterPressed}
                    />
                  ) : (
                    userData.department
                  )}
                </td>
                <td className="empty"></td>
              </tr>
            </tbody>
          </table>
          <InterestsTable
            addInterestButtonClickHandler={() => setModalVisible(true)}
            interestTags={masterInterestTags}
            deleteInterestsHandler={handleDeleteSingleTag}
          />
        </div>
      </div>
      {modalVisible && (
        <div className="Page-Modal">
          <AddInterestsModal
            closeModalHandler={() => setModalVisible(false)}
            addInterestTagsSubmitHandler={handleAddTags}
          />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
