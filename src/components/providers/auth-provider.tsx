'use client';

import { useRestoreAuth } from '@/hooks/useRestoreAuth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useRestoreAuth();
  return <>{children}</>;
}
