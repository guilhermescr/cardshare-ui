'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/constants/api';
import { APP_ROUTES, PROTECTED_ROUTES, KNOWN_ROUTES } from '@/constants/routes';

function parseJwt(token: string) {
  try {
    const base64 = token.split('.')[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function useRestoreAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isKnown = KNOWN_ROUTES.some((route) => pathname.startsWith(route));
    const isProtected = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    if (!isKnown || !isProtected) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token.');

        const payload = parseJwt(token);
        const isExpired = !payload?.exp || payload.exp * 1000 <= Date.now();
        if (isExpired) throw new Error('Token expired.');

        const response = await fetch(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Invalid token.');

        const user = await response.json();
        useAuthStore.getState().setAuth(token, user);
      } catch (error) {
        console.error(error);
        useAuthStore.getState().logout();
        localStorage.removeItem('token');
        router.push(APP_ROUTES.LOGIN);
      } finally {
        setLoading(false);
      }
    })();
  }, [pathname, router]);

  return loading;
}
