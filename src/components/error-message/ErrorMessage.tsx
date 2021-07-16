import React from "react";
import "./error-message-style.css";
interface IErrorMessageProps {
  classNames?: string;
  message: string;
}

const ErrorMessage = (props: IErrorMessageProps) => {
  return <div className={` ${props.classNames || ""}`}></div>;
};

export default ErrorMessage;
