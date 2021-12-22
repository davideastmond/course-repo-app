import React from "react";
import "./alert-toast-style.css";
import { AlertIconMap, AlertType } from "./types";

interface IErrorMessageProps {
  classNames?: string;
  textClassNames?: string;
  message: string;
  dismissTextFunction?: (message: string) => void;
  dismissErrorFunction?: (show: boolean) => void;
  alertType?: AlertType;
}

const ErrorMessage = (props: IErrorMessageProps) => {
  const handleDismiss = () => {
    props.dismissErrorFunction && props.dismissErrorFunction(false);
    props.dismissTextFunction && props.dismissTextFunction("");
  };
  return (
    <div
      className={`ErrorMessage__main-body ${props.classNames || ""}`}
      onClick={handleDismiss}
    >
      <div className={`AlertMessage__icon_div`}>
        <img
          className="AlertMessage__icon"
          alt="Alert Icon"
          src={
            AlertIconMap[props.alertType!] ||
            AlertIconMap[AlertType.Notification]
          }
        />
      </div>
      <div className={`AlertMessage__text ${props.textClassNames || ""}`}>
        {props.message}
      </div>
    </div>
  );
};

export default ErrorMessage;
