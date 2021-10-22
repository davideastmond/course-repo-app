import React from "react";

import "./context-menu-style.css";

interface ContextMenuOptionProps {
  title: string;
  action: () => void;
  onActionClicked: () => void;
}
function ContextMenuOption(props: ContextMenuOptionProps) {
  const handleOptionClicked = () => {
    props.action();
    props.onActionClicked();
  };
  return (
    <div className="Context-menu-option__main-body">
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
