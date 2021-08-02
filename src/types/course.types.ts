export interface ICourse {
  _id: string;
  postedByUserId: string;
  courseTitle: string;
  courseUrl: string;
  description: string;
  reviews: {
    [keyof: string]: string;
  };
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
  category: string | CourseCategory;
}

export enum CourseCategory {
  Design = "design",
  Engineering = "engineering",
  HumanResources = "human_resources",
  Management = "management",
  Marketing = "marketing",
  Product = "product",
  Sales = "sales",
}

export const COURSE_CATEGORY_COLOR: { [key in CourseCategory]: string } = {
  [CourseCategory.Design]: "course-category-color-green",
  [CourseCategory.Engineering]: "course-category-color-rose",
  [CourseCategory.HumanResources]: "course-category-color-yellow",
  [CourseCategory.Management]: "course-category-color-blue",
  [CourseCategory.Marketing]: "course-category-color-green",
  [CourseCategory.Product]: "course-category-color-rose",
  [CourseCategory.Sales]: "course-category-color-yellow",
};

export const COURSE_CATEGORY_FRIENDLY_DICTIONARY: {
  [key in CourseCategory]: string;
} = {
  [CourseCategory.Design]: "Design",
  [CourseCategory.Engineering]: "Engineering",
  [CourseCategory.HumanResources]: "Human Resources",
  [CourseCategory.Management]: "Management",
  [CourseCategory.Marketing]: "Marketing",
  [CourseCategory.Product]: "Product",
  [CourseCategory.Sales]: "Sales",
};

export interface ICourseRecommendationPost {
  courseTitle: string;
  courseUrl: string;
  description: string;
  category: string;
  tags: string[];
}

/* 
(packageUpdate: { learningBlurb: string, takeAways: { [key in number]: {[_key in number]: string} }}) => void;
*/

export type ITakeAwayStripDataCollection = {
  [key in number]: string;
};
export type ICourseRecommendationTakeAwayPackage = {
  [key in number]: {
    learningBlurb: string;
    takeAways: ITakeAwayStripDataCollection;
  };
};

export interface ICourseRecommendationSubmission {
  courseRating: number;
  courseTitle: string;
  courseUrl: string;
  description: string;
  category: string;
  tags: string[];
  takeAwayPackages: ICourseRecommendationTakeAwayPackage;
}
