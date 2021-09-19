import React from "react";
import CourseBulletIcon from "./course-bullet.svg";
import ExternalLinkIcon from "../../images/link-icons/external-link.svg";
import "./profile-view-style.css";
import {
  CourseCategory,
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
  ICourse,
} from "../../types";

const RecommendationSummaryStrip = ({
  title,
  url,
  category,
  color,
}: {
  title: string;
  url: string;
  category: CourseCategory;
  color: number;
}) => {
  return (
    <div
      className={`RecommendationSummaryStrip__main full-padding-5px ${
        color !== 1 ? "pale-blue" : ""
      }`}
    >
      <div className="RecommendationSummaryStrip__title-link main-font">
        <img
          className="padding-right-5px"
          src={CourseBulletIcon}
          alt="course-bullet"
        />
        <a
          className="no-text-decoration"
          target="_blank"
          href={url}
          rel="noreferrer"
        >
          {title}
        </a>
        <img
          className="padding-left-5px padding-right-5px"
          src={ExternalLinkIcon}
          alt="External link to course"
        />
      </div>
      <div className="RecommendationSummaryStrip__link-to-course-details">
        <p>Details</p>
      </div>
      <div className="RecommendationSummaryStrip__category main-font">
        {COURSE_CATEGORY_FRIENDLY_DICTIONARY[category]}
      </div>
    </div>
  );
};

export const UserCourseSummaryList = ({
  courseRecommendations,
}: {
  courseRecommendations: ICourse[];
}) => {
  return (
    <div className="Profile_view_top-three-course-recommendations-list__container">
      {courseRecommendations && courseRecommendations.length >= 3
        ? courseRecommendations
            .slice(0, 3)
            .map((rec, index) => (
              <RecommendationSummaryStrip
                title={rec.title}
                url={rec.url}
                category={rec.category as CourseCategory}
                color={index % 2}
              />
            ))
        : courseRecommendations.map((rec, index) => (
            <RecommendationSummaryStrip
              title={rec.title}
              url={rec.url}
              category={rec.category as CourseCategory}
              color={index % 2}
            />
          ))}
      {courseRecommendations && courseRecommendations.length >= 3 && (
        <div className="Profile_view-ShowMoreRecommendations main-font align-text-center pointer">
          Plus {courseRecommendations.length - 3} more
        </div>
      )}
    </div>
  );
};
