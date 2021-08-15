import React from "react";
import GenericUserIcon from "./Generic-User-Icon";
import "./profile-icon-style.css";
interface IGenericUserRecommendationIconProps {
  userName: string;
  isRecommendation: boolean;
  userId: string;
  onIconClicked: ({ userId }: { userId: string }) => void;
}
export default function GenericUserRecommendationIcon(
  props: IGenericUserRecommendationIconProps
) {
  const handleOnIconClicked = () => {
    props.onIconClicked({ userId: props.userId });
  };
  return (
    <div
      className="GenericUserRecommendation__Main"
      onClick={handleOnIconClicked}
    >
      <GenericUserIcon userName={props.userName} />
      {props.isRecommendation && (
        <div className="Recommended-by">Recommended by {props.userName}</div>
      )}
    </div>
  );
}
