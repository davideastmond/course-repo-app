import React from "react";
import "./stylized-text-input-style.css";

interface IStylizedTextInputProps {
  classNames?: string;
  placeholderText?: string;
  inputBoxClassNames?: string;
  onTextChange?: (e: any) => void;
}

function StylizedTextInput(props: IStylizedTextInputProps) {
  return (
    <div className={`Styled-input-box__Main ${props.classNames || ""}`}>
      <input
        className={`Styled-input-box__input ${props.inputBoxClassNames || ""}`}
        type="text"
        placeholder={props.placeholderText || ""}
        onChange={props.onTextChange}
      ></input>
    </div>
  );
}

export default StylizedTextInput;
