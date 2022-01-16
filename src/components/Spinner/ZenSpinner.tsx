import React from "react";
import "./zen-spinner-style.css";
import AltSpinnerLogo from "../../images/logos/alternate-spinner.svg";
import ZenSpinnerLogo from "../../images/logos/zen-spinner-logo.svg";
import { IS_ZEN } from "../../utils/environment";

interface ISpinnerProps {
  classNames?: string;
}
function Spinner(props: ISpinnerProps) {
  return (
    <div className={`Spinner__Main ${props.classNames || ""}`}>
      <div className="Spinner__Body">
        <img src={IS_ZEN ? ZenSpinnerLogo : AltSpinnerLogo} alt={"loading"} />
      </div>
    </div>
  );
}

export default Spinner;
