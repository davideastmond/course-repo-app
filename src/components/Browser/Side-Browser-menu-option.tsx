import React from "react";
import "./side-browser-style.css";
interface ISideBrowserMenuOptionProps {
  optionLabel: string;
}
function SideBrowserMenuOption(props: ISideBrowserMenuOptionProps) {
  return (
    <div className="Side-browser-option__main">
      <div className="Side-browser-menu-option-label menu-separator">
        {props.optionLabel}
      </div>
    </div>
  );
}

export default SideBrowserMenuOption;
