import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCourseFilter } from "../../reducers";
import SideBrowserMenuOption from "./Side-Browser-menu-option";
import "./side-browser-style.css";

function SideBrowser() {
  const dispatch = useDispatch();
  const options: any = {
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
        <SideBrowserMenuOption
          index={0}
          selected={selectedOption === 0}
          onClickHandler={setSelectedOption}
          optionLabel="All"
        />
        <SideBrowserMenuOption
          index={1}
          selected={selectedOption === 1}
          onClickHandler={setSelectedOption}
          optionLabel="Design"
        />
        <SideBrowserMenuOption
          index={2}
          selected={selectedOption === 2}
          onClickHandler={setSelectedOption}
          optionLabel="Engineering"
        />
        <SideBrowserMenuOption
          index={3}
          selected={selectedOption === 3}
          onClickHandler={setSelectedOption}
          optionLabel="Human Resources"
        />
        <SideBrowserMenuOption
          index={4}
          selected={selectedOption === 4}
          onClickHandler={setSelectedOption}
          optionLabel="Management"
        />
        <SideBrowserMenuOption
          index={5}
          selected={selectedOption === 5}
          onClickHandler={setSelectedOption}
          optionLabel="Marketing"
        />
        <SideBrowserMenuOption
          index={6}
          selected={selectedOption === 6}
          onClickHandler={setSelectedOption}
          optionLabel="Product"
        />
        <SideBrowserMenuOption
          index={7}
          selected={selectedOption === 7}
          onClickHandler={setSelectedOption}
          optionLabel="Sales"
        />
      </div>
    </div>
  );
}

export default SideBrowser;
