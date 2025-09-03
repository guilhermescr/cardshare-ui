'use client';

import { useRestoreAuth } from '@/hooks/use-restore-auth';

export function AuthProvider() {
  const loading = useRestoreAuth();
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></span>
      </div>
    );
  }
  return null;
}
