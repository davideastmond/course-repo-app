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
  label?: string;
  specialLabelIcon?: string;
  maxLength?: number;
  charCount?: boolean;
  multiLine?: boolean;
}

export const TEXT_INPUT_MAX_LENGTH: number = 524288;

function StylizedTextInput(props: IStylizedTextInputProps) {
  const [textValue, setTextValue] = useState<string>(props.value || "");
  const [charCount, setCharCount] = useState<number>(0);
  const textValueChanged = (e: any) => {
    setTextValue(e.target.value);
    props.onTextChange && props.onTextChange(e);
    setCharCount(e.target.value.length);
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
      {props.label && props.label.length > 0 && (
        <div className="Styled-input-box-Label-enclosure">
          {props.specialLabelIcon && (
            <img src={props.specialLabelIcon} alt="link" />
          )}
          <label
            className="Styled-input-box-label-text open-sans-font-family"
            htmlFor={props.id}
          >
            {props.label}
          </label>
        </div>
      )}
      {props.multiLine && props.multiLine === true ? (
        <div className="TextArea-Main-Section">
          <textarea
            className={`Styled-input-box__input Styled-input-box__multiline ${
              props.inputBoxClassNames || ""
            }`}
            placeholder={props.placeholderText}
            value={textValue}
            onChange={textValueChanged}
            onKeyPress={handleEnterKeyPressed}
            id={props.id}
            onBlur={handleLostFocus}
            maxLength={
              props.maxLength ? props.maxLength : TEXT_INPUT_MAX_LENGTH
            }
          ></textarea>
          {props.charCount && (
            <div className="Char-Count__text open-sans-font-family">{`${charCount} / ${
              props.maxLength || TEXT_INPUT_MAX_LENGTH
            }`}</div>
          )}
        </div>
      ) : (
        <div className="TextInput-Main-Section">
          <input
            className={`Styled-input-box__input ${
              props.inputBoxClassNames || ""
            }`}
            type="text"
            placeholder={props.placeholderText}
            value={textValue}
            onChange={textValueChanged}
            onKeyPress={handleEnterKeyPressed}
            id={props.id}
            onBlur={handleLostFocus}
            maxLength={
              props.maxLength ? props.maxLength : TEXT_INPUT_MAX_LENGTH
            }
          ></input>
          {props.charCount && (
            <div className="Char-Count__text open-sans-font-family">{`${charCount} / ${
              props.maxLength || TEXT_INPUT_MAX_LENGTH
            }`}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default StylizedTextInput;
