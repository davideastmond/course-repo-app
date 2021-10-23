import React, { useEffect, useState, useRef } from "react";
import "./header-bar-style.css";
import AlternateAppLogo from "../../images/logos/alternate-app-logo.svg";
import ProfileIcon from "../profile-icon";
import { ContextMenu, ContextMenuOption } from "../context-menu";
import { ContextMenuSeparator } from "../context-menu/Menu-divider";
import { IProcessedUser } from "../../types";
import {
  selectCourseRecommendationModalOpenState,
  selectIsLoggedIn,
} from "../../reducers";
import { shallowEqual, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const ProfileContextMenu = (
  loggedInStatus: boolean,
  onMenuOptionClicked: (option: string) => void,
  actions: {
    googleLogInCallBack: () => void;
    logOutCallBack: () => void;
    showProfileCallBack: () => void;
  }
) => {
  return loggedInStatus ? (
    <ContextMenu>
      <ContextMenuOption
        title="Profile"
        action={actions.showProfileCallBack}
        onActionClicked={() => onMenuOptionClicked("profile")}
      />
      {ContextMenuSeparator()}
      <ContextMenuOption
        title="Logout"
        action={actions.logOutCallBack}
        onActionClicked={() => onMenuOptionClicked("logout")}
      />
    </ContextMenu>
  ) : (
    <ContextMenu>
      <ContextMenuOption
        title="Sign in with Google"
        action={actions.googleLogInCallBack}
        onActionClicked={() => onMenuOptionClicked("login")}
      />
    </ContextMenu>
  );
};

interface IHeaderBarProps {
  googleLoginAction: () => void;
  logOutAction: () => void;
  loggedIn: boolean;
  userData?: IProcessedUser;
}
function HeaderBar(props: IHeaderBarProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const courseRecommenderModalOpen = useSelector(
    selectCourseRecommendationModalOpenState,
    shallowEqual
  );
  const history = useHistory();
  const handleShowProfile = () => {
    history.push("/profile");
  };

  const isAppLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  useEffect(() => {
    if (courseRecommenderModalOpen && courseRecommenderModalOpen === true) {
      clickedInMenuRef.current = true;
    }
  }, [courseRecommenderModalOpen]);

  const clickedInMenuRef = useRef(false);
  useEffect(() => {
    const handleClose = () => {
      if (!clickedInMenuRef.current) {
        setProfileMenuOpen(false);
      } else {
        clickedInMenuRef.current = false;
        window?.addEventListener("click", handleClose, { once: true });
      }
    };
    if (profileMenuOpen) {
      window?.addEventListener("click", handleClose, { once: true });
    }

    return () => {
      window?.removeEventListener("click", handleClose);
    };
  }, [profileMenuOpen]);

  const userName = props.userData
    ? `${props.userData.firstName || ""} ${props.userData.lastName || ""}`
    : "Guest";
  const openProfileMenu = () => {
    setProfileMenuOpen(true);
    clickedInMenuRef.current = true;
  };

  const handleMenuOptionClicked = () => {
    setProfileMenuOpen(false);
  };
  return (
    <nav className="Nav__Header-bar">
      <div className="Nav__Header-bar_body">
        <div className="Nav__Header-bar__Zen-logo-section">
          <Link to="/">
            <img
              className="app-logo"
              src={AlternateAppLogo}
              alt="zen logo"
            ></img>
          </Link>
        </div>
        <div className="Nav__Header-bar__Apple-title-section">
          <h3 className="app-title">Course Repo</h3>
        </div>
        <div className="Nav__Header-bar__Profile-section">
          {!isAppLoggedIn && (
            <>
              <p className="profile-name">Guest</p>
              <ProfileIcon
                classNames="Nav__Header-bar__profile-icon-image"
                showProfileMenuHandler={openProfileMenu}
                genericUser={true}
              />
            </>
          )}
          {isAppLoggedIn && (
            <>
              <p className="profile-name">{userName}</p>
              <ProfileIcon
                classNames="Nav__Header-bar__profile-icon-image"
                genericUser={false}
                showProfileMenuHandler={openProfileMenu}
                imageSrc={
                  props.userData?.avatar ? props.userData.avatar[0].url : ""
                }
              />
            </>
          )}
          {profileMenuOpen &&
            ProfileContextMenu(isAppLoggedIn, handleMenuOptionClicked, {
              googleLogInCallBack: props.googleLoginAction,
              logOutCallBack: props.logOutAction,
              showProfileCallBack: handleShowProfile,
            })}
        </div>
      </div>
    </nav>
  );
}

export default HeaderBar;
