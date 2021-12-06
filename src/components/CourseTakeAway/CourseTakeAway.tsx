import React, { useEffect, useRef, useState } from "react";
import StylizedTextInput from "../stylized-text-input";
import "./course-take-away-style.css";
import KeyTakeAwayApplet from "./key-take-away";
import { v4 as uuidv4 } from "uuid";
interface ICourseTakeAwayProps {
  id: string;
  index?: number;
  value?: string;
  onUpdatePackage: (
    packageUpdate: {
      [key in number]: {
        noteId: string;
        learningBlurb: string;
        takeAways: { [_key in number]: string };
      };
    }
  ) => void;
}
function CourseTakeAway(props: ICourseTakeAwayProps) {
  const [learningBlurb, setLearningBlurb] = useState<string>(props.value || "");
  const [keyTakeAways, setKeyTakeAways] = useState<any>({});
  const packageChanged = (e: any) => {
    setKeyTakeAways(e);
  };
  const handleLearningBlurbTextChanged = (e: any) => {
    if (e.target.value) {
      setLearningBlurb(e.target.value);
    }
  };

  const noteId = useRef(uuidv4());

  useEffect(() => {
    props.onUpdatePackage({
      [`${props.index!}`]: {
        noteId: noteId.current,
        learningBlurb,
        takeAways: keyTakeAways,
      },
    });
  }, [learningBlurb, keyTakeAways]);

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
            onTextChange={handleLearningBlurbTextChanged}
            inputBoxClassNames="full-space"
            value={props.value ? props.value : ""}
          />
        </div>
        <div className="CourseTakeAway__right-col">
          <KeyTakeAwayApplet
            onStripDataPackageChange={packageChanged}
            index={props.index!}
          />
        </div>
      </div>
      <div className="line-separator"></div>
    </>
  );
}

export default CourseTakeAway;
