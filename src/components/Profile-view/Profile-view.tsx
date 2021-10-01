import React, { useState, useEffect } from "react";

import {
  getCourseRecommendationsByUser,
  getUserById,
} from "../../services/users";
import ProfileIcon from "../profile-icon";
import "./profile-view-style.css";
import "../../pages/profile/profile-page-style.css";
import WindowCloseButton from "../../images/icons/x-close-window.svg";
import TagApplet from "../Tags-applet";
import { ICourse, IProcessedUser } from "../../types";
import { ModalType } from "../../types/modal.types";
import { UserCourseSummaryTable } from "./User-course-summary-list";
export interface IProfileViewProps {
  userId: string;
  closeButtonVisible: boolean;
  onModalClose?: (visible: boolean) => void;
}

function ProfileView(props: IProfileViewProps) {
  const [userData, setUserData] = useState<IProcessedUser | undefined>(
    undefined
  );
  const [courseRecommendations, setCourseRecommendations] = useState<ICourse[]>(
    []
  );
  const [hasProfileFetchError, setHasProfileFetchError] =
    useState<boolean>(false);
  const [profileFetchErrorMessage, setProfileFetchErrorMessage] =
    useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.nullModal);
  useEffect(() => {
    const getUser = async () => {
      try {
        if (props.userId && props.userId !== "") {
          const user = await getUserById(props.userId);
          setUserData(user);
        }
      } catch (exception) {
        setHasProfileFetchError(true);
        setProfileFetchErrorMessage(
          "There was an error fetching data. Try to log in or check your connection"
        );
      }
    };
    const getCourseRecommendations = async () => {
      try {
        if (props.userId && props.userId !== "") {
          const fetchedRecommendations = await getCourseRecommendationsByUser({
            id: props.userId,
          });
          console.log("Fetched recommendations", fetchedRecommendations);
          setCourseRecommendations(fetchedRecommendations);
        }
      } catch (exception) {
        // POIJ handle some exception
      }
    };
    getUser();
    getCourseRecommendations();
  }, []);

  const handleFullSummaryShowModal = () => {
    setModalType(ModalType.FullUserCourseSummaryList);
    setModalVisible(true);
  };

  const handleShowCourseDetail = (courseId: string) => {
    console.log("Course detail modal", courseId);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalType(ModalType.nullModal);
  };
  return (
    <div className="Profile-view__Main__Window">
      <div className="Profile-view__Main__container window-padding-1p">
        {hasProfileFetchError && (
          <div className="Detailed-Course-View__windowClose__fetch-error-text error-text">
            {profileFetchErrorMessage}
          </div>
        )}
        {props.closeButtonVisible && (
          <div className="Modal-close-header">
            <img
              onClick={() => props.onModalClose && props.onModalClose(false)}
              className="Detailed-Course-View__windowClose cursor-pointer"
              alt="close window"
              src={WindowCloseButton}
            />
          </div>
        )}
        <div className="Profile-view__Body">
          <div className="Profile-view__Main-header">
            <div className="Profile-view__Profile-Icon__enclosure">
              <ProfileIcon
                showProfileMenuHandler={() => {}}
                genericUser={false}
                imageSrc={userData && userData.avatar && userData.avatar[0].url}
                classNames="large round"
              />
            </div>
            <div className="Profile-view__Profile-Name__enclosure">
              <div className="Profile-view__Profile-Name__text mont-font large-monteserrat-bold-font title-text-vertically-centered">
                {userData
                  ? `${userData.firstName || ""} ${userData.lastName || ""}`
                  : ""}
              </div>
            </div>
          </div>
          <div className="Profile-page__Center-body">
            <table id="table-profile-data" className="profile-table table-font">
              <thead>
                <tr>
                  <td className="Main-table-header-profile bottom-border cell-padding label-category-width">
                    Profile
                  </td>
                  <td className="bottom-border empty"></td>
                  <td className="bottom-border empty"></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="Table__job-title-label cell-padding bottom-border label-category-width font-category-title">
                    JOB TITLE
                  </td>
                  <td className="bottom-border font-plain-text-cell-data">
                    {userData && userData.jobTitle}
                  </td>
                  <td className="bottom-border edit-text-icon-spacing"></td>
                </tr>
                <tr
                  className="Department-row"
                  onClick={() => console.log("clicked department row")}
                >
                  <td className="cell-padding label-category-width font-category-title">
                    DEPARTMENT
                  </td>
                  <td className="font-plain-text-cell-data">
                    {userData && userData.department}
                  </td>
                  <td className="empty"></td>
                </tr>
              </tbody>
            </table>
            <div className="Profile_view__interests-footer">
              <div className="bottom-border cell-padding open-sans-font-family font-size-25px">
                Interests
              </div>
              <TagApplet
                readOnly={true}
                tags={userData && userData.interestTags}
              />
            </div>
            <div className="Profile_view__my-recommendations-footer">
              <div className="bottom-border cell-padding open-sans-font-family font-size-25px">
                My Recommendations
              </div>
              <UserCourseSummaryTable
                courseRecommendations={courseRecommendations}
                size={
                  courseRecommendations.length > 3
                    ? 3
                    : courseRecommendations.length
                }
              />
              {courseRecommendations && courseRecommendations.length >= 3 && (
                <div
                  className="Profile_view-ShowMoreRecommendations main-font align-text-center pointer"
                  onClick={handleFullSummaryShowModal}
                >
                  Plus {courseRecommendations.length - 3} more
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalVisible && modalType === ModalType.FullUserCourseSummaryList && (
        <div className="Page-Modal">
          <div className="CourseSummaryListModal__main">
            <div className="CourseSummaryListModal__close-button flex-control-box-right">
              <img
                className="pointer"
                src={WindowCloseButton}
                alt="close"
                onClick={handleCloseModal}
              />
            </div>
            <div className="CourseSummaryListModal__header main-font center-text">
              {`Courses recommended by ${userData?.firstName} ${userData?.lastName}`}
            </div>
            <UserCourseSummaryTable
              courseRecommendations={courseRecommendations}
              allowScrolling={courseRecommendations.length > 3}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
