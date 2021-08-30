import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCourseFilter } from "../../reducers";
import {
  CourseCategory,
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
} from "../../types";
import { getMenuOptions } from "./Side-browser-factory";

import "./side-browser-style.css";

function SideBrowser() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(setCourseFilter(options[selectedOption]));
  }, [selectedOption, dispatch]);

  return (
    <div className="Side-browser__Main">
      <div className="Side-browser__header">
        <div className="Side-browser__header-text Side-browser__link-to-search pointer">
          SEARCH
        </div>
        <div className="Side-browser__header-text menu-separator">
          BROWSE BY TOPIC
        </div>
      </div>
      <div className="Side-browser__menu-body_main">
        {getMenuOptions({
          titles: getFriendlyNameMenuOptions(),
          isSelected: selectedOption,
          clickAction: setSelectedOption,
        })}
      </div>
    </div>
  );
}

export default SideBrowser;
