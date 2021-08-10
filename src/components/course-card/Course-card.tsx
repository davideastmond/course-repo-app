/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import ContentTag from "../Content-tag";
import GenericUserIcon from "../profile-icon/Generic-User-Icon";
import ExternalLinkIcon from "../../images/link-icons/external-link.svg";
import "./course-card-style.css";
import {
  CourseCategory,
  COURSE_CATEGORY_COLOR,
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
} from "../../types";
import { getUserById } from "../../services/users";

interface ICourseCardProps {
  _id: string;
  postedByUserId: string;
  title: string;
  url: string;
  userName?: string;
  reviews?: {
    [keyof: string]: string;
  };
  description: string;
  tags: Array<string>;
  category?: string;
  color?: string | CourseCategory;
  courseCardClickHandler: (id: string) => void;
}

function CourseCard(props: ICourseCardProps) {
  const [userName, setUserNames] = useState<any>({});
  useEffect(() => {
    const getUsers = async () => {
      const user = await getUserById(props.postedByUserId);
      setUserNames({ [`${user._id}`]: `${user.firstName} ${user.lastName}` });
    };
    getUsers();
  }, []);

  const handleCourseCardClick = () => {
    if (props.courseCardClickHandler) {
      props.courseCardClickHandler(props._id);
    }
  };
  return (
    <div className="Course-card__main" onClick={handleCourseCardClick}>
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
          <a
            className="Course-card__external-link"
            target="_blank"
            href={props.url || "no url"}
          >
            {props.title || "Untitled course"}
            <img
              className="external-link-icon"
              src={ExternalLinkIcon}
              alt="external link"
            />
          </a>
        </div>

        <div className="Course-card__recommendation-section">
          <GenericUserIcon
            userName={userName[props.postedByUserId] || "Guest"}
          />
          <div className="Recommended-by">
            Recommended by {userName[props.postedByUserId]}
          </div>
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
