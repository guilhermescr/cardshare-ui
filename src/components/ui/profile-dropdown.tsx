import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/routes';

export default function ProfileDropdown() {
  const { user, setAuth } = useAuthStore();
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem('token');
    setAuth(null, null);
    router.push(APP_ROUTES.LOGIN);
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <User />
          {user.username}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => router.push(APP_ROUTES.PROFILE)}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
}
