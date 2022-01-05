import "./social-media-module-style.css";
import HeartFill from "./heart-fill.svg";
import HeartEmpty from "./heart-empty.svg";
import FollowEmpty from "./follow-empty.svg";
import FollowFill from "./follow-fill.svg";
import { SocialMediaModuleType } from "./types";

interface ISocialMediaModuleProps {
  classNames?: string;
  textClassNames?: string;
  containerClassNames?: string;
  checked: boolean;
  likesCount?: number;
  forCourseId?: string;
  forUserId?: string;
  onClicked?: (id: string) => void;
  moduleType: SocialMediaModuleType;
  caption?: string;
}

const SocialMediaIconContainer = ({
  iconType,
  checked,
  ContainerClassNames,
}: {
  iconType: SocialMediaModuleType;
  checked: boolean;
  ContainerClassNames?: string;
}) => {
  return iconType === SocialMediaModuleType.Like ? (
    <img
      className={`HeartContainerImage_main small-heart-icon ${
        ContainerClassNames || ""
      }`}
      src={checked ? HeartFill : HeartEmpty}
      alt={`${checked ? "Unlike this" : "Like this"}`}
    />
  ) : (
    <img
      className={`FollowContainerImage_main small-follow-icon ${
        ContainerClassNames || ""
      }`}
      src={checked ? FollowFill : FollowEmpty}
      alt={`${checked ? "Un-follow this user" : "Follow this user"}`}
    />
  );
};

const getLikesCountText = ({ likesCount }: { likesCount: number }): string => {
  if (likesCount === 1) {
    return "1";
  } else if (likesCount > 1) {
    return `${likesCount}`;
  }
  return "";
};

function SocialMediaModule(props: ISocialMediaModuleProps) {
  const handleHeartClicked = () => {
    if (props.moduleType === SocialMediaModuleType.Like) {
      props.onClicked &&
        props.forCourseId &&
        props.onClicked(props.forCourseId);
    } else {
      props.onClicked && props.forUserId && props.onClicked(props.forUserId);
    }
  };

  return props.moduleType === SocialMediaModuleType.Like ? (
    <div
      className={`LikesModuleMain_main ${
        props.classNames ? props.classNames : ""
      }`}
    >
      <div className="LikesModuleMain__innerBody flex-container">
        <div className="container_body" onClick={handleHeartClicked}>
          {SocialMediaIconContainer({
            checked: props.checked,
            ContainerClassNames: props.containerClassNames,
            iconType: props.moduleType,
          })}
        </div>
        <div className="LikesModuleMain_likes-text likes-text-spacing color-light-grey">
          {getLikesCountText({ likesCount: props.likesCount! })}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`FollowsModuleMain_main ${
        props.classNames ? props.classNames : ""
      }`}
    >
      <div className="FollowsModuleMain__innerBody flex-container">
        <div className="container_body" onClick={handleHeartClicked}>
          {SocialMediaIconContainer({
            checked: props.checked,
            ContainerClassNames: props.containerClassNames,
            iconType: props.moduleType,
          })}
        </div>
        {props.checked && props.caption && (
          <div className="FollowsModuleMain__caption-text">{props.caption}</div>
        )}
      </div>
    </div>
  );
}

export default SocialMediaModule;
