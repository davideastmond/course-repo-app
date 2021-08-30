import React from "react";
import "./side-browser-style.css";
interface ISideBrowserMenuOptionProps {
  optionLabel: string;
  selected: boolean;
  index: number;
  onClickHandler: (index: number) => void;
}
function SideBrowserMenuOption(props: ISideBrowserMenuOptionProps) {
  return (
    <div
      className={`Side-browser-option__main menu-separator ${
        props.selected ? "Browser-option-selected" : ""
      }`}
      onClick={() => props.onClickHandler(props.index)}
    >
      <div className="Side-browser-menu-option-label">{props.optionLabel}</div>
    </div>
  );
}

export default SideBrowserMenuOption;
