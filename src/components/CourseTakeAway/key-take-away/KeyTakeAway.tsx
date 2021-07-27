import React, { useState } from "react";
import StylizedTextInput from "../../stylized-text-input";
import TrashIcon from "../../../images/icons/trash.svg";
import "./key-take-away-style.css";
import AddPlusButtonIcon from "../../../images/icons/add-plus-arrow-black.svg";
const MIN_TAKE_AWAY_STRIPS: number = 1;
const MAX_TAKE_AWAY_STRIPS: number = 3;
const TakeAwayStripRow = () => {
  return (
    <div className="TakeAwayStripRow__Main">
      <div className="Row-dot">•</div>
      <StylizedTextInput id="" />
    </div>
  );
};

function KeyTakeAwayApplet() {
  const [takeAwayStrips, setTakeAwayStrips] = useState<any[]>([
    <TakeAwayStripRow key="1-root" />,
  ]);
  const handleDeleteTakeAwayStrip = () => {
    if (takeAwayStrips && takeAwayStrips.length > MIN_TAKE_AWAY_STRIPS) {
      setTakeAwayStrips(takeAwayStrips.slice(0, -1));
    }
  };
  const handleAddTakeAwayStrip = () => {
    if (takeAwayStrips && takeAwayStrips.length < MAX_TAKE_AWAY_STRIPS) {
      setTakeAwayStrips([...takeAwayStrips, <TakeAwayStripRow />]);
    }
  };
  return (
    <div className="KeyTakeAwayApplet__Main__body">
      <header className="KeyTakeAwayApplet__Header">
        <div className="KeyTakeAwayApplet__Header-text open-sans-font-family">
          Key takeaways
        </div>
      </header>
      <div className="TakeAwayStrips__Container">
        {takeAwayStrips && takeAwayStrips.map((strip) => strip)}
      </div>
      <div className="Course-Take-away-Container__Footer">
        <img
          src={AddPlusButtonIcon}
          alt="add key takeaway"
          onClick={handleAddTakeAwayStrip}
        />
        <img
          className="pointer"
          src={TrashIcon}
          alt="trash"
          onClick={handleDeleteTakeAwayStrip}
        />
      </div>
    </div>
  );
}

export default KeyTakeAwayApplet;
