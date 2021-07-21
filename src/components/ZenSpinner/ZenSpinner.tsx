import React from "react";
import "./zen-spinner-style.css";
import SpinnerLogo from "../../images/logos/zen-spinner-logo.svg";
interface ZenSpinnerProps {
  classNames?: string;
}
function ZenSpinner(props: ZenSpinnerProps) {
  return (
    <div className={`Spinner__Main ${props.classNames || ""}`}>
      <div className="Spinner__Body">
        <img src={SpinnerLogo} alt={"loading"} />
      </div>
    </div>
  );
}

export default ZenSpinner;
