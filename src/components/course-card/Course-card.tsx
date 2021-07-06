import React from "react";
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
      <div className="Course-card__course-title">{props.courseTitle}</div>
      <div className="Course-card__recommendation-section"></div>
      <div className="Course-card__synopsis-section">{props.description}</div>
      <div className="Course-card__tags-section"></div>
    </div>
  );
}

export default CourseCard;
