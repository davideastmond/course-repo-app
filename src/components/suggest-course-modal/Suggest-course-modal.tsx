import { useRef, useState } from "react";
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
import ZenSpinner from "../Spinner";
import { postCourseRecommendationAsync } from "../../reducers";
import { getCourseAutoComplete } from "../../services/courses";
import { isURLValid } from "../../utils/url/url-valid";
import AlertToast from "../alert-toast";
import { AlertType } from "../alert-toast/types";

const [...COURSE_CATEGORIES] = Object.entries(
  COURSE_CATEGORY_FRIENDLY_DICTIONARY
);

interface ISuggestCourseModalProps {
  onModalClose: (visible: boolean) => void;
}
function SuggestCourseModal(props: ISuggestCourseModalProps) {
  const [takeAways, setTakeAways] = useState<any[]>([]);
  const [rating, setCourseRating] = useState<number>(0);
  const [title, setCourseTitle] = useState<string>("");
  const [url, setCourseURL] = useState<string>("");
  const [description, setCourseDescription] = useState<string>("");
  const [category, setCourseCategory] = useState<string>("");
  const [courseTags, setCourseTags] = useState<string[]>([]);
  const [submissionErrorState, setSubmissionErrorState] =
    useState<boolean>(false);
  const [submissionErrorMessageText, setSubmissionErrorMessageText] =
    useState<string>("");
  const takeAwayPackages = useRef<ICourseRecommendationTakeAwayPackage | {}>(
    {}
  );

  const [courseTitleErrorState, setCourseTitleErrorState] =
    useState<boolean>(false);
  const [courseTitleErrorMessages, setCourseTitleErrorMessages] = useState<
    string[]
  >([]);

  const [courseURLErrorState, setCourseURLErrorState] =
    useState<boolean>(false);
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
  const [
    autoCompleteProcessingInProgress,
    setAutoCompleteProcessingInProgress,
  ] = useState<boolean>(false);
  const [autoFillMode, setAutoFillMode] = useState<boolean>(false);
  const [autoFillTextError, setAutoFillTextError] = useState<string>("");
  const [autoFillErrorShow, setAutoFillErrorShow] = useState<boolean>(false);
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

  const createAutoFillTakeAway = (takeAways: string[]) => {
    if (takeAways && takeAways.length && takeAways.length > 0) {
      const takeAwaySelection = takeAways.slice(0, 3);
      const newTakeAwaysFromSelection: any[] = takeAwaySelection.map(
        (selection, index) => (
          <CourseTakeAway
            key={`autoFillTakeAwayElement${index + 1}`}
            id={`autoFillTakeAwayElement${index + 1}`}
            index={index}
            onUpdatePackage={handlePackageUpdate}
            value={selection}
          />
        )
      );

      takeAwayPackages.current = newTakeAwaysFromSelection;
      setTakeAways(newTakeAwaysFromSelection);
      handlePackageUpdate(newTakeAwaysFromSelection);
    }
  };
  const handleCategoryDropDownChange = (value: string) => {
    if (value) {
      console.log("Course category dropdown", value);
      setCourseCategory(value);
    }
  };
  const clearAllErrors = () => {
    setCourseTitleErrorState(false);
    setCourseURLErrorState(false);
    setCourseDescriptionErrorSate(false);
    setCourseTakeAwayPackagesErrorSate(false);
  };

  const handleSubmitResponse = (success: boolean) => {
    if (!success) {
      setSubmissionErrorMessageText(
        "There was a problem completing this request. Please check your connection and try logging in again."
      );
      setSubmissionInProgress(false);
      setSubmissionErrorState(true);
    } else {
      props.onModalClose(false);
    }
  };
  const handleSubmitRecommendation = () => {
    const submissionBundle: ICourseRecommendationSubmission = {
      rating,
      title,
      url,
      description,
      category,
      tags: courseTags,
      notes: takeAwayPackages.current,
    };
    const validationObject = validateCourseRecommendation(submissionBundle);
    setSubmissionErrorState(false);

    if (validationObject.validated) {
      setSubmissionInProgress(true);
      clearAllErrors();
      dispatch(
        postCourseRecommendationAsync({
          data: submissionBundle,
          setDone: setSubmissionInProgress,
          successHandler: handleSubmitResponse,
        })
      );
    } else {
      setCourseTitleErrorState(!!validationObject.invalidFields["title"]);
      setCourseTitleErrorMessages(
        (validationObject.invalidFields["title"] as string[]) || []
      );
      setCourseURLErrorState(!!validationObject.invalidFields["url"]);
      setCourseURLErrorMessages(
        (validationObject.invalidFields["url"] as string[]) || []
      );
      setCourseDescriptionErrorSate(
        !!validationObject.invalidFields["description"]
      );
      setCourseDescriptionErrorMessages(
        (validationObject.invalidFields["description"] as string[]) || []
      );
      setCourseTakeAwayPackagesErrorSate(
        !!validationObject.invalidFields["notes"]
      );
      setCourseTakeAwayPackagesErrorMessages(
        (validationObject.invalidFields["notes"] as string[]) || []
      );
    }
  };

  const removeTakeAway = () => {
    if (takeAways.length === 0) {
      return;
    }
    const currentTakeAwayCount = takeAways.length;
    const currentTakeAwaysFromPackage = takeAwayPackages.current as any;
    delete currentTakeAwaysFromPackage[`${currentTakeAwayCount - 1}`];
    takeAwayPackages.current = currentTakeAwaysFromPackage;
    setTakeAways(takeAways.slice(0, -1));
  };

  const handleCloseModal = () => {
    props.onModalClose(false);
  };

  const handleCourseDescriptionChanged = (e: any) => {
    setCourseDescription(e.target.value);
  };

  const attemptAutofill = async () => {
    if (url) {
      try {
        setAutoCompleteProcessingInProgress(true);
        setAutoFillMode(true);
        const autoCompleteData = await getCourseAutoComplete({ url });
        setCourseTitle(autoCompleteData.title!);
        setCourseDescription(autoCompleteData.description!);
        if (autoCompleteData.keyPoints) {
          createAutoFillTakeAway(autoCompleteData.keyPoints);
        }
        const titleTextBox = document.getElementById(
          "courseTitle"
        ) as HTMLTextAreaElement;
        const descriptionTextBox = document.getElementById(
          "description"
        ) as HTMLTextAreaElement;
        if (titleTextBox) {
          titleTextBox.value = autoCompleteData.title!;
        }
        if (descriptionTextBox) {
          descriptionTextBox.value = autoCompleteData.description!;
          setCourseDescription(autoCompleteData.description!);
        }
        setAutoCompleteProcessingInProgress(false);
      } catch (err) {
        console.log("autofill error", err);
        setAutoFillTextError("Unable to auto-complete with this URL.");
        setAutoFillErrorShow(true);
        setAutoCompleteProcessingInProgress(false);
      }
    }
  };

  return (
    <div className="Suggest-course__Main-body">
      {submissionInProgress && <ZenSpinner />}
      {autoCompleteProcessingInProgress && <ZenSpinner />}
      <div className="Suggest-course__margin-body">
        <div className="Suggest-course__Main-header-top-enclosure">
          <img
            onClick={handleCloseModal}
            className="Suggest-course__windowClose"
            alt="close window"
            src={WindowCloseButton}
          />
        </div>
        {submissionErrorState && (
          <AlertToast
            message={submissionErrorMessageText}
            textClassNames={"error-text"}
            dismissErrorFunction={setSubmissionErrorState}
            dismissTextFunction={setSubmissionErrorMessageText}
          />
        )}
        <div className="Suggest-course__body-main-enclosure">
          <div className="Suggest-course__Window-title-Enclosure">
            <div className="Suggest-course__Window-title-Text suggest-course-left-margin title-margin-spacing">
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
              <div className="Course-data__section__title__URL desktop-flex-positioning">
                <StylizedTextInput
                  label="Course Title"
                  labelClassnames="bold"
                  id="courseTitle"
                  inputBoxClassNames="open-sans-font-family full-space"
                  onTextChange={(e: any) => setCourseTitle(e.target.value)}
                  isError={courseTitleErrorState}
                  errorMessages={courseTitleErrorMessages}
                  specialDivClassnames="Suggest-course__text-input-responsive_spacing"
                  value={title && title.length > 0 ? title : title}
                  autoFill={autoFillMode}
                />
                <StylizedTextInput
                  classNames="right-column-text-margin-left"
                  label="Course URL"
                  labelClassnames="bold"
                  id="courseURL"
                  specialLabelIcon={UrlChainLinkIcon}
                  inputBoxClassNames="open-sans-font-family url-text-full-space"
                  onTextChange={(e: any) => setCourseURL(e.target.value)}
                  isError={courseURLErrorState}
                  errorMessages={courseURLErrorMessages}
                />
                <div className="AutoGetDetails__encl">
                  <ActionButton
                    title="Auto Get details"
                    action={attemptAutofill}
                    plusSymbol={false}
                    disabled={
                      !(url && url.trim().length > 0 && isURLValid(url)) ||
                      autoCompleteProcessingInProgress
                    }
                  />
                  {autoFillErrorShow && (
                    <AlertToast
                      message={autoFillTextError}
                      dismissTextFunction={setAutoFillTextError}
                      dismissErrorFunction={setAutoFillErrorShow}
                      alertType={AlertType.Error}
                      textClassNames={"color-red"}
                    />
                  )}
                </div>
              </div>
              <div className="Course-data__section__description__rating left-column-text-margin-left desktop-flex-positioning">
                <StylizedTextInput
                  multiLine={true}
                  label="Description"
                  labelClassnames="bold"
                  id="description"
                  inputBoxClassNames="open-sans-font-family"
                  onTextChange={handleCourseDescriptionChanged}
                  isError={courseDescriptionErrorState}
                  errorMessages={courseDescriptionErrorMessages}
                  specialDivClassnames="Suggest-course-description-responsive"
                  value={description}
                  autoFill={autoFillMode}
                />
                <StarRating
                  editable={true}
                  headerText="Your rating (Optional)"
                  classNames="Star-rating-margin-left-spacing Suggest-course__text-input-responsive_spacing star-rating-left-margin"
                  onRatingChanged={(e: number) => setCourseRating(e)}
                />
              </div>
              <div className="Course-data__section__category left-column-text-margin-left">
                <StylizedDropDown
                  items={COURSE_CATEGORIES}
                  id="CourseCategories"
                  labelText="Topic"
                  labelClassnames="bold open-sans-font-family"
                  dropDownClassNames="global-text-font-size"
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
                  // <div className="TakeAwaySection__error-container display-flex flex-wrap">
                  //   <img className="" src={ErrorAlertIconRed} alt="alert" />
                  //   <div className="TakeAwaySection__ErrorMessage__text open-sans-font-family font-size-12px left-margin-buffer-10px">
                  //     {errorMessage}
                  //   </div>
                  // </div>
                  <AlertToast
                    message={errorMessage}
                    dismissTextFunction={() => {}}
                    dismissErrorFunction={() => {}}
                  />
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
            <TagApplet
              onTagsChanged={setCourseTags}
              readOnly={false}
              inputBoxClassnames="open-sans-font-family"
            />
          </section>
          <div className="line-separator"></div>
          <footer className="Suggest-course__Modal-Controls__footer-main">
            <div className="Suggest-course__Modal-Controls__close-window">
              <ActionButton
                title="Close window"
                action={handleCloseModal}
                plusSymbol={false}
                classNames="Action-button__color__plain"
              />
            </div>
            <div className="Suggest-course__Modal-Controls__submit">
              <ActionButton
                title="Submit recommendation"
                plusSymbol={false}
                classNames=""
                action={handleSubmitRecommendation}
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default SuggestCourseModal;
