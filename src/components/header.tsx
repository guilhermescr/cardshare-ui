'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bell, Home, Menu, Plus, Search } from 'lucide-react';
import { APP_ROUTES } from '@/constants/routes';
import Wrapper from './wrapper';
import Logo from './logo';
import GradientText from './gradient-text';
import { Badge } from './ui/badge';
import ProfileDropdown from './ui/profile-dropdown';
import Sidebar from './sidebar';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/contexts/notification.context';
import SearchDialog from './search/search-dialog';

export type SidebarView = 'dashboard' | 'new' | 'notifications' | 'profile';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { notifications } = useNotification();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<SidebarView>('dashboard');
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const notificationCount = notifications.filter((n) => !n.read).length;

  const viewToRoute: Record<SidebarView, string> = useMemo(
    () => ({
      dashboard: APP_ROUTES.DASHBOARD,
      new: APP_ROUTES.CREATE_CARD,
      notifications: APP_ROUTES.NOTIFICATIONS,
      profile: user ? `/${user.username}` : '/',
    }),
    [user]
  );

  useEffect(() => {
    const view = Object.keys(viewToRoute).find(
      (key) => viewToRoute[key as SidebarView] === pathname
    ) as SidebarView | undefined;
    if (view) {
      setCurrentView(view);
    }
  }, [pathname, viewToRoute]);

  const handleNavigate = (view: SidebarView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    const route = viewToRoute[view];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="border-b-2 w-full shadow-xs sticky top-0 bg-white/85 z-10 backdrop-blur-md">
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
              className="cursor-pointer w-full border rounded-md py-2 pl-10 pr-4 text-sm hover:outline-none hover:ring-2 hover:ring-gray-300"
              placeholder="Search cards..."
              id="search-cards"
              name="search-cards"
              onFocus={() => setSearchDialogOpen(true)}
              readOnly
            />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              className="hidden lg:inline-flex"
              variant={currentView === 'dashboard' ? 'gradient' : 'default'}
              gradientColor={currentView === 'dashboard' ? 'blue' : undefined}
              onClick={() => {
                setCurrentView('dashboard');
                router.push(APP_ROUTES.DASHBOARD);
              }}
            >
              <Home className="mr-2" />
              Dashboard
            </Button>

            <Button
              variant={currentView === 'new' ? 'gradient' : 'default'}
              gradientColor={currentView === 'new' ? 'blue' : undefined}
              onClick={() => router.push(APP_ROUTES.CREATE_CARD)}
            >
              <Plus className="mr-2" />
              Create
            </Button>

            <div className="relative">
              <Button
                variant={
                  currentView === 'notifications' ? 'gradient' : 'default'
                }
                gradientColor={
                  currentView === 'notifications' ? 'blue' : undefined
                }
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

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden hover:bg-gray-100/80"
          >
            <Menu className="!h-5 !w-5" />
          </Button>
        </header>
      </Wrapper>

      <SearchDialog
        isOpen={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
      />
    </div>
  );
}
