import React from "react";
import OpenDoodle from "../../images/graphics/open-doodles.svg";
import ActionButton from "../Buttons/ActionButton";

import "./empty-interests-style.css";
function EmptyInterestsSection() {
  return (
    <div className="Empty-Interests__Main-body">
      <div className="Empty-Interests__graphic-section">
        <img src={OpenDoodle} alt={"No interests"} />
      </div>
      <div className="Empty-Interests__text-and-instructions__main">
        <div className="No-interests-yet-label font-no-interests-header-style centered-text margin-bottom-15">
          You haven't added any interests yet
        </div>
        <div className="No-interests-yet-label-instructions font-no-interests-instructions-style centered-text margin-bottom-15">
          Here you’ll find all the different topics you’re interested in. Click
          “Add an interest” to start
        </div>
      </div>
      <div className="Empty-Interests__Add-Interests__Action-button__main">
        <ActionButton
          title="Add an interest"
          plusSymbol={true}
          classNames="Action-button__slim"
        />
      </div>
    </div>
  );
}

export default EmptyInterestsSection;
