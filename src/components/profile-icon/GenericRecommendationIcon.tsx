import React from "react";
import GenericUserIcon from "./Generic-User-Icon";
import "./profile-icon-style.css";
interface IGenericUserRecommendationIconProps {
  userName: string;
  isRecommendation: boolean;
  userId: string;
  onIconClicked: ({ userId }: { userId: string }) => void;
  iconClassNames?: string;
  recommendedTextClassNames?: string;
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
      <GenericUserIcon
        userName={props.userName}
        classNames={`${props.iconClassNames || ""}`}
      />
      {props.isRecommendation && (
        <div
          className={`Recommended-by ${props.recommendedTextClassNames || ""}`}
        >
          Recommended by {props.userName}
        </div>
      )}
    </div>
  );
}
