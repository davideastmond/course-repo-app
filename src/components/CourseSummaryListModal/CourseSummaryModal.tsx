import React from "react";
import { ICourse, IProcessedUser } from "../../types";
import { UserCourseSummaryTable } from "../Profile-view/User-course-summary-list";
import WindowCloseButton from "../../images/icons/x-close-window.svg";

interface ICourseSummaryListModalProps {
  handleCloseModal: () => void;
  userData: IProcessedUser | undefined;
  courseRecommendations: ICourse[];
  editable: boolean;
}

function CourseSummaryListModal(props: ICourseSummaryListModalProps) {
  return (
    <div className="CourseSummaryListModal__main CourseSummarListModal-margin">
      <div className="CourseSummaryListModal__close-button flex-control-box-right">
        <img
          className="pointer"
          src={WindowCloseButton}
          alt="close"
          onClick={props.handleCloseModal}
        />
      </div>
      <div className="CourseSummaryListModal__header main-font center-text">
        {`Courses recommended by ${props.userData?.firstName} ${props.userData?.lastName}`}
      </div>
      <UserCourseSummaryTable
        courseRecommendations={props.courseRecommendations}
        allowScrolling={props.courseRecommendations.length > 3}
        sourceId="Course Summary Modal CourseSummaryListModal__main"
        canEdit={props.editable}
      />
    </div>
  );
}

export default CourseSummaryListModal;
