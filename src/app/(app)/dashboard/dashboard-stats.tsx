'use client';

import { Grid, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import StatsCard from './stats-card';

export default function DashboardStats() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Total Cards',
      value: user?.cards || 0,
      icon: <Grid />,
      gradientClass: 'bg-gradient-to-r from-blue-600 to-purple-600',
    },
    {
      title: 'Total Followers',
      value: user?.followers || 0,
      icon: <UserPlus />,
      gradientClass: 'bg-gradient-to-br from-green-500 to-teal-500',
    },
    {
      title: 'Total Likes',
      value: user?.likes || 0,
      icon: <Heart />,
      gradientClass: 'bg-gradient-to-r from-pink-600 to-red-400',
    },
    {
      title: 'Comments',
      value: user?.comments || 0,
      icon: <MessageCircle />,
      gradientClass: 'bg-gradient-to-br from-orange-500 to-yellow-500',
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-center justify-between">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          gradientClass={stat.gradientClass}
        />
      ))}
    </section>
  );
}
