'use client';

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function Header() {
  const { user, setAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(null, null);
    router.push('/auth');
  };

  return (
    <header className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow flex items-center justify-between">
      <h2 className="text-xl font-semibold">CardShare Dashboard</h2>
      {user && (
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
      )}
    </header>
  );
}
