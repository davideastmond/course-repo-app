import React from "react";
import GenericProfileIcon from "../../images/profile/generic-profile-icon.svg";
import "./profile-icon-style.css";
interface IProfileIconProps {
  imageSrc?: string;
  classNames?: string;
}
function ProfileIcon(props: IProfileIconProps) {
  return (
    <div className="Profile-Icon__main">
      <img
        className={`profile-icon-image ${props.classNames || ""}`}
        src={props.imageSrc || GenericProfileIcon}
        alt="profile-icon"
      ></img>
    </div>
  );
}

export default ProfileIcon;
