import { ReactNode } from 'react';
import Header from '@/components/header';
import Wrapper from '@/components/wrapper';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Wrapper>
        <main className="flex-1 py-8">{children}</main>
      </Wrapper>
    </div>
  );
}
