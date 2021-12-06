export interface ICourse {
  _id: string;
  postedByUserId: string;
  title: string;
  url: string;
  description: string;
  reviews: {
    [keyof: string]: string;
  };
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
  category: string | CourseCategory;
}

export interface IDetailedCourse extends ICourse {
  notes: ICourseRecommendationTakeAwayPackage;
}

export enum CourseCategory {
  Design = "design",
  Engineering = "engineering",
  HumanResources = "human_resources",
  Management = "management",
  Marketing = "marketing",
  Product = "product",
  Sales = "sales",
  SoftwareIT = "software",
  OfficeProductivity = "office_productivity",
  PhotographyVideo = "photography_video",
  HealthFitness = "health_fitness",
  PersonalDevelopment = "personal_development",
  FinanceAccounting = "finance_accounting",
  TeachingAcademics = "teaching_academics",
}

export const COURSE_CATEGORY_COLOR: { [key in CourseCategory]: string } = {
  [CourseCategory.Design]: "course-category-color-green",
  [CourseCategory.Engineering]: "course-category-color-rose",
  [CourseCategory.HumanResources]: "course-category-color-yellow",
  [CourseCategory.Management]: "course-category-color-blue",
  [CourseCategory.Marketing]: "course-category-color-green",
  [CourseCategory.Product]: "course-category-color-rose",
  [CourseCategory.Sales]: "course-category-color-green",
  [CourseCategory.SoftwareIT]: "course-category-color-yellow",
  [CourseCategory.OfficeProductivity]: "course-category-color-blue",
  [CourseCategory.PhotographyVideo]: "course-category-color-rose",
  [CourseCategory.HealthFitness]: "course-category-color-yellow",
  [CourseCategory.PersonalDevelopment]: "course-category-color-blue",
  [CourseCategory.FinanceAccounting]: "course-category-color-green",
  [CourseCategory.TeachingAcademics]: "course-category-color-rose",
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
  [CourseCategory.SoftwareIT]: "Software/IT",
  [CourseCategory.OfficeProductivity]: "Office Productivity",
  [CourseCategory.PhotographyVideo]: "Photography/Video",
  [CourseCategory.HealthFitness]: "Health & Fitness",
  [CourseCategory.PersonalDevelopment]: "Personal Development",
  [CourseCategory.FinanceAccounting]: "Finance & Accounting",
  [CourseCategory.TeachingAcademics]: "Teaching & Academics",
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
    noteId: string;
    learningBlurb: string;
    takeAways: ITakeAwayStripDataCollection;
  };
};

export enum CourseQueryType {
  All = "all",
  ByTags = "by_tags",
}

export interface ICourseRecommendationSubmission {
  rating: number;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  notes: ICourseRecommendationTakeAwayPackage;
}

export type HtmlExtractionData = {
  description: string | null;
  title: string | null;
  keyPoints?: string[] | null;
  category?: string | null;
};
