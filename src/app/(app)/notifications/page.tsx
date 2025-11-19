'use client';

import { Check, MoveLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientText from '@/components/gradient-text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useNotification } from '@/contexts/notification.context';
import NotificationItem, {
  NotificationItemSkeleton,
} from './notification-item';
import { NotificationType } from '@/enums/notification.enum';
import { useState } from 'react';

export default function NotificationsPage() {
  const { isSearching, notifications, markAllAsRead } = useNotification();
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const filterNotifications = (filter: string) => {
    switch (filter) {
      case 'all':
        return notifications;
      case 'unread':
        return notifications.filter((n) => !n.read);
      case 'likes':
        return notifications.filter(
          (n) =>
            n.type === NotificationType.CardLike ||
            n.type === NotificationType.CommentLike
        );
      case 'comments':
        return notifications.filter((n) => n.type === NotificationType.Comment);
      default:
        return notifications;
    }
  };

  const tabs = [
    { value: 'all', label: `All (${notifications.length})`, filter: 'all' },
    {
      value: 'unread',
      label: `Unread (${notifications.filter((n) => !n.read).length})`,
      filter: 'unread',
    },
    {
      value: 'likes',
      label: 'Likes',
      filter: 'likes',
    },
    {
      value: 'comments',
      label: 'Comments',
      filter: 'comments',
    },
  ];

  return (
    <>
      <header className="flex gap-4 flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <MoveLeft className="mr-2" /> Back
            </Link>
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              <GradientText>Notifications</GradientText>
            </h1>
            <p className="text-gray-700">
              {notifications.filter((n) => !n.read).length} unread notifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {notifications.some((n) => !n.read) && (
            <Button
              variant="outline"
              onClick={async () => {
                setIsMarkingAll(true);
                await markAllAsRead();
                setIsMarkingAll(false);
              }}
              disabled={isMarkingAll}
            >
              <Check className="mr-2" /> Mark all as read
            </Button>
          )}

          <Button variant="outline">
            <Settings className="mr-2" /> Settings
          </Button>
        </div>
      </header>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {isSearching
              ? Array.from({ length: 4 }).map((_, index) => (
                  <NotificationItemSkeleton key={index} />
                ))
              : filterNotifications(tab.filter).map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
