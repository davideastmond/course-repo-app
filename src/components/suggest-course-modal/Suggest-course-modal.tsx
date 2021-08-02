import React, { useRef, useState } from "react";
import "./suggest-course-style.css";
import WindowCloseButton from "../../images/icons/x-close-window.svg";
import StylizedTextInput from "../stylized-text-input";
import UrlChainLinkIcon from "../../images/link-icons/url-chain-link.svg";
import StarRating from "../star-rating-applet";
import CourseTakeAway from "../CourseTakeAway";
import TagApplet from "../Tags-applet";
import ActionButton from "../Buttons/ActionButton";
import StylizedDropDown from "../stylized-drop-down";
import {
  COURSE_CATEGORY_FRIENDLY_DICTIONARY,
  ICourseRecommendationSubmission,
  ICourseRecommendationTakeAwayPackage,
} from "../../types";
import { useDispatch } from "react-redux";
import { validateCourseRecommendation } from "../../utils/course-recommendation";
import ErrorAlertIconRed from "../../images/icons/error-alert-circle-red.svg";
import ZenSpinner from "../ZenSpinner";
const [...COURSE_CATEGORIES] = Object.entries(
  COURSE_CATEGORY_FRIENDLY_DICTIONARY
);

function SuggestCourseModal() {
  const [takeAways, setTakeAways] = useState<any[]>([]);
  const [courseRating, setCourseRating] = useState<number>(0);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [courseUrl, setCourseURL] = useState<string>("");
  const [description, setCourseDescription] = useState<string>("");
  const [category, setCourseCategory] = useState<string>("");
  const [courseTags, setCourseTags] = useState<string[]>([]);

  const takeAwayPackages = useRef<ICourseRecommendationTakeAwayPackage | {}>(
    {}
  );

  const [courseTitleErrorState, setCourseTitleErrorState] =
    useState<boolean>(false);
  const [courseTitleErrorMessages, setCourseTitleErrorMessages] = useState<
    string[]
  >([]);

  const [courseURLErrorState, setCourseURLErrorSate] = useState<boolean>(false);
  const [courseURLErrorMessages, setCourseURLErrorMessages] = useState<
    string[]
  >([]);

  const [courseDescriptionErrorState, setCourseDescriptionErrorSate] =
    useState<boolean>(false);
  const [courseDescriptionErrorMessages, setCourseDescriptionErrorMessages] =
    useState<string[]>([]);

  const [courseTakeAwayPackagesErrorState, setCourseTakeAwayPackagesErrorSate] =
    useState<boolean>(false);
  const [
    courseTakeAwayPackagesErrorMessages,
    setCourseTakeAwayPackagesErrorMessages,
  ] = useState<string[]>([]);

  const [submissionInProgress, setSubmissionInProgress] =
    useState<boolean>(false);
  const handlePackageUpdate = (
    packageUpdate: ICourseRecommendationTakeAwayPackage
  ) => {
    takeAwayPackages.current = {
      ...takeAwayPackages.current,
      ...packageUpdate,
    };
  };
  const dispatch = useDispatch();

  const addTakeAway = () => {
    if (takeAways && takeAways.length < 3) {
      setTakeAways([
        ...takeAways,
        <CourseTakeAway
          key={`takeAwayElement${takeAways.length + 1}`}
          id={`takeAwayElement${takeAways.length + 1}`}
          index={takeAways.length}
          onUpdatePackage={handlePackageUpdate}
        />,
      ]);
    }
  };
  console.log(
    "takeAways",
    courseRating,
    courseTitle,
    courseUrl,
    description,
    takeAwayPackages,
    category,
    courseTags
  );

  const handleCategoryDropDownChange = (value: string) => {
    if (value) {
      setCourseCategory(value);
    }
  };
  const clearAllErrors = () => {
    setCourseTitleErrorState(false);
    setCourseURLErrorSate(false);
    setCourseDescriptionErrorSate(false);
    setCourseTakeAwayPackagesErrorSate(false);
  };

  const handleSubmitRecommendation = () => {
    // Need to validate and clean up
    const submissionBundle: ICourseRecommendationSubmission = {
      courseRating,
      courseTitle,
      courseUrl,
      description,
      category,
      tags: courseTags,
      takeAwayPackages: takeAwayPackages.current,
    };
    const validationObject = validateCourseRecommendation(submissionBundle);
    if (validationObject.validated) {
      setSubmissionInProgress(true);
      clearAllErrors();
      // dispatch(())
    } else {
      setCourseTitleErrorState(!!validationObject.invalidFields["courseTitle"]);
      setCourseTitleErrorMessages(
        (validationObject.invalidFields["courseTitle"] as string[]) || []
      );
      setCourseURLErrorSate(!!validationObject.invalidFields["courseURL"]);
      setCourseURLErrorMessages(
        (validationObject.invalidFields["courseURL"] as string[]) || []
      );
      setCourseDescriptionErrorSate(
        !!validationObject.invalidFields["courseDescription"]
      );
      setCourseDescriptionErrorMessages(
        (validationObject.invalidFields["courseDescription"] as string[]) || []
      );
      setCourseTakeAwayPackagesErrorSate(
        !!validationObject.invalidFields["takeAwayPackages"]
      );
      setCourseTakeAwayPackagesErrorMessages(
        (validationObject.invalidFields["takeAwayPackages"] as string[]) || []
      );
    }
  };

  const removeTakeAway = () => {
    if (takeAways.length === 0) {
      console.log("Take away length is zero");
      return;
    }
    const currentTakeAwayCount = takeAways.length;
    const currentTakeAwaysFromPackage = takeAwayPackages.current as any;
    delete currentTakeAwaysFromPackage[`${currentTakeAwayCount - 1}`];
    takeAwayPackages.current = currentTakeAwaysFromPackage;
    setTakeAways(takeAways.slice(0, -1));
  };
  return (
    <div className="Suggest-course__Main-body">
      {submissionInProgress && <ZenSpinner />}
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
            <div className="Suggest-course__Main-about-section__header-section-text section-header-text suggest-course-left-margin">
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
                isError={courseTitleErrorState}
                errorMessages={courseTitleErrorMessages}
              />
              <StylizedTextInput
                classNames="right-column-text-margin-left"
                label="Course URL"
                id="courseURL"
                specialLabelIcon={UrlChainLinkIcon}
                inputBoxClassNames="single-height-input-box-50px left-padding-single-input"
                onTextChange={(e: any) => setCourseURL(e.target.value)}
                isError={courseURLErrorState}
                errorMessages={courseURLErrorMessages}
              />
            </div>
            <div className="Course-data__section__description__rating left-column-text-margin-left">
              <StylizedTextInput
                multiLine={true}
                label="Description"
                id="description"
                inputBoxClassNames="suggest-course-box-width double-height-input-box-130px top-left-padding"
                onTextChange={(e: any) => setCourseDescription(e.target.value)}
                isError={courseDescriptionErrorState}
                errorMessages={courseDescriptionErrorMessages}
              />
              <StarRating
                editable={true}
                headerText="Your rating(Optional)"
                classNames="Star-rating-margin-left-spacing"
                onRatingChanged={(e: number) => setCourseRating(e)}
              />
            </div>
            <div className="Course-data__section__category left-column-text-margin-left">
              <StylizedDropDown
                items={COURSE_CATEGORIES}
                id="CourseCategories"
                labelText="Topic"
                dropDownClassNames="single-height-input-box-50px open-sans-font-family"
                labelClassNames="open-sans-font-family"
                handleOnChange={handleCategoryDropDownChange}
              />
            </div>
          </div>
        </section>
        <section className="Suggest-course__LearningSection top-margin-buffer">
          <header className="Suggest-course__LearningSection__header-section">
            <div className="Suggest-course__LearningSection__header-section-text section-header-text Suggest-course__Main-about-section__header-section-text suggest-course-left-margin">
              What did you learn?
            </div>
            {courseTakeAwayPackagesErrorState &&
              courseTakeAwayPackagesErrorMessages.map((errorMessage) => (
                <div className="TakeAwaySection__error-container display-flex flex-wrap">
                  <img className="" src={ErrorAlertIconRed} alt="alert" />
                  <div className="TakeAwaySection__ErrorMessage__text open-sans-font-family font-size-12px left-margin-buffer-10px">
                    {errorMessage}
                  </div>
                </div>
              ))}
          </header>
          <div className="line-separator"></div>
          <div className="Course-Take-away-Container">
            {takeAways &&
              takeAways.length > 0 &&
              takeAways.map((takeAway) => takeAway)}
          </div>
          <footer className="Add-take-away-footer">
            <div
              className="Add-take-away-text mont-font bold pointer align-text-center"
              onClick={addTakeAway}
            >
              + Add another takeaway
            </div>
            {takeAways.length > 0 && (
              <div
                className="remove-take-away mont-font bold pointer color-red align-text-center"
                onClick={removeTakeAway}
              >
                Remove takeaway
              </div>
            )}
          </footer>
        </section>
        <section className="Suggest-course__TagsSection top-margin-buffer">
          <header className="Suggest-course__TagsSection__header-section">
            <div className="Suggest-course__TagsSection__header-section section-header-text">
              Tags
            </div>
          </header>
          <div className="line-separator"></div>
          <TagApplet onTagsChanged={setCourseTags} />
        </section>
      </div>
      <div className="line-separator"></div>
      <footer className="Suggest-course__Modal-Controls__footer-main">
        <div className="Suggest-course__Modal-Controls__close-window">
          <ActionButton
            title="Close window"
            plusSymbol={false}
            classNames="Action-button__color__plain right-margin"
          />
        </div>
        <div className="Suggest-course__Modal-Controls__submit">
          <ActionButton
            title="Submit recommendation"
            plusSymbol={false}
            classNames="right-margin"
            action={handleSubmitRecommendation}
          />
        </div>
      </footer>
    </div>
  );
}

export default SuggestCourseModal;
