import { NotificationType } from '@/enums/notification.enum';

export interface NotificationDto {
  id: string;
  type: NotificationType;
  message: string;
  sender: {
    id: string;
    username?: string;
    profilePicture?: string;
  };
  recipient: string;
  cardId?: string;
  commentId?: string;
  read: boolean;
  createdAt: string;
}
