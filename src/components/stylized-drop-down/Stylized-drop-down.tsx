import React, { useState } from "react";
import "./stylized-drop-down.css";

interface IStylizedDropDownProps {
  items: [string, string][];
  id: string;
  classNames?: string;
  dropDownClassNames?: string;
  labelText: string;
  labelClassnames?: string;
  optionClassNames?: string;
  handleOnChange: (value: string) => void;
}

function StylizedDropDown(props: IStylizedDropDownProps) {
  const [_, setCurrentValue] = useState<string>("null");
  const handleDropDownChange = (e: any) => {
    const el = document.getElementById(props.id) as any;
    if (el) {
      setCurrentValue(el.value);
      props.handleOnChange(el.value);
    }
  };

  return (
    <div className={`${props.classNames || ""} StylizedDropDown__Main`}>
      <div className="StylizedDropDown__Main__label-enclosure">
        <label className={`${props.labelClassnames || ""}`} htmlFor={props.id}>
          {props.labelText}
        </label>
      </div>
      <div className="StylizedDropDown__Main__select-drop-down-enclosure">
        <select
          name={props.id}
          id={props.id}
          className={`${
            props.dropDownClassNames || ""
          } drop-down-selection-box-width`}
          onChange={handleDropDownChange}
        >
          <option
            className="StylizedDropDown__option"
            disabled
            selected
            value="null"
          ></option>
          {props.items &&
            props.items.length > 0 &&
            props.items.map((item, index) => (
              <option
                key={`${index.toString()}_${item[0]}`}
                className={`${
                  props.optionClassNames || ""
                } StylizedDropDown__option`}
                value={item[0]}
              >
                {item[1]}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default StylizedDropDown;
