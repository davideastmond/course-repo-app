import React, { useState, useEffect } from "react";
import { ICourse, IDetailedCourse } from "../../types";
import "./detailed-course-view.css";
import WindowCloseButton from "../../images/icons/x-close-window.svg";
import TagApplet from "../Tags-applet";
import { getUserById } from "../../services/users";
import GenericUserRecommendationIcon from "../profile-icon/GenericRecommendationIcon";
import { ModalType } from "../../types/modal.types";
import ProfileView from "../Profile-view";
import LikesModule from "../likes-module";
import { getIsLikedByLoggedInUser } from "../../utils/course-recommendation/is-liked-by-logged-in-user";
import { shallowEqual, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../reducers";
import { getLikesCount } from "../../utils/course-recommendation/get-likes-count";
interface IDetailedCourseViewProps {
  courseContext: IDetailedCourse;
  onModalClose: (visible: boolean) => void;
  showLikes: boolean;
  onCourseLikeClicked?: (courseId: string) => void;
  currentCourseContextLike?: ICourse;
}

type Note = {
  learningBlurb: string;
  takeAways: { [key in number]: string };
};

const ReadOnlyNote = ({ index, note }: { index: number; note: Note }) => {
  return note ? (
    <div key={`mainNote_${index}`} className="ReadOnlyNote__main-body">
      <div
        key={`noteTitleText_${index}`}
        className="ReadOnlyNote__Title-Text open-sans-font-family bold"
      >
        {note.learningBlurb}
      </div>
      <div
        key={`listContainer_${index}`}
        className="ReadOnlyNote__List__container"
      >
        <ul className="">
          {note.takeAways &&
            Object.values(note.takeAways).map((bulletPoint, tIndex) => (
              <li
                key={`bulletPoint_${index}_${tIndex}`}
                className="open-sans-font-family"
              >
                {bulletPoint}
              </li>
            ))}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
};

function DetailedCourseViewModal(props: IDetailedCourseViewProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.nullModal);
  const loggedInUser = useSelector(selectLoggedInUser, shallowEqual);
  const handleCloseModal = () => {
    props.onModalClose(false);
  };

  const [userName, setUserNames] = useState<any>({});
  useEffect(() => {
    const getUsers = async () => {
      const user = await getUserById(props.courseContext.postedByUserId);
      if (user) {
        setUserNames({ [`${user._id}`]: `${user.firstName} ${user.lastName}` });
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      document.body.classList.add("no-body-scroll");
    }
  }, [modalVisible]);

  const handleGenericIconClicked = () => {
    setModalType(ModalType.ProfileDetailView);
    setModalVisible(true);
  };

  const handleProfileViewModalClosed = () => {
    setModalType(ModalType.nullModal);
    setModalVisible(false);
  };

  return (
    <div className="Detailed-Course-View__Main-body">
      <header className="Detailed-Course-View__header pale-lime-green">
        <div className="Detailed-Course-View__header-text mont-font">
          <a
            className="no-text-decoration"
            target="_blank"
            href={props.courseContext.url}
            rel="noreferrer"
          >
            {props.courseContext.title || "unknown title"}
          </a>
        </div>
        <img
          onClick={handleCloseModal}
          className="Detailed-Course-View__windowClose pointer"
          alt="close window"
          src={WindowCloseButton}
        />
      </header>
      <section className="Detailed-Course-View__section__about">
        <div className="Detailed-Course-View__section__about__body open-sans-font-family">
          <div className="Detailed-Course-View__section__header bold">
            WHAT IS THIS COURSE ABOUT?
          </div>
          <div className="Detailed-Course-View__about__blurb">
            {props.courseContext.description || "no description"}
          </div>
        </div>
      </section>
      <section className="Detailed-Course-View__section__learning-blurb">
        <div className="Detailed-Course-View__section__about__learning-blurb_body open-sans-font-family">
          <div className="Detailed-Course-View__section__header bold">
            WHAT DID YOU LEARN?
          </div>
          <div className="Detailed-Course-View__Course-Notes__Container">
            {props.courseContext &&
              props.courseContext.notes &&
              Object.values(props.courseContext.notes).map((note, index) => (
                <ReadOnlyNote {...{ index, note }} />
              ))}
          </div>
        </div>
      </section>
      <section className="Detailed-Course-View__section__tags-footer">
        <div className="Detailed-Course-View__section__tags-footer__container">
          <TagApplet readOnly={true} tags={props.courseContext.tags} />
          <div className="Detailed-Course-View__Footer-posted-by__container">
            <GenericUserRecommendationIcon
              userName={userName[props.courseContext.postedByUserId]}
              isRecommendation={true}
              userId={props.courseContext.postedByUserId}
              onIconClicked={handleGenericIconClicked}
              iconClassNames={"pointer"}
            />
          </div>
        </div>
        {props.showLikes && (
          <div className="Detailed-Course-View__likesFooter-section">
            <LikesModule
              checked={getIsLikedByLoggedInUser({
                loggedInUser,
                course: props.currentCourseContextLike,
              })}
              likesCount={getLikesCount({
                data: props.currentCourseContextLike?.likes,
              })}
              forCourseId={props.courseContext._id}
              onLikeButtonClicked={props.onCourseLikeClicked}
              classNames="bottom-margin"
            />
          </div>
        )}
      </section>
      {modalVisible && modalType === ModalType.ProfileDetailView && (
        <div className="Page-Modal">
          <ProfileView
            onModalClose={handleProfileViewModalClosed}
            userId={props.courseContext.postedByUserId}
            closeButtonVisible={true}
          />
        </div>
      )}
    </div>
  );
}

export default DetailedCourseViewModal;
