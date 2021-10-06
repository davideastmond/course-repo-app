import React, { useEffect, useState } from "react";
import { getArrayOfInterestTagsFromString } from "../../utils/string-array/get-sanitized-tags-array";
import ActionButton from "../Buttons/ActionButton";
import InterestsList from "../interests-table/Interests-list";
import StylizedTextInput from "../stylized-text-input";
import "./add-interests-style.css";

interface IAddInterestModalProps {
  closeModalHandler: () => void;
  addInterestTagsSubmitHandler: (tags: string[]) => void;
}
function AddInterestsModal(props: IAddInterestModalProps) {
  const [interestsTags, setInterestTags] = useState<string[]>([]);
  const [currentInterestsString, setCurrentInterestsString] =
    useState<string>("");

  const getCurrentInterestsStringFromInput = (e: any) => {
    if (!e.target.value) return;
    const str = e.target.value.trim().toLowerCase() as string;
    setCurrentInterestsString(str);
  };

  const setTagsState = () => {
    const sanitizedTags = getArrayOfInterestTagsFromString(
      currentInterestsString
    );
    const concatenatedTags = [...interestsTags, ...sanitizedTags];
    setInterestTags(Array.from(new Set(concatenatedTags)));
    setCurrentInterestsString("");
    clearTextInput();
  };

  const clearTextInput = () => {
    const textInput = document.getElementById("textInput") as HTMLInputElement;
    if (textInput) {
      textInput.value = "";
    }
  };
  const handleDeleteInterestTag = (title: string) => {
    console.log("Interest to delete is", title);
    const tags = interestsTags.filter((tag) => {
      return tag !== title;
    });
    setInterestTags(tags);
  };

  useEffect(() => {
    console.log("Interest tags", interestsTags);
  }, [interestsTags]);

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
            id="textInput"
          />
          <ActionButton
            classNames="Action-button__slim"
            title="+ Add tags"
            plusSymbol={true}
            action={setTagsState}
          />
        </div>
        <InterestsList
          interestTags={interestsTags}
          deleteInterestHandler={handleDeleteInterestTag}
        />
      </div>
      <div className="Add-interests-modal__controls__footer__main">
        <div className="Add-interests-footer-controls__container">
          <ActionButton
            classNames="Action-button__color__plain Action-button__slim right-margin-buffer"
            title="Close window"
            plusSymbol={false}
            action={props.closeModalHandler}
          />
          <ActionButton
            classNames="Action-button__slim"
            title="Save changes"
            plusSymbol={false}
            action={() => props.addInterestTagsSubmitHandler(interestsTags)}
          />
        </div>
      </div>
    </div>
  );
}

export default AddInterestsModal;
