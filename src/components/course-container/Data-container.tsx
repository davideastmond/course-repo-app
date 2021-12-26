import { ICourse, IProcessedUser } from "../../types";
import CourseCard from "../course-card";
import ProfileView from "../Profile-view";
import "./data-container-style.css";

interface IDataContainerProps {
  classNames?: string;
  courses?: ICourse[];
  users?: IProcessedUser[];
  loggedInUser?: IProcessedUser;
  courseCardClickHandler: (id: string) => void;
  genericUserProfileClickHandler: (id: string) => void;
  showCourseCardLikes: boolean;
  onCourseLikeToggle?: (courseId: string) => void;
}

function DataContainer(props: IDataContainerProps) {
  const getIsLikedByLoggedInUser = ({
    course,
  }: {
    course: ICourse;
  }): boolean => {
    return !!(
      props.loggedInUser &&
      props.loggedInUser._id &&
      course &&
      course.likes &&
      course.likes[props.loggedInUser._id]
    );
  };

  const dataContainerHandleCourseLikeClicked = (courseId: string) => {
    if (props.loggedInUser && props.loggedInUser._id) {
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
              isLikedByUser: getIsLikedByLoggedInUser({ course }),
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
          />
        ))}
    </div>
  );
}

export default DataContainer;
