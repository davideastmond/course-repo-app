import React, { useRef, useState } from "react";
import StylizedTextInput from "../../stylized-text-input";
import TrashIcon from "../../../images/icons/trash.svg";
import "./key-take-away-style.css";
import AddPlusButtonIcon from "../../../images/icons/add-plus-arrow-black.svg";
const MIN_TAKE_AWAY_STRIPS: number = 1;
const MAX_TAKE_AWAY_STRIPS: number = 3;

interface ITakeAwayStripRowProps {
  id: string;
  index: number;
  onStripTextDataChanged: (textForIndex: any[]) => void;
}
const TakeAwayStripRow = (props: ITakeAwayStripRowProps) => {
  const handleStripTextDataChanged = (e: any) => {
    props.onStripTextDataChanged([props.index, e.target.value]);
  };
  return (
    <div className="TakeAwayStripRow__Main strip-row-responsive-width">
      <div className="Row-dot">•</div>
      <StylizedTextInput
        id={props.id}
        onTextChange={handleStripTextDataChanged}
      />
    </div>
  );
};

interface IKeyTakeAwayAppletProps {
  onStripDataPackageChange: (stripDataPackage: {}) => void;
  index: number;
}
function KeyTakeAwayApplet(props: IKeyTakeAwayAppletProps) {
  const takeAwayStripRef = useRef({});

  const takeAwayStripDataHandler = (data: any[]) => {
    takeAwayStripRef.current = {
      ...takeAwayStripRef.current,
      [`${data[0]}`]: data[1],
    };

    props.onStripDataPackageChange({
      ...takeAwayStripRef.current,
    });
  };

  const [takeAwayStrips, setTakeAwayStrips] = useState<any[]>([
    <TakeAwayStripRow
      key={`takeAwayStripRow0`}
      id={`takeAwayStripRow0`}
      index={0}
      onStripTextDataChanged={takeAwayStripDataHandler}
    />,
  ]);
  const handleDeleteTakeAwayStrip = () => {
    if (takeAwayStrips && takeAwayStrips.length > MIN_TAKE_AWAY_STRIPS) {
      setTakeAwayStrips(takeAwayStrips.slice(0, -1));
    }
  };
  const handleAddTakeAwayStrip = () => {
    if (takeAwayStrips && takeAwayStrips.length < MAX_TAKE_AWAY_STRIPS) {
      setTakeAwayStrips([
        ...takeAwayStrips,
        <TakeAwayStripRow
          key={`takeAwayStripRow${takeAwayStrips.length}`}
          id={`takeAwayStripRow${takeAwayStrips.length}`}
          index={takeAwayStrips.length}
          onStripTextDataChanged={takeAwayStripDataHandler}
        />,
      ]);
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
