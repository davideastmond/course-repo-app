import React from "react";
import ContentTag from "../Content-tag";
import "./interests-list-style.css";
interface IInterestsListProps {
  interestTags: string[];
}

function InterestsList(props: IInterestsListProps) {
  const tagCloseButtonClickHandler = () => {
    console.log("Not implemented yet");
  };
  return (
    <div className="Interests-list__Main-Container">
      {props.interestTags &&
        props.interestTags.length > 0 &&
        props.interestTags.map((interest, index) => (
          <ContentTag
            title={interest}
            hasCloseButton={true}
            closeButtonClicked={tagCloseButtonClickHandler}
            key={index}
          />
        ))}
    </div>
  );
}

export default InterestsList;
