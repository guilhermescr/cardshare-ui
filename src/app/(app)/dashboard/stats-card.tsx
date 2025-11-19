import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradientClass: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  gradientClass,
}: StatsCardProps) {
  return (
    <section className="bg-white flex items-center justify-between py-4 md:py-10 px-6 flex-1 shadow-md rounded-lg">
      <div>
        <h2 className="text-gray-700 font-medium text-sm">{title}</h2>
        <p className="text-3xl text-gray-900 font-bold">{value}</p>
      </div>
      <div className={`p-3 text-white rounded-xl ${gradientClass}`}>{icon}</div>
    </section>
  );
}
