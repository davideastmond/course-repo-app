import React, { useState } from "react";
import "./suggest-course-style.css";
import WindowCloseButton from "../../images/icons/x-close-window.svg";
import StylizedTextInput from "../stylized-text-input";
import UrlChainLinkIcon from "../../images/link-icons/url-chain-link.svg";
import StarRating from "../star-rating-applet";
import CourseTakeAway from "../CourseTakeAway";
function SuggestCourseModal() {
  const [takeAways, setTakeAways] = useState<any[]>([]);
  const [courseRating, setCourseRating] = useState<number>(0);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [courseURL, setCourseURL] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");

  const addTakeAway = () => {
    if (takeAways && takeAways.length < 3) {
      setTakeAways([
        ...takeAways,
        <CourseTakeAway
          key={`takeAwayElement${takeAways.length + 1}`}
          id={`takeAwayElement${takeAways.length + 1}`}
        />,
      ]);
    }
  };
  console.log(
    "takeAways",
    courseRating,
    courseTitle,
    courseURL,
    courseDescription
  );
  return (
    <div className="Suggest-course__Main-body">
      <div className="Suggest-course__margin-body">
        <div className="Suggest-course__Main-header-top-enclosure">
          <img
            className="Suggest-course__windowClose"
            alt="close window"
            src={WindowCloseButton}
          />
        </div>
        <div className="Suggest-course__Window-title-Enclosure">
          <div className="Suggest-course__Window-title-Text suggest-course-left-margin">
            Suggest a course
          </div>
        </div>
        <section className="Suggest-course__Main-about-section">
          <header className="Suggest-course__Main-about-section__header-section">
            <div className="Suggest-course__Main-about-section__header-section-text suggest-course-left-margin">
              What is this course about?
            </div>
          </header>
          <div className="line-separator"></div>
          <div className="Course-data__Main-enclosure">
            <div className="Course-data__section__title__URL">
              <StylizedTextInput
                label="Course Title"
                id="courseTitle"
                inputBoxClassNames="suggest-course-box-width single-height-input-box-50px left-padding-single-input"
                onTextChange={(e: any) => setCourseTitle(e.target.value)}
              />
              <StylizedTextInput
                classNames="right-column-text-margin-left"
                label="Course URL"
                id="courseURL"
                specialLabelIcon={UrlChainLinkIcon}
                inputBoxClassNames="single-height-input-box-50px left-padding-single-input"
                onTextChange={(e: any) => setCourseURL(e.target.value)}
              />
            </div>
            <div className="Course-data__section__description__rating left-column-text-margin-left">
              <StylizedTextInput
                multiLine={true}
                label="Description(Optional)"
                id="description"
                inputBoxClassNames="suggest-course-box-width double-height-input-box-130px top-left-padding"
                onTextChange={(e: any) => setCourseDescription(e.target.value)}
              />
              <StarRating
                editable={true}
                headerText="Your rating(Optional)"
                classNames="Star-rating-margin-left-spacing"
                onRatingChanged={(e: number) => setCourseRating(e)}
              />
            </div>
          </div>
        </section>
        <section className="Suggest-course__LearningSection top-margin-buffer">
          <header className="Suggest-course__LearningSection__header-section">
            <div className="Suggest-course__LearningSection__header-section-text Suggest-course__Main-about-section__header-section-text suggest-course-left-margin">
              What did you learn?
            </div>
          </header>
          <div className="line-separator"></div>
          <div className="Course-Take-away-Container">
            {takeAways &&
              takeAways.length > 0 &&
              takeAways.map((takeAway) => takeAway)}
          </div>
          <footer className="Add-take-away-footer">
            <div
              className="Add-take-away-text mont-font bold pointer"
              onClick={addTakeAway}
            >
              + Add another takeaway
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default SuggestCourseModal;
