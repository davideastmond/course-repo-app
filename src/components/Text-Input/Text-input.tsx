import React from "react";

import "./text-input-style.css";
interface ITextInputProps {
  placeHolderText?: string;
  classNames?: string;
  inputTextClassNames?: string;
  textChangeHandler?: () => void;
}
function TextInput(props: ITextInputProps) {
  return (
    <div className={`Text-Input__main ${props.classNames || ""}`}>
      <input
        className={`Text-input__text-box ${props.inputTextClassNames || ""}`}
        placeholder={`${props.placeHolderText || ""}`}
        onChange={props.textChangeHandler}
      />
    </div>
  );
}
export default TextInput;
