export const getArrayOfInterestTagsFromString = (
  rawString: string
): string[] => {
  const sanitizedString = rawString.trim().toLowerCase();
  const rawArrayFromSanitizedString = sanitizedString.split(",");

  const sanitizedStringArray = rawArrayFromSanitizedString.filter((el) => {
    return el.trim() !== "";
  });
  return sanitizedStringArray.map((value) =>
    value.replace(/\s{2,}/g, " ").trim()
  );
};
