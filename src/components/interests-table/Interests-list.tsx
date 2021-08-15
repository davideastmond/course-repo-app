import React from "react";
import ContentTag from "../Content-tag";
import "./interests-list-style.css";
interface IInterestsListProps {
  interestTags: string[];
  deleteInterestHandler: (interestTitle: string) => void;
}

function InterestsList(props: IInterestsListProps) {
  return (
    <div className="Interests-list__Main-Container">
      {props.interestTags &&
        props.interestTags.length > 0 &&
        props.interestTags.map((interest, index) => (
          <ContentTag
            title={interest}
            hasCloseButton={true}
            closeButtonClicked={props.deleteInterestHandler}
            key={`${index}_${interest}`}
          />
        ))}
    </div>
  );
}

export default InterestsList;
