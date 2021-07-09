export const validateFormInput = ({
  vTopic,
  vTitle,
  vCourseUrl,
  vCourseDesc,
}: {
  vTopic: string;
  vTitle: string;
  vCourseUrl: string;
  vCourseDesc: string;
}): string[] => {
  const errors: string[] = [];

  if (!vTopic || vTopic.trim().length === 0) {
    errors.push("Please enter a topic");
  }

  if (!vTitle || vTitle.trim().length === 0) {
    errors.push("Please enter a title");
  }

  if (!vCourseUrl || vCourseUrl.trim().length < 4) {
    errors.push("Please enter a url");
  }

  if (!vCourseDesc || vCourseDesc.trim().length < 4) {
    errors.push("Please enter a description");
  }
  return errors;
};
