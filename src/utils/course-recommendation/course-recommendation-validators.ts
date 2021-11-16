type TakeAwayObject = {
  learningBlurb: string;
  takeAways: { [key in number]: string };
};

export function courseTitleValidator(value: string): string[] {
  const msg: string[] = [];
  if (value.trim() === "") msg.push("Please enter a course title");
  return msg;
}

export function courseUrlValidator(value: string): string[] {
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
  /* 
    [{0: "some string", 1: "someString2", 2: "anotherString"}, 
    {0: "", 1: ""}
    ]
  */
  if (flattened && flattened.length > 0) {
    flattened.forEach((element) => {
      const elementValues = Object.values(element);
      if (!elementValues.every((el) => el.trim() !== "")) {
        msg.push(
          `Please ensure the take away field is filled out - otherwise delete the field.`
        );
      }
    });
  }
  return msg;
}
const isURLValid = (url: string): boolean => {
  const regEx =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  return regEx.test(url);
};
