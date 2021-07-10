import React, { useEffect } from "react";
import "./header-bar-style.css";
import ZenLogo from "../../images/logos/zen-logo.svg";
import ProfileIcon from "../profile-icon";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { checkIsAuthedAsync, selectIsLoggedIn } from "../../reducers";
// import { ContextMenu, ContextMenuOption } from "../context-menu";
// import { ContextMenuSeparator } from "../context-menu/Menu-divider";
//import doGoogleLogin from "../../services/auth";

function HeaderBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);

  const handleGoogleLogin = () => {
    // doGoogleLogin({ setDone, setErrorMessage });
  };
  useEffect(() => {
    dispatch(checkIsAuthedAsync());
  }, []);

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
                loginClickHandler={handleGoogleLogin}
                genericUser={true}
              />
            </>
          )}

          {/* <ContextMenu>
            <ContextMenuOption
              title="Profile"
              action={() => console.log("profile button clicked")}
            />
            {ContextMenuSeparator()}
            <ContextMenuOption
              title="Logout"
              action={() => console.log(" logout button clicked")}
            />
          </ContextMenu> */}
        </div>
      </div>
    </nav>
  );
}

export default HeaderBar;
