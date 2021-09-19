/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import ContentTag from "../Content-tag";
import ExternalLinkIcon from "../../images/link-icons/external-link.svg";
import "./course-card-style.css";
import {
  CourseCategory,
  COURSE_CATEGORY_COLOR,
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
  ICourse,
} from "../../types";
import { getUserById } from "../../services/users";
import GenericUserRecommendationIcon from "../profile-icon/GenericRecommendationIcon";
import dayjs from "dayjs";

interface ICourseCardProps {
  color?: string | CourseCategory;
  course: ICourse;
  courseCardClickHandler: (id: string) => void;
  genericUserProfileClickHandler: (id: string) => void;
}

function CourseCard(props: ICourseCardProps) {
  const [userName, setUserNames] = useState<any>({});
  useEffect(() => {
    const getUsers = async () => {
      const user = await getUserById(props.course.postedByUserId);
      setUserNames({ [`${user._id}`]: `${user.firstName} ${user.lastName}` });
    };
    getUsers();
  }, []);

  const handleCourseCardClick = () => {
    if (props.courseCardClickHandler) {
      props.courseCardClickHandler(props.course._id);
    }
  };

  const handleGenericUserProfileIconClick = () => {
    if (userName && userName[props.course.postedByUserId]) {
      props.genericUserProfileClickHandler(props.course.postedByUserId);
    }
  };

  return (
    <div className="Course-card__main">
      <div
        className={`Course-card__category-header ${
          COURSE_CATEGORY_COLOR[props.course.category as CourseCategory]
        } ${props.color || ""}`}
      >
        {COURSE_CATEGORY_FRIENDLY_DICTIONARY[
          props.course.category as CourseCategory
        ] || "not categorized"}
      </div>
      <div className="Course-card__inner-body">
        <div className="Course-Card__title-link_enclosure">
          <div
            className="Course-card__course-title"
            onClick={handleCourseCardClick}
          >
            {props.course.title || "Untitled course"}
          </div>
          <div className="link-icon-enclosure">
            <a
              className="Course-card__external-link"
              target="_blank"
              href={props.course.url || "no url"}
            >
              <img
                className="external-link-icon"
                src={ExternalLinkIcon}
                alt="external link"
              />
            </a>
          </div>
        </div>
        <div className="Course-card-date-header__enclosure">
          <div className="Course-card-date__text open-sans-font-family color-light-grey">
            Posted {dayjs(props.course.createdAt).format("MMM DD YYYY HH:mm")}
          </div>
        </div>
        <div className="Course-card__recommendation-section">
          <GenericUserRecommendationIcon
            onIconClicked={handleGenericUserProfileIconClick}
            userId={props.course.postedByUserId}
            isRecommendation={true}
            userName={userName[props.course.postedByUserId] || "a colleague"}
          />
        </div>
        <div className="Course-card__synopsis-section">
          {props.course.description}
        </div>
        <div className="Course-card__tags-section">
          {props.course.tags &&
            props.course.tags.length > 0 &&
            props.course.tags.map((tag, index) => (
              <ContentTag title={tag} key={`${index}_${tag}`} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
