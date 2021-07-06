import React from "react";
import CourseCard from "../course-card";
import "./course-container-style.css";

const dummyDescriptionText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.";
interface ICourseContainerProps {
  classNames?: string;
}
function CourseContainer(props: ICourseContainerProps) {
  return (
    <div className={`${props.classNames || ""} Course-Container`}>
      <CourseCard
        courseTitle="Test Title"
        url="http://nbc.com"
        userName="Guest"
        description={dummyDescriptionText}
        tags={["one", "two"]}
        category="Engineering"
      />
    </div>
  );
}

export default CourseContainer;
