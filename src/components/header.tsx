'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bell, Home, Menu, Plus, Search } from 'lucide-react';
import { APP_ROUTES } from '@/constants/routes';
import Wrapper from './wrapper';
import Logo from './logo';
import GradientText from './gradient-text';
import { Badge } from './ui/badge';
import ProfileDropdown from './ui/profile-dropdown';
import { useState } from 'react';
import Sidebar from './sidebar';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const notificationCount = 3;

  const viewToRoute: Record<string, string> = {
    dashboard: APP_ROUTES.DASHBOARD,
    notifications: APP_ROUTES.NOTIFICATIONS,
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    const route = viewToRoute[view];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="border-2 w-full shadow-xs">
      <Wrapper>
        <header className="w-full py-3 flex items-center justify-between">
          {mobileMenuOpen && (
            <Sidebar
              currentView={currentView}
              onNavigate={handleNavigate}
              setMobileMenuOpen={setMobileMenuOpen}
              notificationCount={notificationCount}
            />
          )}

          <div className="flex items-center gap-3">
            <Logo size="small" className="rounded-md" />
            <span className="text-xl font-bold">
              <GradientText>CardShare</GradientText>
            </span>
          </div>

          <div className="hidden md:flex relative flex-1 max-w-md mx-6">
            <label
              className="absolute -translate-y-1/2 top-1/2 left-4"
              htmlFor="search-cards"
            >
              <Search className="w-4 h-4" />
            </label>

            <input
              type="search"
              className="w-full border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Search cards..."
              id="search-cards"
              name="search-cards"
            />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              className="hidden lg:inline-flex"
              variant="gradient"
              gradientColor="blue"
              onClick={() => {
                setCurrentView('dashboard');
                router.push(APP_ROUTES.DASHBOARD);
              }}
            >
              <Home className="mr-2" />
              Dashboard
            </Button>

            <Button onClick={() => router.push(APP_ROUTES.DASHBOARD)}>
              <Plus className="mr-2" />
              Create
            </Button>

            <div className="relative">
              <Button
                onClick={() => {
                  setCurrentView('notifications');
                  router.push(APP_ROUTES.NOTIFICATIONS);
                }}
              >
                <Bell />
                {notificationCount > 0 && (
                  <Badge className="bg-gradient-to-b from-pink-600 to-red-400 absolute -top-1.5 -right-1.5 h-6 rounded-full">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>

            <div className="hidden md:flex">
              <ProfileDropdown />
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-gray-100/80"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>
      </Wrapper>
    </div>
  );
}
