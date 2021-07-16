import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCourseFilter } from "../../reducers";
import { getMenuOptions } from "./Side-browser-factory";

import "./side-browser-style.css";

function SideBrowser() {
  const dispatch = useDispatch();
  const options: { [key in number]: string } = {
    0: "all",
    1: "design",
    2: "engineering",
    3: "human_resources",
    4: "management",
    5: "marketing",
    6: "product",
    7: "sales",
  };

  const [selectedOption, setSelectedOption] = useState<number>(0);

  useEffect(() => {
    dispatch(setCourseFilter(options[selectedOption]));
  }, [selectedOption, dispatch]);

  return (
    <div className="Side-browser__Main">
      <div className="Side-browser__header">
        <div className="Side-browser__header-text menu-separator">
          BROWSE BY TOPIC
        </div>
      </div>
      <div className="Side-browser__menu-body_main">
        {getMenuOptions({
          titles: [
            "All",
            "Design",
            "Engineering",
            "Human Resources",
            "Management",
            "Marketing",
            "Product",
            "Sales",
          ],
          isSelected: selectedOption,
          clickAction: setSelectedOption,
        })}
      </div>
    </div>
  );
}

export default SideBrowser;
