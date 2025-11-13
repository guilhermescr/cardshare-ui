'use client';

import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientText from '@/components/gradient-text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import NotificationItem from './notification-item';
import { NotificationDto } from '@/types/notification.dto';
import Link from 'next/link';

const mockNotifications: NotificationDto[] = [
  {
    id: 1,
    type: 'like',
    title: 'New like on your card',
    content: 'Alice Johnson liked your card "Beautiful Sunset"',
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'comment',
    title: 'New comment',
    content: 'Bob Wilson commented on "Mountain Adventure": "Amazing shot!"',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'follow',
    title: 'New follower',
    content: 'Carol Davis started following you',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    id: 4,
    type: 'like',
    title: 'New like on your card',
    content: 'David Smith liked your card "Ocean Breeze"',
    timestamp: '5 hours ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'comment',
    title: 'New comment',
    content: 'Emily Clark commented on "Sunset Bliss": "Stunning view!"',
    timestamp: '1 day ago',
    isRead: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationDto[]>(mockNotifications);
  const [filteredNotifications, setFilteredNotifications] =
    useState<NotificationDto[]>(notifications);

  const filterNotifications = (filter: string) => {
    switch (filter) {
      case 'all':
        setFilteredNotifications(notifications);
        break;
      case 'unread':
        setFilteredNotifications(notifications.filter((n) => !n.isRead));
        break;
      case 'likes':
        setFilteredNotifications(
          notifications.filter((n) => n.type === 'like')
        );
        break;
      case 'comments':
        setFilteredNotifications(
          notifications.filter((n) => n.type === 'comment')
        );
        break;
      default:
        setFilteredNotifications(notifications);
    }
  };

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
              {notifications.filter((n) => !n.isRead).length} unread
              notifications
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, isRead: true }))
              )
            }
          >
            Mark all as read
          </Button>

          <Button variant="outline" className="w-full">
            Settings
          </Button>
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full mt-6">
        <TabsList className="w-full bg-white rounded-lg shadow-sm">
          <TabsTrigger
            value="all"
            className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            onClick={() => filterNotifications('all')}
          >
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            onClick={() => filterNotifications('unread')}
          >
            Unread ({notifications.filter((n) => !n.isRead).length})
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            onClick={() => filterNotifications('likes')}
          >
            Likes
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            onClick={() => filterNotifications('comments')}
          >
            Comments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="likes">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comments">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
