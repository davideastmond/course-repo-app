import React from "react";
import ContentTag from "../Content-tag";
import GenericUserIcon from "../profile-icon/Generic-User-Icon";
import ExternalLinkIcon from "../../images/link-icons/external-link.svg";
import "./course-card-style.css";
import {
  CourseCategory,
  COURSE_CATEGORY_COLOR,
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
} from "../../types";

interface ICourseCardProps {
  _id: string;
  postedByUserId: string;
  courseTitle: string;
  courseUrl: string;
  userName?: string;
  reviews?: {
    [keyof: string]: string;
  };
  description: string;
  tags: Array<string>;
  category?: string;
  color?: string | CourseCategory;
}

function CourseCard(props: ICourseCardProps) {
  return (
    <div className="Course-card__main">
      <div
        className={`Course-card__category-header ${
          COURSE_CATEGORY_COLOR[props.category as CourseCategory]
        } ${props.color || ""}`}
      >
        {COURSE_CATEGORY_FRIENDLY_DICTIONARY[
          props.category as CourseCategory
        ] || "not categorized"}
      </div>
      <div className="Course-card__inner-body">
        <div className="Course-card__course-title">
          <a className="Course-card__external-link" href={props.courseUrl}>
            {props.courseTitle}
            <img
              className="external-link-icon"
              src={ExternalLinkIcon}
              alt="external link"
            />
          </a>
        </div>

        <div className="Course-card__recommendation-section">
          <GenericUserIcon userName={props.userName || "Guest"} />
          <div className="Recommended-by">Recommended by {props.userName}</div>
        </div>
        <div className="Course-card__synopsis-section">{props.description}</div>
        <div className="Course-card__tags-section">
          {props.tags &&
            props.tags.length > 0 &&
            props.tags.map((tag, index) => (
              <ContentTag title={tag} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
