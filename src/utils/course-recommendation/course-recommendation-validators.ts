type TakeAwayObject = {
  learningBlurb: string;
  takeAways: { [key in number]: string };
};

export function courseTitleValidator(value: string): string[] {
  const msg: string[] = [];
  if (value.trim() === "") msg.push("Please enter a course title");
  return msg;
}

export function courseURLValidator(value: string): string[] {
  const msg: string[] = [];
  if (value.trim() === "") msg.push("Please enter a URL");
  if (!isURLValid(value)) msg.push("Please enter a valid URL");
  return msg;
}

export function courseDescriptionValidator(value: string): string[] {
  const msg: string[] = [];
  if (value.trim() === "") msg.push("Please enter a description");
  return msg;
}

export function blurbAndTakeAwayValidator(value: TakeAwayObject[]): string[] {
  const msg: string[] = [];
  if (!value.every((item) => item.learningBlurb.trim() !== "")) {
    msg.push("Please enter a take away learning description");
  }

  const takeAways = value.map((items) => {
    return Object.values(items.takeAways);
  });
  const flattened = takeAways.flat();
  if (!flattened.every((item) => item.trim() !== "")) {
    msg.push(
      "Please ensure the take away field is filled out - otherwise delete the field."
    );
  }
  return msg;
}
const isURLValid = (url: string): boolean => {
  const regEx =
    /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g;
  return regEx.test(url);
};
