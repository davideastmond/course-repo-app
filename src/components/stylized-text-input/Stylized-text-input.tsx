import React, { useState } from "react";
import "./stylized-text-input-style.css";

interface IStylizedTextInputProps {
  id: string;
  classNames?: string;
  placeholderText?: string;
  value?: string;
  inputBoxClassNames?: string;
  onEnterKeyPressed?: (textInputValue: string) => void;
  onTextChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

function StylizedTextInput(props: IStylizedTextInputProps) {
  const [textValue, setTextValue] = useState<string>(props.value || "");
  const textValueChanged = (e: any) => {
    setTextValue(e.target.value);
    props.onTextChange && props.onTextChange(e);
  };

  const handleEnterKeyPressed = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onEnterKeyPressed && props.onEnterKeyPressed(textValue);
    }
  };

  const handleLostFocus = (e: any) => {
    props.onBlur && props.onBlur(e);
  };
  return (
    <div className={`Styled-input-box__Main ${props.classNames || ""}`}>
      <input
        className={`Styled-input-box__input ${props.inputBoxClassNames || ""}`}
        type="text"
        placeholder={props.placeholderText}
        value={textValue}
        onChange={textValueChanged}
        onKeyPress={handleEnterKeyPressed}
        id={props.id}
        onBlur={handleLostFocus}
      ></input>
    </div>
  );
}

export default StylizedTextInput;
