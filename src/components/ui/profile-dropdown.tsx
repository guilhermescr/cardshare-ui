import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/routes';
import ProfilePicture from './profile-picture';

export default function ProfileDropdown() {
  const { user, setAuth } = useAuthStore();
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setAuth(null, null);
    router.push(APP_ROUTES.LOGIN);
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {user.profilePicture ? (
            <ProfilePicture
              url={user.profilePicture}
              size="tiny"
              className="mr-1"
            />
          ) : (
            <User />
          )}
          {user.username}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => router.push('/' + user.username)}>
          <User className="mr-2 h-4 w-4" />
          Profile
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
