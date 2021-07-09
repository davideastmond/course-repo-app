const possibleCSSClasses: string[] = [
  "generic-profile-icon-color-red",
  "generic-profile-icon-color-blue",
  "generic-profile-icon-color-green",
];

export const getCSSClassFromFirstASCIIValue = (str: string): string => {
  return possibleCSSClasses[str.charCodeAt(0) % possibleCSSClasses.length];
};
