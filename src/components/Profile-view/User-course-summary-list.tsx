import CourseBulletIcon from "./course-bullet.svg";
import ExternalLinkIcon from "../../images/link-icons/external-link.svg";
import "./profile-view-style.css";
import {
  CourseCategory,
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
  ICourse,
  IDetailedCourse,
} from "../../types";
import { useState } from "react";
import { ModalType } from "../../types/modal.types";
import DetailedCourseViewModal from "../detailed-course-view-modal";
import { getDetailedCourseById } from "../../services/courses";

const CourseRow = ({
  idx,
  course,
  handleOpenDetails,
}: {
  idx: number;
  course: ICourse;
  handleOpenDetails?: (courseId: string) => void;
}) => {
  return (
    <tr
      key={`Short-table_${idx}_${course.createdAt}`}
      className={`main-font CourseTableRow`}
    >
      <td className="">
        <img src={CourseBulletIcon} alt="Course Icon" />
        <a
          target="_blank"
          rel="noreferrer"
          href={course.url}
          className="responsive-link-text no-text-decoration"
        >
          {course.title}
          <img
            className="padding-left-5px"
            src={ExternalLinkIcon}
            alt="Course Icon"
          />
        </a>
      </td>
      <td onClick={() => handleOpenDetails && handleOpenDetails(course._id)}>
        Details
      </td>
      <td>
        {COURSE_CATEGORY_FRIENDLY_DICTIONARY[course.category as CourseCategory]}
      </td>
    </tr>
  );
};

export const UserCourseSummaryTable = ({
  courseRecommendations,
  size,
  allowScrolling,
}: {
  allowScrolling?: boolean;
  courseRecommendations: ICourse[];
  size?: number;
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.nullModal);
  const [courseContextData, setCourseContextData] = useState<
    IDetailedCourse | undefined | null
  >(undefined);

  const handleOpenDetailedCourseViewModal = (courseId: string) => {
    async function getCourseContext() {
      try {
        const courseContext = await getDetailedCourseById(courseId);
        setCourseContextData(courseContext);
        setModalType(ModalType.DetailedCourseView);
        setModalVisible(true);
      } catch (exception) {
        console.log("Unable to get course data");
      }
    }
    getCourseContext();
  };

  const handleDetailedCourseModalClose = () => {
    setModalVisible(false);
    setModalType(ModalType.nullModal);
    setCourseContextData(null);
  };
  return (
    <div
      className={`Profile_view_top-three-course-recommendations-list__container ${
        allowScrolling ? "scroll-limit" : ""
      }`}
    >
      <table className="Profile_view-CoursesTable">
        {courseRecommendations && size && courseRecommendations.length >= size
          ? courseRecommendations
              .slice(0, 3)
              .map((rec, index) => (
                <CourseRow
                  idx={index}
                  course={rec}
                  handleOpenDetails={handleOpenDetailedCourseViewModal}
                />
              ))
          : courseRecommendations.map((rec, index) => (
              <CourseRow
                idx={index}
                course={rec}
                handleOpenDetails={handleOpenDetailedCourseViewModal}
              />
            ))}
      </table>
      {modalVisible && modalType === ModalType.DetailedCourseView && (
        <div className="Page-Modal">
          <div className="Profile_view__DetailedCourseView__modal-body">
            {courseContextData && (
              <DetailedCourseViewModal
                courseContext={courseContextData}
                onModalClose={handleDetailedCourseModalClose}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
