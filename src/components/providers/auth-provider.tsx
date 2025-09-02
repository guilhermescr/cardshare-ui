'use client';

import { useRestoreAuth } from '@/hooks/use-restore-auth';

export function AuthProvider() {
  useRestoreAuth();
  return null;
}
