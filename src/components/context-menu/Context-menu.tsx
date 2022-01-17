import React from "react";

import "./context-menu-style.css";

interface IContextMenuProps {
  children: JSX.Element[] | JSX.Element;
  optionalClassNames?: string;
}
function ContextMenu(props: IContextMenuProps) {
  return (
    <div
      className={`ContextMenu__root__main-body ${
        props.optionalClassNames ? props.optionalClassNames : ""
      }`}
    >
      {props.children}
    </div>
  );
}

export default ContextMenu;
