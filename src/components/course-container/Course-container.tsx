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
    </div>
  );
}

export default CourseContainer;
