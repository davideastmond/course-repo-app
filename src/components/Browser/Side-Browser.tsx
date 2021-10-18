import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCourseFilter } from "../../reducers";
import {
  CourseCategory,
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
} from "../../types";
import { getMenuOptions } from "./Side-browser-factory";

import "./side-browser-style.css";

function SideBrowser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const getFriendlyNameMenuOptions = () => {
    return ["All", ...Object.values(COURSE_CATEGORY_FRIENDLY_DICTIONARY)];
  };

  const getIndexedCategories = () => {
    const optionsObject: { [key in number]: string } = {};
    Object.values(CourseCategory).forEach((category, index) => {
      optionsObject[index + 1] = category;
    });
    optionsObject[0] = "all";
    return optionsObject;
  };
  const options = getIndexedCategories();
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setCourseFilter(options[selectedOption]));
    if (filterMenuOpen) {
      setFilterMenuOpen(false);
    }
    //setFilterMenuOpen(!filterMenuOpen)
  }, [selectedOption, dispatch]);

  const handleSearchClick = () => {
    history.push("/search");
  };

  const toggleSideMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };
  return (
    <div className="Side-browser__Main">
      <div className="Side-browser__header">
        <div
          onClick={handleSearchClick}
          className="Side-browser__header-text Side-browser__link-to-search pointer"
        >
          SEARCH
        </div>
        <div className="Side-browser__header-text menu-separator">
          {filterMenuOpen ? (
            <div
              className="Side-browser__header__toggle-button mobile-only"
              onClick={toggleSideMenu}
            >
              ▼ FILTER BY TOPIC
            </div>
          ) : (
            <div
              className="Side-browser__header__toggle-button mobile-only"
              onClick={toggleSideMenu}
            >
              ▶ FILTER BY TOPIC
            </div>
          )}
          <div className="Side-browser__header__toggle-button desktop-only">
            FILTER BY TOPIC
          </div>
        </div>
      </div>
      {filterMenuOpen && (
        <div className="Side-browser__menu-body_main side-browser-overlay">
          {getMenuOptions({
            titles: getFriendlyNameMenuOptions(),
            isSelected: selectedOption,
            clickAction: setSelectedOption,
            classNames: "side-menu-option-mobile-styling",
          })}
        </div>
      )}
      {!filterMenuOpen && (
        <div className="Side-browser__menu-body_main desktop-only">
          {getMenuOptions({
            titles: getFriendlyNameMenuOptions(),
            isSelected: selectedOption,
            clickAction: setSelectedOption,
          })}
        </div>
      )}
    </div>
  );
}

export default SideBrowser;
