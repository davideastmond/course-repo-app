import React from "react";

import "./context-menu-style.css";

interface IContextMenuProps {
  children: JSX.Element[] | JSX.Element;
}
function ContextMenu(props: IContextMenuProps) {
  return <div className="ContextMenu__root__main-body">{props.children}</div>;
}

export default ContextMenu;
