import React from "react";
import AddPlusArrow from "../../../images/icons/add-plus-arrow-icon.svg";
import "./action-button-style.css";

interface IActionButtonProps {
  title: string;
  plusSymbol: boolean;
  action?: () => void;
  classNames?: string;
  titleClassNames?: string;
}
function ActionButton(props: IActionButtonProps) {
  return (
    <div
      className={`Action-button__main ${props.classNames || ""}`}
      onClick={props.action}
    >
      <div className={`Action-button__plus-arrow center-buttons`}>
        {props.plusSymbol && <img alt="add button" src={AddPlusArrow}></img>}
      </div>
      <div
        className={`Action-button__text center-buttons button-padding ${
          props.titleClassNames ? props.titleClassNames : ""
        }`}
      >
        {props.title}
      </div>
    </div>
  );
}

export default ActionButton;
