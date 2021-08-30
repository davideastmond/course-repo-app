import React from "react";
import SideBrowserMenuOption from "./Side-Browser-menu-option";

export function getMenuOptions(props: {
  titles: string[];
  isSelected: number;
  clickAction: (index: number) => void;
}) {
  return props.titles.map((title, index) => (
    <SideBrowserMenuOption
      index={index}
      key={index}
      selected={props.isSelected === index}
      onClickHandler={props.clickAction}
      optionLabel={title}
    />
  ));
}
