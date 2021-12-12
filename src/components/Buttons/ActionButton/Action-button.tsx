import React from "react";
import AddPlusArrow from "../../../images/icons/add-plus-arrow-icon.svg";
import "./action-button-style.css";

interface IActionButtonProps {
  title: string;
  plusSymbol: boolean;
  action?: () => void;
  classNames?: string;
  titleClassNames?: string;
  disabled?: boolean;
}
function ActionButton(props: IActionButtonProps) {
  return props.disabled && props.disabled === true ? (
    <div className={`Action-button__main ${props.classNames || ""}`}>
      <div className={`Action-button__plus-arrow center-buttons`}>
        {props.plusSymbol && <img alt="add button" src={AddPlusArrow}></img>}
      </div>
      <div
        className={`Action-button__text center-buttons button-padding text-button-disabled ${
          props.titleClassNames ? props.titleClassNames : ""
        }`}
      >
        {props.title}
      </div>
    </div>
  ) : (
    <div
      className={`Action-button__main ${props.classNames || ""}`}
      onClick={props.action}
    >
      <div className={`Action-button__plus-arrow center-buttons`}>
        {props.plusSymbol && <img alt="add button" src={AddPlusArrow}></img>}
      </div>
      <div
        className={`Action-button__text center-buttons button-padding text-button-enabled${
          props.titleClassNames ? props.titleClassNames : ""
        }`}
      >
        {props.title}
      </div>
    </div>
  );
}

export default ActionButton;
