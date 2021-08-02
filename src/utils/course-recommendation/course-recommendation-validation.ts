import { ICourseRecommendationSubmission } from "../../types";
import {
  blurbAndTakeAwayValidator,
  courseDescriptionValidator,
  courseTitleValidator,
  courseURLValidator,
} from "./course-recommendation-validators";

type RecommendationValidation = {
  validated: boolean;
  invalidFields: { [key in string]: string[] | Array<string[]> };
  output: ICourseRecommendationSubmission | {};
};

type BlurbTakeAwayItem = {
  learningBlurb: string;
  takeAways: { [key in number]: string };
};

export function validateCourseRecommendation(
  data: ICourseRecommendationSubmission
): RecommendationValidation {
  const validationObj: RecommendationValidation = {
    validated: true,
    invalidFields: {},
    output: data,
  };

  for (const [property, value] of Object.entries(data)) {
    switch (property) {
      case "courseTitle":
        const titleValidatorMessages = courseTitleValidator(value);
        if (titleValidatorMessages.length > 0) {
          validationObj.validated = false;
          validationObj.invalidFields[property] = [];
          validationObj.invalidFields[property] = [
            ...validationObj.invalidFields[property],
            titleValidatorMessages,
          ].flat() as string[];
        }
        break;
      case "courseURL":
        const urlValidatorMessages = courseURLValidator(value);
        if (urlValidatorMessages.length > 0) {
          validationObj.validated = false;
          validationObj.invalidFields[property] = [];
          validationObj.invalidFields[property] = [
            ...validationObj.invalidFields[property],
            urlValidatorMessages,
          ].flat() as string[];
        }
        break;
      case "courseDescription":
        const descValidatorMessages = courseDescriptionValidator(value);
        if (descValidatorMessages.length > 0) {
          validationObj.validated = false;
          validationObj.invalidFields[property] = [];
          validationObj.invalidFields[property] = [
            ...validationObj.invalidFields[property],
            descValidatorMessages,
          ].flat() as string[];
        }
        break;
      case "takeAwayPackages":
        const takeAwayPackageObjectValues = Object.values(
          value
        ) as BlurbTakeAwayItem[];
        const blurbTakeAwayValidatorMessages = blurbAndTakeAwayValidator(
          takeAwayPackageObjectValues
        );
        if (blurbTakeAwayValidatorMessages.length > 0) {
          validationObj.validated = false;
          validationObj.invalidFields[property] = [];
          validationObj.invalidFields[property] = [
            ...validationObj.invalidFields[property],
            blurbTakeAwayValidatorMessages,
          ].flat() as string[];
        }
        break;
      default:
        break;
    }
  }
  return validationObj;
}
