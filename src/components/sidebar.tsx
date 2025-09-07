import { Search, Bell, LayoutDashboard, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import Logo from './logo';
import GradientText from './gradient-text';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  notificationCount: number;
}

export default function Sidebar({
  currentView,
  onNavigate,
  setMobileMenuOpen,
  notificationCount,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="md:hidden fixed inset-0 bg-white backdrop-blur-md border-t border-gray-200/50">
      <div className="px-6 py-4 space-y-3">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="small" className="rounded-md" />
            <h1 className="text-xl font-bold">
              <GradientText>CardShare</GradientText>
            </h1>
          </div>

          <Button onClick={() => setMobileMenuOpen(false)} variant="ghost">
            <X />
          </Button>
        </header>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50/50 border-gray-200"
          />
        </div>

        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              currentView === item.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'hover:bg-gray-100/80'
            }`}
            onClick={() => {
              onNavigate(item.id);
              setMobileMenuOpen(false);
            }}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        ))}

        <Button
          variant={currentView === 'notifications' ? 'default' : 'ghost'}
          className={`w-full justify-start relative ${
            currentView === 'notifications'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'hover:bg-gray-100/80'
          }`}
          onClick={() => {
            onNavigate('notifications');
            setMobileMenuOpen(false);
          }}
        >
          <Bell className="h-4 w-4 mr-2" />
          Notifications
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="ml-auto h-5 w-5 flex items-center justify-center text-xs p-0"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}
