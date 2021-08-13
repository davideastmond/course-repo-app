import React, { useState, useEffect } from "react";
import { IDetailedCourse } from "../../types";
import "./detailed-course-view.css";
import WindowCloseButton from "../../images/icons/x-close-window.svg";
import TagApplet from "../Tags-applet";
import GenericUserIcon from "../profile-icon/Generic-User-Icon";
import { getUserById } from "../../services/users";
interface IDetailedCourseViewProps {
  courseContext: IDetailedCourse;
  onModalClose: (visible: boolean) => void;
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
  const handleCloseModal = () => {
    props.onModalClose(false);
  };

  const [userName, setUserNames] = useState<any>({});
  useEffect(() => {
    const getUsers = async () => {
      const user = await getUserById(props.courseContext.postedByUserId);
      setUserNames({ [`${user._id}`]: `${user.firstName} ${user.lastName}` });
    };
    getUsers();
  }, []);

  console.log(
    props.courseContext.notes && Object.values(props.courseContext.notes)
  );
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
          className="Detailed-Course-View__windowClose"
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
            <GenericUserIcon
              userName={userName[props.courseContext.postedByUserId]}
              classNames="align-center"
            />
            <div className="Detailed-Course-View__Footer-recommended-by__text open-sans-font-family align-center">
              Recommended by {userName[props.courseContext.postedByUserId]}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailedCourseViewModal;
