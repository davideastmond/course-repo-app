import React from "react";
import {
  ICourseRecommendationTakeAwayPackage,
  IDetailedCourse,
} from "../../types";
import "./detailed-course-view.css";
import WindowCloseButton from "../../images/icons/x-close-window.svg";
interface IDetailedCourseViewProps {
  courseContext: IDetailedCourse;
  onModalClose: (visible: boolean) => void;
}

const courseNotes = (notes: ICourseRecommendationTakeAwayPackage) => {};

function DetailedCourseViewModal(props: IDetailedCourseViewProps) {
  const handleCloseModal = () => {
    props.onModalClose(false);
  };
  console.log(props.courseContext.notes);
  return (
    <div className="Detailed-Course-View__Main-body">
      <header className="Detailed-Course-View__header pale-lime-green">
        <div className="Detailed-Course-View__header-text mont-font">
          {props.courseContext.title || "unknown title"}
        </div>
        <img
          onClick={handleCloseModal}
          className="Detailed-Course-View__windowClose"
          alt="close window"
          src={WindowCloseButton}
        />
      </header>
      <section className="Detailed-Course-View__section__about">
        <div className="Detailed-Course-View__section__about__body open-sans-font-family">
          <div className="Detailed-Course-View__section__header">
            WHAT IS THIS COURSE ABOUT?
          </div>
          <div className="Detailed-Course-View__about__blurb">
            {props.courseContext.description || "no description"}
          </div>
        </div>
      </section>
      <section className="Detailed-Course-View__section__learning-blurb">
        <div className="Detailed-Course-View__section__about__learning-blurb_body open-sans-font-family">
          <div className="Detailed-Course-View__section__header">
            WHAT DID YOU LEARN?
          </div>
          <div className="Detailed-Course-View__section__notes">hi</div>
        </div>
      </section>
    </div>
  );
}

export default DetailedCourseViewModal;
