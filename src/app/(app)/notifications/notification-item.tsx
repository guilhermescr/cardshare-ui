import { JSX } from 'react';
import { Heart, MessageSquare, UserPlus } from 'lucide-react';
import { NotificationDto } from '@/types/notification.dto';

const notificationIcons: Record<string, JSX.Element> = {
  like: <Heart className="text-red-500" />,
  comment: <MessageSquare className="text-blue-500" />,
  follow: <UserPlus className="text-green-500" />,
};

interface NotificationItemProps {
  notification: NotificationDto;
  readNotification: (id: number) => void;
}

export default function NotificationItem({
  notification,
  readNotification,
}: NotificationItemProps) {
  return (
    <div
      className={`p-4 border rounded-md flex items-center gap-4 ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-blue-200 cursor-pointer'} hover:brightness-99`}
      onClick={() => {
        if (!notification.isRead) {
          readNotification(notification.id);
        }
      }}
    >
      <div>{notificationIcons[notification.type]}</div>

      <div className="flex-grow">
        <p className="font-medium">{notification.title}</p>
        <p className="text-sm text-gray-600">{notification.content}</p>
      </div>

      <div className="text-xs text-gray-500 whitespace-nowrap mb-auto">
        {notification.timestamp}
      </div>
    </div>
  );
}
