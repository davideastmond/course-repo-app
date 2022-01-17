import { shallowEqual, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../reducers";
import { ICourse, IProcessedUser } from "../../types";
import { getIsLikedByLoggedInUser } from "../../utils/course-recommendation/is-liked-by-logged-in-user";
import CourseCard from "../course-card";
import ProfileView from "../Profile-view";
import "./data-container-style.css";

interface IDataContainerProps {
  classNames?: string;
  courses?: ICourse[];
  users?: IProcessedUser[];
  courseCardClickHandler: (id: string) => void;
  genericUserProfileClickHandler: (id: string) => void;
  showCourseCardLikes: boolean;
  onCourseLikeToggle?: (courseId: string) => void;
  hasSearchContext?: boolean;
}

function DataContainer(props: IDataContainerProps) {
  const loggedInUser = useSelector(selectLoggedInUser, shallowEqual);

  const dataContainerHandleCourseLikeClicked = (courseId: string) => {
    if (loggedInUser && loggedInUser._id) {
      props.onCourseLikeToggle && props.onCourseLikeToggle(courseId);
    }
  };

  return (
    <div className={`${props.classNames || ""} Course-Container`}>
      {props.courses &&
        props.courses.length > 0 &&
        props.courses.map((course) => (
          <CourseCard
            {...{
              course,
              courseCardClickHandler: props.courseCardClickHandler,
              genericUserProfileClickHandler:
                props.genericUserProfileClickHandler,
              isLikedByUser: getIsLikedByLoggedInUser({ loggedInUser, course }),
              onLikeClicked: dataContainerHandleCourseLikeClicked,
              showLikes: props.showCourseCardLikes,
            }}
            key={course._id}
          />
        ))}
      {props.courses && props.courses.length === 0 && (
        <>
          <div className="Courses-Empty-list">No courses to display</div>
        </>
      )}
      {props.users && props.users.length === 0 && (
        <div className="Courses-Empty-list">No users to display</div>
      )}
      {props.users &&
        props.users.length > 0 &&
        props.users.map((user, index) => (
          <ProfileView
            userId={user._id}
            key={`${user._id}_${index}`}
            closeButtonVisible={false}
            onCourseLikeClicked={dataContainerHandleCourseLikeClicked}
            hasSearchContext={props.hasSearchContext}
          />
        ))}
    </div>
  );
}

export default DataContainer;
