import React from "react";
import ContentTag from "../Content-tag";
import GenericUserIcon from "../profile-icon/Generic-User-Icon";
import ExternalLinkIcon from "../../images/link-icons/external-link.svg";
import "./course-card-style.css";

interface ICourseCardProps {
  courseTitle: string;
  url: string;
  userName: string;
  description: string;
  tags: Array<string>;
  category?: string;
}
function CourseCard(props: ICourseCardProps) {
  return (
    <div className="Course-card__main">
      <div className="Course-card__category-header">
        {props.category || "not categorized"}
      </div>
      <div className="Course-card__inner-body">
        <div className="Course-card__course-title">
          {props.courseTitle}
          <img
            className="external-link-icon"
            src={ExternalLinkIcon}
            alt="external link"
          />
        </div>

        <div className="Course-card__recommendation-section">
          <GenericUserIcon userName={props.userName} />
          <div className="Recommended-by">Recommended by {props.userName}</div>
        </div>
        <div className="Course-card__synopsis-section">{props.description}</div>
        <div className="Course-card__tags-section">
          <ContentTag title="first tag" />
          <ContentTag title="second tag" />
          <ContentTag title="third tag" />
          <ContentTag title="fourth tag" />
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
