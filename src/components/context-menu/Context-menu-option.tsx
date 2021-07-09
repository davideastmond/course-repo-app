import React from "react";

import "./context-menu-style.css";

interface ContextMenuOptionProps {
  title: string;
  action: () => void;
}
function ContextMenuOption(props: ContextMenuOptionProps) {
  return (
    <div className="Context-menu-option__main-body">
      <div
        className="Context-menu-option__target-option Context-menu-option-text"
        onClick={props.action}
      >
        {props.title}
      </div>
    </div>
  );
}

export default ContextMenuOption;
