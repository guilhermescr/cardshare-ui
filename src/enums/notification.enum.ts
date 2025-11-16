export enum NotificationType {
  CardLike = 'card_like',
  CommentLike = 'comment_like',
  Comment = 'comment',
  Follow = 'follow',
  Other = 'other',
}

export const NotificationTitle: Record<NotificationType, string> = {
  [NotificationType.CardLike]: 'New Card Like',
  [NotificationType.CommentLike]: 'New Comment Like',
  [NotificationType.Comment]: 'New Comment',
  [NotificationType.Follow]: 'New Follower',
  [NotificationType.Other]: 'Notification',
};
