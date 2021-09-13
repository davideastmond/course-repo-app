import React from "react";
import { ICourse, IProcessedUser } from "../../types";
import CourseCard from "../course-card";
import "./course-container-style.css";

interface IDataContainerProps {
  classNames?: string;
  courses?: ICourse[];
  users?: IProcessedUser[];
  courseCardClickHandler: (id: string) => void;
  genericUserProfileClickHandler: (id: string) => void;
}

function DataContainer(props: IDataContainerProps) {
  return (
    <div className={`${props.classNames || ""} Course-Container`}>
      {props.courses &&
        props.courses.length > 0 &&
        props.courses.map((course, index) => (
          <CourseCard
            {...{
              course,
              courseCardClickHandler: props.courseCardClickHandler,
              genericUserProfileClickHandler:
                props.genericUserProfileClickHandler,
            }}
            key={course._id}
          />
        ))}
      {props.courses && props.courses.length === 0 && (
        <div className="Courses-Empty-list">No courses to display</div>
      )}
      {props.users && props.users.length === 0 && (
        <div className="Courses-Empty-list">No users to display</div>
      )}
    </div>
  );
}

export default DataContainer;
