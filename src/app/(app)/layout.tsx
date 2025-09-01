import { ReactNode } from 'react';
import Header from '@/components/header';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-8">{children}</main>
    </div>
  );
}
