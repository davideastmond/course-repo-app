import React from "react";

import "./context-menu-style.css";

interface ContextMenuOptionProps {
  title: string;
  action?: () => void;
  onActionClicked?: (e?: any) => void;
  optionalClassNames?: string;
}
function ContextMenuOption(props: ContextMenuOptionProps) {
  const handleOptionClicked = (e: any) => {
    props.action && props.action();
    props.onActionClicked && props.onActionClicked(e);
  };
  return (
    <div
      className={`Context-menu-option__main-body ${
        props.optionalClassNames ? props.optionalClassNames : ""
      }`}
    >
      <div
        className="Context-menu-option__target-option Context-menu-option-text"
        onClick={handleOptionClicked}
      >
        {props.title}
      </div>
    </div>
  );
}

export default ContextMenuOption;
