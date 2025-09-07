'use client';

import { APP_ROUTES } from '@/constants/routes';
import { Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CheckEmailActionButtonProps {
  variant: 'resend' | 'back';
  className?: string;
}

export function CheckEmailActionButton({
  variant,
  className = '',
}: CheckEmailActionButtonProps) {
  const router = useRouter();

  if (variant === 'resend') {
    return (
      <button
        type="button"
        className={`cursor-pointer ring-1 ring-gray-200 rounded-md flex items-center justify-center gap-4 font-medium text-sm p-2 mt-5 mb-3 w-full hover:bg-gray-50 ${className}`}
      >
        <Mail size={18} /> Resend Email
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`w-full rounded-md flex items-center justify-center gap-4 font-medium text-sm p-2 cursor-pointer hover:ring-1 hover:ring-gray-200 hover:bg-gray-50 ${className}`}
      onClick={() => router.push(APP_ROUTES.LOGIN)}
    >
      <ArrowLeft size={18} /> Back to Sign In
    </button>
  );
}
