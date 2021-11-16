import CourseBulletIcon from "./course-bullet.svg";
import ExternalLinkIcon from "../../images/link-icons/external-link.svg";
import "./profile-view-style.css";
import {
  CourseCategory,
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
  ICourse,
  IDetailedCourse,
} from "../../types";
import { useEffect, useState } from "react";
import { ModalType } from "../../types/modal.types";
import DetailedCourseViewModal from "../detailed-course-view-modal";
import {
  deleteCourseRecommendation,
  getDetailedCourseById,
} from "../../services/courses";
import EditRack from "../CourseSummaryListModal/EditRack";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllCoursesAsync, selectLimit, selectSkip } from "../../reducers";
import ToastPop from "../toast-pop";

const CourseRow = ({
  idx,
  course,
  handleOpenDetails,
  showCheckBox,
  onElementChecked,
  onElementUnchecked,
  isChecked,
}: {
  idx: number;
  course: ICourse;
  handleOpenDetails?: (courseId: string) => void;
  showCheckBox?: boolean;
  onElementChecked?: (id: string) => void;
  onElementUnchecked?: (id: string) => void;
  isChecked?: boolean;
}) => {
  const handleOnCheckboxChange = ({
    checked,
    id,
  }: {
    checked: boolean;
    id: string;
  }) => {
    if (checked === true) {
      if (onElementChecked) {
        onElementChecked(id);
      }
    } else {
      if (onElementUnchecked) {
        onElementUnchecked(id);
      }
    }
  };

  return (
    <tr
      key={`Short-table_${idx}_${course.createdAt}`}
      className={`main-font CourseTableRow`}
    >
      {showCheckBox && (
        <td className="form-check">
          <input
            type="checkbox"
            className="form-check"
            onChange={(e) =>
              handleOnCheckboxChange({
                checked: e.target.checked,
                id: course._id,
              })
            }
            checked={isChecked}
          ></input>
        </td>
      )}
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
      <td
        className="cursor-pointer"
        onClick={() => handleOpenDetails && handleOpenDetails(course._id)}
      >
        Details
      </td>
      <td>
        {COURSE_CATEGORY_FRIENDLY_DICTIONARY[course.category as CourseCategory]}
      </td>
    </tr>
  );
};

interface IUserCourseSummaryTableProps {
  sourceId: string;
  allowScrolling?: boolean;
  courseRecommendations: ICourse[];
  size?: number;
  canEdit: boolean;
  onCourseDataChanged?: (data: any) => void;
}

export const UserCourseSummaryTable = ({
  sourceId,
  allowScrolling,
  courseRecommendations,
  size,
  canEdit,
  onCourseDataChanged,
}: IUserCourseSummaryTableProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.nullModal);
  const [courseContextData, setCourseContextData] = useState<
    IDetailedCourse | undefined | null
  >(undefined);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [checkBoxes, setCheckBoxes] = useState<boolean[]>(
    courseRecommendations.map(() => false)
  );
  const [checkboxesVisible, setCheckboxesVisible] = useState<boolean>(false);
  const [showChangeStatus, setShowChangeStatus] = useState<boolean>(false);
  const [toastDivStyle, setToastDivStyle] = useState("");
  const [toastTextStyle, setToastTextStyle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastSticky, setToastSticky] = useState(false);

  const dispatch = useDispatch();
  const limit = useSelector(selectLimit, shallowEqual);
  const skip = useSelector(selectSkip, shallowEqual);

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

  const handleElementIsChecked = ({ idx, id }: { idx: number; id: string }) => {
    const courses = Array.from(selectedCourses);

    if (!courses.includes(id)) {
      courses.push(id);
    }
    const checkboxArray = [...checkBoxes];
    checkboxArray[idx] = true;
    setCheckBoxes(checkboxArray);
    setSelectedCourses(courses);
  };

  const handleElementIsUnChecked = ({
    idx,
    id,
  }: {
    idx: number;
    id: string;
  }) => {
    const courses = Array.from(selectedCourses);
    const filteredCourses = courses.filter((course) => course !== id);
    const checkboxArray = [...checkBoxes];
    checkboxArray[idx] = false;
    setCheckBoxes(checkboxArray);
    setSelectedCourses(filteredCourses);
  };

  const handleSelectAll = () => {
    const checkboxArray = [...checkBoxes];
    checkboxArray.forEach((_, index) => (checkboxArray[index] = true));
    const allCourses = courseRecommendations.map((course) => course._id);
    setSelectedCourses(allCourses);
    setCheckBoxes(checkboxArray);
  };

  const handleDeselectAll = () => {
    const checkboxArray = [...checkBoxes].map(() => false);
    setCheckBoxes(checkboxArray);
    setSelectedCourses([]);
  };

  const generateToast = () => {
    return;
  };

  const handleDeleteCourseRecommendation = () => {
    deleteCourseRecommendation({
      courseIds: selectedCourses,
      onFail: (errorMessage) => {
        console.log(errorMessage);
        setToastSticky(true);
        setShowChangeStatus(true);
        setToastDivStyle(
          "toast-red small-padding rounded-corners animated-stay"
        );
        setToastTextStyle("small-text");
        setToastMessage(`Error ${errorMessage}`);
      },
      onSuccess: (data) => {
        onCourseDataChanged && onCourseDataChanged(data);
        dispatch(getAllCoursesAsync({ limit, skip }));
        setShowChangeStatus(true);
        setToastTextStyle("small-text");
        setToastDivStyle(
          "toast-green small-padding rounded-corners animated-fade-out"
        );
        setToastMessage("Updated");
        setToastSticky(false);
      },
    });
  };

  useEffect(() => {
    console.debug("Current selected courses are", selectedCourses);
  }, [selectedCourses]);

  return (
    <>
      {canEdit === true && (
        <div>
          <EditRack
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onEditButtonClicked={() => setCheckboxesVisible(!checkboxesVisible)}
            actions={{ delete: handleDeleteCourseRecommendation }}
            labels={["Delete"]}
          />
        </div>
      )}

      <div
        className={`Profile_view_top-three-course-recommendations-list__container ${
          allowScrolling ? "scroll-limit" : ""
        }`}
      >
        {showChangeStatus && (
          <ToastPop
            text={toastMessage}
            textStyle={toastTextStyle}
            duration={1}
            backgroundStyle={toastDivStyle}
            onDisappear={() => setShowChangeStatus(false)}
            sticky={toastSticky}
          />
        )}
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
                  showCheckBox={checkboxesVisible}
                  onElementChecked={(id) =>
                    handleElementIsChecked({ idx: index, id })
                  }
                  onElementUnchecked={(id) =>
                    handleElementIsUnChecked({ idx: index, id })
                  }
                  isChecked={checkBoxes[index]}
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
    </>
  );
};
