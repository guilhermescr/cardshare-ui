export interface NotificationDto {
  id: number;
  type: string; // e.g., 'like', 'comment', 'follow'
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}
