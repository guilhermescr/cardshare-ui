'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import socket from '../utils/socket';
import { NotificationDto } from '@/types/notification.dto';
import { httpRequest } from '@/utils/http.utils';
import { useAuthStore } from '@/stores/auth';

interface NotificationContextType {
  isSearching: boolean;
  notifications: NotificationDto[];

  getNotifications: () => Promise<void>;
  addNotification: (notification: NotificationDto) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => Promise<void>;
  notificationToRead: string | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuthStore();
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [notificationToRead, setNotificationToRead] = useState<string | null>(
    null
  );

  const getNotifications = useCallback(async () => {
    if (!token) return;

    try {
      setIsSearching(true);

      const cardsResponse = await httpRequest<NotificationDto[]>(
        '/notifications',
        {
          token,
        }
      );
      setNotifications(cardsResponse);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsSearching(false);
    }
  }, [token]);

  const addNotification = (notification: NotificationDto) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const markAsRead = async (id: string) => {
    try {
      setNotificationToRead(id);

      await httpRequest(`/notifications/${id}/read`, {
        method: 'PUT',
        token,
      });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    } finally {
      setNotificationToRead(null);
    }
  };

  const markAllAsRead = async () => {
    try {
      await httpRequest(`/notifications/read-all`, {
        method: 'PUT',
        token,
      });

      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  useEffect(() => {
    socket.on('connect', () => {});

    socket.on('add-notification', (notification: NotificationDto) => {
      addNotification({ ...notification, read: false });
    });

    socket.on('remove-notification', (data) => {
      const { notificationIds } = data;

      if (notificationIds.length) {
        setNotifications((prev) =>
          prev.filter(
            (notification) => !notificationIds.includes(notification.id)
          )
        );
      }
    });

    socket.on('disconnect', () => {});

    getNotifications();

    return () => {
      socket.off('connect');
      socket.off('add-notification');
      socket.off('remove-notification');
      socket.off('disconnect');
    };
  }, [getNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        isSearching,
        notifications,
        getNotifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        notificationToRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};
