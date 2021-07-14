import React, { useEffect, useState, useRef } from "react";
import "./header-bar-style.css";
import ZenLogo from "../../images/logos/zen-logo.svg";
import ProfileIcon from "../profile-icon";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { checkIsAuthedAsync, selectIsLoggedIn } from "../../reducers";
import { ContextMenu, ContextMenuOption } from "../context-menu";
import { ContextMenuSeparator } from "../context-menu/Menu-divider";
import doGoogleLogin from "../../services/auth";

const ProfileContextMenu = (
  loggedInStatus: boolean,
  actions: {
    googleLogInCallBack: () => void;
    logOutCallBack: () => void;
    showProfileCallBack: () => void;
  }
) => {
  return loggedInStatus ? (
    <ContextMenu>
      <ContextMenuOption title="Profile" action={actions.showProfileCallBack} />
      {ContextMenuSeparator()}
      <ContextMenuOption title="Logout" action={actions.logOutCallBack} />
    </ContextMenu>
  ) : (
    <ContextMenu>
      <ContextMenuOption
        title="Sign in with Google"
        action={actions.googleLogInCallBack}
      />
    </ContextMenu>
  );
};

function HeaderBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleGoogleLogin = () => {
    doGoogleLogin({ setDone, setErrorMessage });
    console.log("Handle google log-in");
  };

  const handleLogOut = () => {
    console.log("Handle log out!");
  };

  const handleShowProfile = () => {
    console.log("Handle show profile");
  };
  useEffect(() => {
    dispatch(checkIsAuthedAsync());
  }, []);

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

  useEffect(() => {
    console.log("isLoggedIn?", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <nav className="Nav__Header-bar">
      <div className="Nav__Header-bar_body">
        <div className="Nav__Header-bar__Zen-logo-section">
          <img className="app-logo" src={ZenLogo} alt="zen logo"></img>
        </div>
        <div className="Nav__Header-bar__Apple-title-section">
          <h3 className="app-title">Zen Learn</h3>
        </div>
        <div className="Nav__Header-bar__Profile-section">
          {!isLoggedIn && (
            <>
              <p className="profile-name">Guest</p>
              <ProfileIcon
                classNames="Nav__Header-bar__profile-icon-image"
                loginClickHandler={() => setProfileMenuOpen(true)}
                genericUser={true}
              />
              {profileMenuOpen &&
                ProfileContextMenu(isLoggedIn, {
                  googleLogInCallBack: handleGoogleLogin,
                  logOutCallBack: handleLogOut,
                  showProfileCallBack: handleShowProfile,
                })}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default HeaderBar;
