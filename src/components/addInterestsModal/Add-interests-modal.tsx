import React, { useState } from "react";
import ActionButton from "../Buttons/ActionButton";
import InterestsList from "../interests-table/Interests-list";
import StylizedTextInput from "../stylized-text-input";
import "./add-interests-style.css";

function AddInterestsModal() {
  const [interestsTags, setInterestTags] = useState<string[]>([
    "first tag dummy",
  ]);
  const [currentInterestsString, setCurrentInterestsString] =
    useState<string>("");

  const getCurrentInterestsStringFromInput = (e: any) => {
    if (!e.target.value) return;
    const str = e.target.value.trim().toLowerCase() as string;
    setCurrentInterestsString(str);
  };
  return (
    <div className="Add-interests-modal__Main-window-body">
      <header className="Add-interest-modal__Header-Enclosure">
        <div className="Add-interests-modal__Header large-header-text">
          Add topics of interest
        </div>
      </header>
      <div className="Add-interests-modal__Middle-section__main">
        <div className="Add-interests-modal__Middle-section__main__add-tags-prompt-text open-sans-font-family font-size-16px">
          Add a comma between each tag. Example: sales,
        </div>
        <div className="Add-interests-modal__Middle-input-section__enclosure">
          <StylizedTextInput
            inputBoxClassNames={
              "font-size-16px open-sans-font-family width-400px"
            }
            onTextChange={getCurrentInterestsStringFromInput}
          />
          <ActionButton
            classNames="Action-button__color__plain Action-button__slim"
            title="+ Add tags"
            plusSymbol={true}
          />
        </div>
        <InterestsList interestTags={interestsTags} />
      </div>
    </div>
  );
}

export default AddInterestsModal;
