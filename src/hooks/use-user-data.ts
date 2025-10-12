import { useEffect, useState } from 'react';
import { UserResponseDto, UserDto } from '@/types/user.dto';
import { httpRequest } from '@/utils/http.utils';

export function useUserData(username: string | null, token: string | null) {
  const [userData, setUserData] = useState<UserDto | null>(null);

  useEffect(() => {
    if (!username || !token || userData) return;

    (async () => {
      const response = await httpRequest<UserResponseDto>(
        `/users/username/${username}`,
        { token }
      );
      setUserData(response.user);
    })();
  }, [username, token, userData]);

  return userData;
}
