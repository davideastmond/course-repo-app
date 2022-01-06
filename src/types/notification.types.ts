export interface INotification {
  _id: string;
  sourceId: string;
  targetId: string;
  url?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  read: boolean;
  type: NotificationType;
}

export enum NotificationType {
  UserFollow = "user_follow",
  CourseRecommendationLike = "course_like",
}
