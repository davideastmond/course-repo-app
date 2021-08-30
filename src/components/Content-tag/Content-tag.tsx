import React from "react";
import "./content-tag-style.css";
import XCloseDeleteIcon from "../../images/icons/x-close-button.svg";
interface IContentTagProps {
  title: string;
  link?: string;
  hasCloseButton?: boolean;
  closeButtonClicked?: (titleString: string) => void;
  key: string;
}

const ContentTagWithCloseButton = ({
  closeButtonClickHandler,
  title,
  key,
}: {
  closeButtonClickHandler: (titleString: string) => void;
  title: string;
  key: string;
}) => {
  return (
    <div className="Content-tag__main with-close-button">
      {title}
      <div
        className="Content-tag__main__Close-x-button"
        onClick={() => closeButtonClickHandler(title)}
        key={key}
      >
        <img src={XCloseDeleteIcon} alt={`delete ${title}`} />
      </div>
    </div>
  );
};

const noOp = () => {
  console.log("closeButtonClicked isn't defined. This is a placeholder");
};

function ContentTag(props: IContentTagProps) {
  return props.hasCloseButton === true ? (
    ContentTagWithCloseButton({
      closeButtonClickHandler: props.closeButtonClicked || noOp,
      title: props.title,
      key: props.key,
    })
  ) : (
    <div className="Content-tag__main">{props.title}</div>
  );
}

export default ContentTag;
