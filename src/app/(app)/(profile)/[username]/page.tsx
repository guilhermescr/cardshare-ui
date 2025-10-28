'use client';

import GradientText from '@/components/gradient-text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Camera,
  Flag,
  Loader2,
  MapPin,
  Share2,
  TrendingUp,
  UserMinus,
  UserPlus,
} from 'lucide-react';
import ProfileTab from './tabs/profile-tab';
import MyCardsTab from './tabs/my-cards-tab';
import SettingsTab from './tabs/settings-tab';
import SecurityTab from './tabs/security-tab';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import { useUserData } from '@/hooks/use-user-data';
import { useEffect, useState } from 'react';
import { httpRequest } from '@/utils/http.utils';
import { FollowUserResponseDto, UserResponseDto } from '@/types/user.dto';
import UploadProfilePictureButton from '@/components/ui/upload-profile-picture-button';
import Image from 'next/image';
import ProfilePicture from '@/components/ui/profile-picture';

export default function ProfilePage() {
  const { username } = useParams();
  const { user, token } = useAuthStore();
  const isOwnProfile = user?.username === username;

  const foundUser = useUserData(username ? (username as string) : null, token);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );

  const handleUpload = (imageUrl: string) => {
    setProfilePictureUrl(imageUrl);
  };

  const handleFollowToggle = async () => {
    if (!foundUser?.id || !token) return;

    setIsFollowLoading(true);
    try {
      const response = await httpRequest<FollowUserResponseDto>(
        `/users/${foundUser.id}/follow`,
        {
          token,
          method: 'POST',
        }
      );

      if (response) {
        const updatedUser = await httpRequest<UserResponseDto>(
          `/users/username/${username}`,
          { token }
        );
        setIsFollowing(updatedUser.user.isFollowing);
        foundUser.followers = updatedUser.user.followers;
      } else {
        console.error('Failed to toggle follow status');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsFollowLoading(false);
    }
  };

  useEffect(() => {
    if (foundUser) {
      setProfilePictureUrl(foundUser.profilePicture || null);
      setIsFollowing(foundUser.isFollowing || false);
    }
  }, [foundUser]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <GradientText>Profile</GradientText>
        </h1>
        <p className="text-gray-700 mt-2">
          Manage your account and preferences
        </p>
      </div>

      <section className="flex gap-8 flex-col items-center lg:flex-row lg:items-start">
        <section className="w-full lg:flex-1">
          <section className="bg-white flex flex-col items-center justify-between shadow-md rounded-lg p-6">
            <ProfilePicture
              url={profilePictureUrl}
              size="large"
              isOwnProfile={isOwnProfile}
              className="mb-4 border-3 border-white"
              onUpload={handleUpload}
              onRemove={() => setProfilePictureUrl(null)}
            />

            <h2 className="text-2xl text-gray-900 font-semibold">
              {foundUser?.fullName}
            </h2>
            <p className="flex gap-1 items-center text-gray-600 mt-2 mb-5">
              <MapPin size={20} /> San Francisco, CA
            </p>

            <p className="text-center max-w-md">
              {foundUser?.bio || 'No bio yet.'}
            </p>

            {!isOwnProfile && (
              <div className="mt-4 flex gap-2 items-center w-full">
                <Button
                  className="flex-1"
                  variant="gradient"
                  gradientColor="blue"
                  disabled={isFollowLoading}
                  onClick={handleFollowToggle}
                >
                  {isFollowLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                      Updating...
                    </>
                  ) : isFollowing ? (
                    <>
                      <UserMinus className="mr-2" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2" />
                      Follow
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  className="cursor-pointer border rounded-md py-2.5 px-3.5 transition-all duration-300 hover:bg-gray-50"
                >
                  <Share2 size={16} />
                </button>

                <button
                  type="button"
                  className="cursor-pointer border text-destructive rounded-md py-2.5 px-3.5 transition-all duration-300 hover:bg-gray-50"
                >
                  <Flag size={16} />
                </button>
              </div>
            )}

            <section className="grid grid-cols-2 gap-4 w-full text-center my-5">
              <div className="bg-purple-50 p-3">
                <h3 className="text-2xl font-semibold">
                  {foundUser?.cards.length}
                </h3>
                <span className="text-sm text-gray-600">Cards</span>
              </div>

              <div className="bg-red-50 p-3">
                <h3 className="text-2xl font-semibold">890</h3>
                <span className="text-sm text-gray-600">Likes</span>
              </div>

              <div className="bg-yellow-50 p-3">
                <h3 className="text-2xl font-semibold">
                  {foundUser?.followers.length}
                </h3>
                <span className="text-sm text-gray-600">Followers</span>
              </div>

              <div className="bg-green-50 p-3">
                <h3 className="text-2xl font-semibold">
                  {foundUser?.following.length}
                </h3>
                <span className="text-sm text-gray-600">Following</span>
              </div>
            </section>

            <p className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={18} /> Joined March 2023
            </p>
          </section>

          {isOwnProfile && (
            <section className="rounded-md border border-blue-200 bg-blue-50 py-6 px-5 my-6">
              <h2 className="flex items-center gap-2 font-semibold text-lg mb-6">
                <TrendingUp className="text-blue-600" /> This Month
              </h2>

              <div className="space-y-3 text-[15px]">
                <p className="flex items-center justify-between">
                  <span className="text-gray-700">New Views</span>
                  <span className="text-blue-600 font-semibold">+1.2k</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-gray-700">New Likes</span>
                  <span className="text-red-600 font-semibold">+89</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-gray-700">New Followers</span>
                  <span className="text-green-600 font-semibold">+12</span>
                </p>
              </div>
            </section>
          )}
        </section>

        <section className="w-full lg:flex-3">
          <Tabs
            defaultValue={isOwnProfile ? 'profile' : 'my-cards'}
            className="w-full"
          >
            <TabsList
              className={`grid w-full bg-gray-100/50 ${isOwnProfile ? 'grid-cols-4' : 'grid-cols-1'}`}
            >
              {isOwnProfile ? (
                <>
                  <TabsTrigger
                    value="profile"
                    className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Profile
                  </TabsTrigger>

                  <TabsTrigger
                    value="my-cards"
                    className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    My Cards
                  </TabsTrigger>

                  <TabsTrigger
                    value="settings"
                    className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Settings
                  </TabsTrigger>

                  <TabsTrigger
                    value="security"
                    className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Security
                  </TabsTrigger>
                </>
              ) : (
                <TabsTrigger
                  value="my-cards"
                  className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  Public Cards (3)
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <ProfileTab />
            </TabsContent>

            <TabsContent value="my-cards" className="space-y-4">
              <MyCardsTab isOwnProfile={isOwnProfile} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <SettingsTab />
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <SecurityTab />
            </TabsContent>
          </Tabs>
        </section>
      </section>
    </>
  );
}
