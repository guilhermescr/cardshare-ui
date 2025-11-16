import { JSX } from 'react';
import { Bell, Heart, MessageSquare, UserPlus } from 'lucide-react';
import { NotificationDto } from '@/types/notification.dto';
import { useNotification } from '@/contexts/notification.context';
import { NotificationTitle } from '@/enums/notification.enum';
import { NotificationType } from '@/enums/notification.enum';
import { formatDateTime } from '@/utils/date-handlers.utils';
import ProfilePicture from '@/components/ui/profile-picture';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export function NotificationItemSkeleton() {
  return (
    <div className="p-4 border rounded-md flex items-center gap-4 animate-pulse">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="flex-grow space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="w-12 h-4 bg-gray-200 rounded" />
    </div>
  );
}

const notificationIcons: Record<NotificationType, JSX.Element> = {
  [NotificationType.CardLike]: <Heart className="text-red-500" size={18} />,
  [NotificationType.CommentLike]: <Heart className="text-pink-500" size={18} />,
  [NotificationType.Comment]: (
    <MessageSquare className="text-blue-500" size={18} />
  ),
  [NotificationType.Follow]: <UserPlus className="text-green-500" size={18} />,
  [NotificationType.Other]: <Bell className="text-gray-500" size={18} />,
};

interface NotificationItemProps {
  notification: NotificationDto;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const { markAsRead, notificationToRead } = useNotification();

  const router = useRouter();

  const isLoading = notificationToRead === notification.id;

  const containerClass = twMerge(
    'p-4 border rounded-md flex items-center gap-4 hover:brightness-99',
    notification.read
      ? 'bg-white'
      : 'bg-blue-50 border-blue-200 cursor-pointer',
    isLoading && 'cursor-not-allowed opacity-70'
  );

  return (
    <div
      className={containerClass}
      onClick={() => {
        if (!notification.read && !isLoading) {
          markAsRead(notification.id);
        }
      }}
    >
      {notification.sender.profilePicture && (
        <ProfilePicture
          url={notification.sender.profilePicture}
          size="small"
          onClick={() => router.push(`/${notification.sender.username}`)}
        />
      )}

      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <span>{notificationIcons[notification.type]}</span>

          <p className="font-medium">{NotificationTitle[notification.type]}</p>
        </div>

        <p className="text-sm text-gray-600">
          {notification.sender?.username && (
            <Link
              href={`/${notification.sender?.username}`}
              className="font-medium hover:underline"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {notification.sender?.username}
            </Link>
          )}{' '}
          {notification.message}
        </p>
      </div>

      <div className="text-xs text-gray-500 whitespace-nowrap mb-auto">
        {isLoading ? 'Loading...' : formatDateTime(notification.createdAt).date}
      </div>
    </div>
  );
}
