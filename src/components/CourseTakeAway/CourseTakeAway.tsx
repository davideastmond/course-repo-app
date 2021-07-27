import React from "react";
import StylizedTextInput from "../stylized-text-input";
import "./course-take-away-style.css";
import KeyTakeAwayApplet from "./key-take-away";

interface ICourseTakeAwayProps {
  id: string;
  index?: number;
}
function CourseTakeAway(props: ICourseTakeAwayProps) {
  return (
    <>
      <div className="CourseTakeAway__Main-body">
        <div className="CourseTakeAway__left-col">
          <StylizedTextInput
            id={props.id}
            label={"What I learned:"}
            maxLength={280}
            charCount={true}
            multiLine={true}
          />
        </div>
        <div className="CourseTakeAway__right-col">
          <KeyTakeAwayApplet />
        </div>
      </div>
      <div className="line-separator"></div>
    </>
  );
}

export default CourseTakeAway;
