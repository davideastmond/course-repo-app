import React from "react";

interface ICourseContainerProps {
  classNames?: string;
}
function CourseContainer(props: ICourseContainerProps) {
  return <div className={`${props.classNames || ""}`}></div>;
}

export default CourseContainer;
