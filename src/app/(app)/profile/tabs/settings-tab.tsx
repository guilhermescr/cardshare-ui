'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function SettingsTab() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="bg-white flex items-center justify-between shadow-md rounded-lg">
      <div>
        <h2>Notification Settings</h2>
        <p>Choose what notifications you want to receive</p>
      </div>

      <form>
        <div>
          <div>
            <h3>Email Updates</h3>
            <p>Receive updates about your account via email</p>
          </div>

          <button type="button">{/* Toggle */}</button>
        </div>

        <div>
          <div>
            <h3>Push Notifications</h3>
            <p>Receive push notifications in your browser</p>
          </div>

          <button type="button">{/* Toggle */}</button>
        </div>

        <div>
          <div>
            <h3>Comment Notifications</h3>
            <p>Get notified when someone comments on your cards</p>
          </div>

          <button type="button">{/* Toggle */}</button>
        </div>

        <div>
          <div>
            <h3>Like Notifications</h3>
            <p>Get notified when someone likes your cards</p>
          </div>

          <button type="button">{/* Toggle */}</button>
        </div>

        <Button
          type="submit"
          className="w-full mb-2"
          variant="gradient"
          gradientColor="blue"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
          Settings
        </Button>
      </form>
    </section>
  );
}
