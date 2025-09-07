'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bell, Home, Plus, Search } from 'lucide-react';
import { APP_ROUTES } from '@/constants/routes';
import Wrapper from './wrapper';
import Logo from './logo';
import GradientText from './gradient-text';
import { Badge } from './ui/badge';
import ProfileDropdown from './ui/profile-dropdown';

export default function Header() {
  const router = useRouter();

  return (
    <div className="border-2 w-full shadow-xs">
      <Wrapper>
        <header className="w-full py-3 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="small" className="rounded-md" />
            <h1 className="text-xl font-bold">
              <GradientText>CardShare</GradientText>
            </h1>
          </div>

          <div className="relative flex-1 max-w-md mx-6">
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

          {/* {user && (
            <div className="flex items-center gap-4">
              <span className="font-medium">{user.username || user.email}</span>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          )} */}

          <div className="flex items-center gap-4">
            <Button
              variant="gradient"
              gradientColor="blue"
              onClick={() => router.push(APP_ROUTES.DASHBOARD)}
            >
              <Home className="mr-2" />
              Dashboard
            </Button>

            <Button onClick={() => router.push(APP_ROUTES.DASHBOARD)}>
              <Plus className="mr-2" />
              Create
            </Button>

            <div className="relative">
              <Button onClick={() => router.push(APP_ROUTES.DASHBOARD)}>
                <Bell />
                <Badge className="bg-gradient-to-b from-pink-600 to-red-400 absolute -top-1.5 -right-1.5 h-6 rounded-full">
                  3
                </Badge>
              </Button>
            </div>

            <ProfileDropdown />
          </div>
        </header>
      </Wrapper>
    </div>
  );
}
