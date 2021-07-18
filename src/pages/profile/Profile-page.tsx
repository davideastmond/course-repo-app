import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import HeaderBar from "../../components/header-bar";
import ProfileIcon from "../../components/profile-icon";
import {
  checkIsAuthedAsync,
  logOutAsync,
  selectIsLoggedIn,
  selectLoggedInUser,
} from "../../reducers";
import doGoogleLogin from "../../services/auth";
import { IProcessedUser } from "../../types";
import ProfileChangeIcon from "../../images/icons/add-photo.svg";
import TextFieldUpdateIcon from "../../images/icons/text-field-update-icon.svg";
import "./profile-page-style.css";
import "./table-styling.css";
import InterestsTable from "../../components/interests-table";
import AddInterestsModal from "../../components/addInterestsModal";

function ProfilePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const userData = useSelector(
    selectLoggedInUser,
    shallowEqual
  ) as IProcessedUser;
  const [authInProgress, setAuthInProgress] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    doGoogleLogin({ setDone, setErrorMessage });
    setAuthInProgress(true);
    dispatch(checkIsAuthedAsync());
  };

  const handleLogOut = () => {
    dispatch(logOutAsync());
  };

  // console.log("Profile isloggedIn", window.sessionStorage.getItem("user_data"))

  return (
    <div className="Profile-page__container">
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
            <div className="Profile-page__Welcome_header-welcome-back large-monteserrat-bold-font title-text-vertically-centered">
              Welcome back,
            </div>
            <div className="Profile-page__Welcome_header-welcome-back_name large-monteserrat-medium-font title-text-vertically-centered">
              {userData.firstName}
            </div>
          </div>
          <div className="Profile-page__Welcome-message-enclosure__mobile">
            <div className="Profile-page__Welcome-message-text__mobile__sm large-monteserrat-bold-font title-text-vertically-centered">
              Welcome back, {userData.firstName}
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
                  {userData.jobTitle || ""}
                </td>
                <td className="bottom-border edit-text-icon-spacing">
                  <img src={TextFieldUpdateIcon} alt="Update job title" />
                </td>
              </tr>
              <tr>
                <td className="cell-padding label-category-width font-category-title">
                  DEPARTMENT
                </td>
                <td className="font-plain-text-cell-data">
                  {userData.department || ""}
                </td>
                <td className="empty"></td>
              </tr>
            </tbody>
          </table>
          <InterestsTable
            interestTags={[
              "Lorem",
              "Bid dad water way",
              "Reuben",
              "Huzzzz",
              "Joseph",
              "Alternation",
              "Induction",
              "Concrete",
              "Tenser Flow Automation",
              "Thyme",
              "Astral Dunce",
              "Collaboration",
              "Soup styles",
              "Pepper shaker",
              "Risk",
              "King",
              "Interstellar",
            ]}
          />
        </div>
      </div>
      <div className="Page-Modal">
        <AddInterestsModal />
      </div>
    </div>
  );
}

export default ProfilePage;
