import "./likes-module-style.css";
import HeartFill from "./heart-fill.svg";
import HeartEmpty from "./heart-empty.svg";

interface ILikesModuleProps {
  classNames?: string;
  textClassNames?: string;
  heartContainerClassNames?: string;
  checked: boolean;
  likesCount: number;
  forCourseId: string;
  onLikeButtonClicked?: (forCourseId: string) => void;
}

const HeartContainer = ({
  checked,
  heartContainerClassNames,
}: {
  checked: boolean;
  heartContainerClassNames?: string;
}) => {
  return (
    <img
      className={`HeartContainerImage_main small-heart-icon ${
        heartContainerClassNames || ""
      }`}
      src={checked ? HeartFill : HeartEmpty}
      alt="like"
    />
  );
};

const getLikesCountText = ({ likesCount }: { likesCount: number }): string => {
  if (likesCount === 1) {
    return "1 like";
  } else if (likesCount > 1) {
    return `${likesCount} likes`;
  }
  return "";
};

function LikesModule(props: ILikesModuleProps) {
  const handleHeartClicked = () => {
    props.onLikeButtonClicked && props.onLikeButtonClicked(props.forCourseId);
  };
  return (
    <div
      className={`LikesModuleMain_main ${
        props.classNames ? props.classNames : ""
      }`}
    >
      <div className="LikesModuleMain__innerBody flex-container">
        <div className="HeartContainer_body" onClick={handleHeartClicked}>
          {HeartContainer({
            checked: props.checked,
            heartContainerClassNames: props.heartContainerClassNames,
          })}
        </div>
        <div className="LikesModuleMain_likes-text color-light-grey">
          {getLikesCountText({ likesCount: props.likesCount })}
        </div>
      </div>
    </div>
  );
}

export default LikesModule;
