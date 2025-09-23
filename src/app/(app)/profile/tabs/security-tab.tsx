'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Shield, Trash } from 'lucide-react';
import { useState } from 'react';

export default function SecurityTab() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <section className="bg-white flex flex-col justify-between shadow-md rounded-lg p-6">
      <div className="mb-5">
        <h2 className="flex items-center gap-2 font-semibold mb-1">
          <Shield /> Security Settings
        </h2>
        <p className="text-sm text-gray-500">Manage your account security</p>
      </div>

      <form className="flex flex-col gap-2 w-full">
        <h3 className="text-sm font-medium">Change Password</h3>

        <input
          className="border rounded-sm py-2 px-3 text-sm"
          type="password"
          id="current-password"
          placeholder="Current password"
        />

        <input
          className="border rounded-sm py-2 px-3 text-sm"
          type="password"
          id="new-password"
          placeholder="New password"
        />

        <input
          className="border rounded-sm py-2 px-3 text-sm"
          type="password"
          id="confirm-password"
          placeholder="Confirm new password"
        />

        <Button
          type="submit"
          className="mt-2 w-max"
          variant="gradient"
          gradientColor="blue"
          disabled={isUpdating}
        >
          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Password
        </Button>
      </form>

      <div className="border-t border-t-gray-200 pt-3 mt-6">
        <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-500">
          Add an extra layer of security to your account
        </p>

        <button
          type="button"
          className="cursor-pointer rounded-md border flex items-center gap-2 mt-4 text-sm font-medium py-2 px-4 hover:bg-gray-100 transition active:scale-95"
        >
          <Shield size={18} /> Enable 2FA
        </button>
      </div>

      <div className="border-t border-t-red-200 pt-3 mt-6">
        <h3 className="text-sm font-medium text-destructive">Danger Zone</h3>
        <p className="text-sm text-gray-500">
          Permanently delete your account and all associated data
        </p>

        <button
          type="button"
          className="cursor-pointer bg-destructive flex items-center gap-3.5 mt-2 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-red-800 transition active:scale-95"
        >
          {isDeleting ? (
            <Loader2 size={20} className="h-4 w-4 animate-spin" />
          ) : (
            <Trash size={20} />
          )}{' '}
          Delete Account
        </button>
      </div>
    </section>
  );
}
