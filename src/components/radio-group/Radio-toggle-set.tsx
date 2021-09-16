import React, { useState } from "react";
import "./radio-toggle-set-style.css";
import RadioFilled from "./radio-t.svg";
import RadioEmpty from "./radio-f.svg";

interface IRadioGroupProps {
  id: string;
  header?: string;
  options: string[];
  onRadioClicked?: (e: IRadioClicked) => void;
  classNames?: string;
}

interface IRadioButtonProps {
  label: string;
  selected: boolean;
  index: number;
  id: string;
  onRadioClicked: (e: IRadioClicked) => void;
}

export interface IRadioClicked {
  id: string;
  label: string;
  index: number;
}
const RadioButton = (props: IRadioButtonProps) => {
  const handleRadioButtonClicked = () => {
    props.onRadioClicked({
      id: props.id,
      label: props.label,
      index: props.index,
    });
  };
  return (
    <div
      key={`${props.id}_${props.index}`}
      className={`Radio-Option__main ${props.label}`}
    >
      {props.selected ? (
        <img
          className="pointer"
          src={RadioFilled}
          alt="selected"
          onClick={handleRadioButtonClicked}
        />
      ) : (
        <img
          className="pointer"
          src={RadioEmpty}
          alt="notSelected"
          onClick={handleRadioButtonClicked}
        />
      )}
      <div className="Radio-Option__label-text">{props.label}</div>
    </div>
  );
};

interface IRadioAttributes {
  id: string;
  index: number;
  selected: boolean;
  label: string;
}

function mapRadioToggleSetPropsToState(data: {
  options: string[];
  id: string;
}): IRadioAttributes[] {
  return data.options.map((option, index) => {
    return {
      id: data.id,
      index: index,
      selected: index === 0,
      label: option,
    };
  });
}
function RadioGroup(props: IRadioGroupProps) {
  const [radios, setRadioAttributes] = useState(
    mapRadioToggleSetPropsToState({ options: props.options, id: props.id })
  );

  const handleRadioClicked = (e: IRadioClicked) => {
    const currentRadios = radios;
    const allRadiosUnSelected = currentRadios.map((radio) => {
      return {
        ...radio,
        selected: false,
      };
    });
    allRadiosUnSelected[e.index].selected = true;
    setRadioAttributes(allRadiosUnSelected);
    if (props.onRadioClicked) {
      props.onRadioClicked(e);
    }
  };
  return (
    <div
      className={`${props.classNames || ""} Radio-toggle-set__main-enclosure`}
    >
      {props.header && (
        <div className="Radio-toggle-set__Header-enclosure">
          <div className="Radio-toggle-set__Header-text main-font">
            {props.header}
          </div>
        </div>
      )}
      <div className="Radio-toggle-set__body">
        {radios.map((radio) => (
          <RadioButton
            id={radio.id}
            label={radio.label}
            selected={radio.selected}
            index={radio.index}
            onRadioClicked={handleRadioClicked}
          />
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
