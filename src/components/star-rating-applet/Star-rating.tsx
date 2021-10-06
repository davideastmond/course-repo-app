import React, { useState } from "react";
import "./star-rating-style.css";
import StarIconImg from "../../images/icons/star.svg";
import StarIconFilled from "../../images/icons/star-fill.svg";
interface IStarRatingProps {
  classNames?: string;
  headerText?: string;
  editable: boolean;
  onRatingChanged: (rating: number) => void;
}
function StarRating(props: IStarRatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(-1);
  const handleCurrentRatingChange = (idx: number) => {
    setCurrentRating(idx);
    props.onRatingChanged(idx);
  };

  return (
    <div className={`StarRating__Main ${props.classNames || ""}`}>
      <div className="StarRating__Title__enclosure">
        <div className="StarRating__Title__text open-sans-font-family">
          {props.headerText}
        </div>
      </div>
      <div className="StarRating__body__enclosure">
        <div className="StarRating__stars__enclosure">
          {/* Stars get rendered here */}
          <StarIcon
            index={0}
            setRating={handleCurrentRatingChange}
            filled={currentRating >= 0}
          />
          <StarIcon
            index={1}
            setRating={handleCurrentRatingChange}
            filled={currentRating >= 1}
          />
          <StarIcon
            index={2}
            setRating={handleCurrentRatingChange}
            filled={currentRating >= 2}
          />
          <StarIcon
            index={3}
            setRating={handleCurrentRatingChange}
            filled={currentRating >= 3}
          />
          <StarIcon
            index={4}
            setRating={handleCurrentRatingChange}
            filled={currentRating >= 4}
          />
        </div>
      </div>
    </div>
  );
}

function StarIcon({
  filled,
  index,
  setRating,
}: {
  filled?: boolean;
  index: number;
  setRating: (idx: number) => void;
}) {
  const [idx, _] = useState<number>(index);
  return (
    <div className="Star-div" onClick={() => setRating(idx)}>
      {filled && filled === true ? (
        <img src={StarIconFilled} alt="rating" className="star-tag" />
      ) : (
        <img src={StarIconImg} alt="rating" className="star-tag" />
      )}
    </div>
  );
}
export default StarRating;
