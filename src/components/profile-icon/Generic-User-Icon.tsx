import React from "react";
import "./profile-icon-style.css";
interface IGenericIconProps {
  userName: string;
  classNames?: string;
}

function GenericUserIcon(props: IGenericIconProps) {
  return (
    <div className={`Generic-Profile-Icon ${props.classNames || ""}`}>
      {props.userName.split("")[0]}
    </div>
  );
}

export default GenericUserIcon;
