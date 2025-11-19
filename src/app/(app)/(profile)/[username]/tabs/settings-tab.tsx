'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  emailUpdates: boolean;
  pushNotifications: boolean;
  commentNotifications: boolean;
  likeNotifications: boolean;
};

export default function SettingsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      emailUpdates: true,
      pushNotifications: false,
      commentNotifications: true,
      likeNotifications: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    console.log('Form Data:', data);
    // Here could be done an API call to save the settings
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="bg-white flex flex-col justify-between shadow-md rounded-lg p-6">
      <div className="mb-5">
        <h2 className="flex items-center gap-2 font-semibold mb-1">
          Notification Settings
        </h2>
        <p className="text-sm text-gray-500">
          Choose what notifications you want to receive
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Email Updates</h3>
            <p className="text-gray-600 text-sm">
              Receive updates about your account via email
            </p>
          </div>
          <Switch
            checked={watch('emailUpdates')}
            onCheckedChange={(checked) => setValue('emailUpdates', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Push Notifications</h3>
            <p className="text-gray-600 text-sm">
              Receive push notifications in your browser
            </p>
          </div>
          <Switch
            checked={watch('pushNotifications')}
            onCheckedChange={(checked) =>
              setValue('pushNotifications', checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Comment Notifications</h3>
            <p className="text-gray-600 text-sm">
              Get notified when someone comments on your cards
            </p>
          </div>
          <Switch
            checked={watch('commentNotifications')}
            onCheckedChange={(checked) =>
              setValue('commentNotifications', checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Like Notifications</h3>
            <p className="text-gray-600 text-sm">
              Get notified when someone likes your cards
            </p>
          </div>
          <Switch
            checked={watch('likeNotifications')}
            onCheckedChange={(checked) =>
              setValue('likeNotifications', checked)
            }
          />
        </div>

        <Button
          type="submit"
          className="w-full mb-2"
          variant="gradient"
          gradientColor="blue"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2" />
          )}{' '}
          Save Settings
        </Button>
      </form>
    </section>
  );
}
