import React from "react";
import { ICourse } from "../../types";
import CourseCard from "../course-card";
import "./course-container-style.css";

interface ICourseContainerProps {
  classNames?: string;
  courses: ICourse[];
}

function CourseContainer(props: ICourseContainerProps) {
  return (
    <div className={`${props.classNames || ""} Course-Container`}>
      {props.courses &&
        props.courses.length > 0 &&
        props.courses.map((course, index) => (
          <CourseCard {...{ ...course }} key={course._id} />
        ))}
      {props.courses.length === 0 && (
        <div className="Courses-Empty-list">Nothing to display</div>
      )}
    </div>
  );
}

export default CourseContainer;
