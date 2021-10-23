import React from "react";
import "./zen-spinner-style.css";
import SpinnerLogo from "../../images/logos/alternate-spinner.svg";
interface ISpinnerProps {
  classNames?: string;
}
function Spinner(props: ISpinnerProps) {
  return (
    <div className={`Spinner__Main ${props.classNames || ""}`}>
      <div className="Spinner__Body">
        <img src={SpinnerLogo} alt={"loading"} />
      </div>
    </div>
  );
}

export default Spinner;
