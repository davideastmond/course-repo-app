import React from "react";
import { StatusState } from "../../utils/state-status";
import ZenSpinner from "../Spinner";
import ErrorAlertIcon from "../../images/icons/error-alert-circle.svg";
import "./status-module-style.css";

function StatusModule({
  status,
  className,
}: {
  status: {
    state: keyof typeof StatusState;
    [stateKey: string]: string;
  };
  className?: string;
}) {
  switch (status.state as StatusState) {
    case StatusState.Loading:
      return (
        <ZenSpinner
          // message={status[status.state]}
          classNames={`Status-spinner ${className || ""}`}
        />
      );
    case StatusState.Error:
      return (
        <div className="Status__error-strip__main">
          <div className="Status__error-alert-icon__enclosure">
            <img src={ErrorAlertIcon} alt="alert" />
          </div>
          <div className="Status__error-alert-text">{status.error}</div>
        </div>
      );
    default:
      return null;
  }
}

export default StatusModule;
