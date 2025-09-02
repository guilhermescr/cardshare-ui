'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/constants/api';

export function useRestoreAuth() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user');
        const user = await response.json();
        useAuthStore.getState().setAuth(token, user);
      } catch (error) {
        console.error(error);
        useAuthStore.getState().logout();
        localStorage.removeItem('token');
        router.push('/auth');
      }
    })();
  }, [router]);
}
