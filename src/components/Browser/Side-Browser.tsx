import React from "react";
import SideBrowserMenuOption from "./Side-Browser-menu-option";
import "./side-browser-style.css";

function SideBrowser() {
  return (
    <div className="Side-browser__Main">
      <div className="Side-browser__header">
        <div className="Side-browser__header-text menu-separator">
          BROWSE BY TOPIC
        </div>
      </div>
      <div className="Side-browser__menu-body_main">
        <SideBrowserMenuOption optionLabel="Design" />
        <SideBrowserMenuOption optionLabel="Engineering" />
        <SideBrowserMenuOption optionLabel="Human Resources" />
        <SideBrowserMenuOption optionLabel="Management" />
        <SideBrowserMenuOption optionLabel="Marketing" />
        <SideBrowserMenuOption optionLabel="Product" />
        <SideBrowserMenuOption optionLabel="Sales" />
      </div>
    </div>
  );
}

export default SideBrowser;
