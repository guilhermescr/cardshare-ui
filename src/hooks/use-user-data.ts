import { useEffect, useState } from 'react';
import { UserResponseDto, UserDto } from '@/types/user.dto';
import { httpRequest } from '@/utils/http.utils';

export function useUserData(
  username: string | null,
  token: string | null,
  page?: string
) {
  const [userData, setUserData] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username || !token || userData) return;

    setLoading(true);
    (async () => {
      try {
        const response = await httpRequest<UserResponseDto>(
          `/users/username/${username}`,
          { token }
        );
        setUserData(response.user);
      } catch (error) {
        if (page !== 'profile') {
          console.error('Failed to fetch user data:', error);
        }
        setUserData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [username, token, page, userData]);

  return { userData, loading };
}
