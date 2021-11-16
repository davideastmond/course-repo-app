import React, { useEffect, useState } from "react";
import ActionButton from "../Buttons/ActionButton";
import TagApplet from "../Tags-applet";
import "./add-interests-style.css";

interface IAddInterestModalProps {
  closeModalHandler: () => void;
  addInterestTagsSubmitHandler: (tags: string[]) => void;
}
function AddInterestsModal(props: IAddInterestModalProps) {
  const [interestsTags, setInterestTags] = useState<string[]>([]);
  return (
    <div className="Add-interests-modal__Main-window-body">
      <header className="Add-interest-modal__Header-Enclosure">
        <div className="Add-interests-modal__Header large-header-text">
          Add topics of interest
        </div>
      </header>
      <div className="Add-interests-modal__Middle-section__main">
        <TagApplet
          readOnly={false}
          inputBoxClassnames={
            "font-size-16px open-sans-font-family width-400px"
          }
          onTagsChanged={setInterestTags}
          tags={interestsTags}
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
