import { useAuthStore } from '@/stores/auth';

export function useIsOwnProfile(username: string | null): boolean {
  const { user } = useAuthStore();
  return user?.username === username;
}
