import React from "react";
import "./header-bar-style.css";
import ZenLogo from "../../images/logos/zen-logo.svg";
import ProfileIcon from "../profile-icon";
//import doGoogleLogin from "../../services/auth";

function HeaderBar() {
  // const [done, setDone] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState<string>("");
  const handleGoogleLogin = () => {
    // doGoogleLogin({ setDone, setErrorMessage });
  };

  return (
    <nav className="Nav__Header-bar">
      <div className="Nav__Header-bar_body">
        <div className="Nav__Header-bar__Zen-logo-section">
          <img className="app-logo" src={ZenLogo} alt="zen logo"></img>
        </div>
        <div className="Nav__Header-bar__Apple-title-section">
          <h3 className="app-title">Course Repo</h3>
        </div>
        <div className="Nav__Header-bar__Profile-section">
          <p className="profile-name">Guest</p>
          <ProfileIcon
            classNames="Nav__Header-bar__profile-icon-image"
            loginClickHandler={handleGoogleLogin}
          />
        </div>
      </div>
    </nav>
  );
}

export default HeaderBar;
