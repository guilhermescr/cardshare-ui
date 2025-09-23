import GradientText from '@/components/gradient-text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Camera, MapPin, TrendingUp } from 'lucide-react';
import ProfileTab from './tabs/profile-tab';
import MyCardsTab from './tabs/my-cards-tab';
import SettingsTab from './tabs/settings-tab';
import SecurityTab from './tabs/security-tab';

export default function ProfilePage() {
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
            <div className="rounded-full w-30 h-30 bg-gray-200 border-3 border-white mb-4 shadow-lg relative">
              {/* Profile Picture */}
              <button
                type="button"
                className="bg-white shadow-lg absolute -bottom-1 -right-1 p-3 rounded-full cursor-pointer hover:bg-gray-100 transition"
              >
                <Camera size={16} />
              </button>
            </div>

            <h2 className="text-2xl text-gray-900 font-semibold">John Doe</h2>
            <p className="flex gap-1 items-center text-gray-600 mt-2 mb-5">
              <MapPin size={20} /> San Francisco, CA
            </p>

            <p className="text-center max-w-md">
              Photography enthusiast and nature lover. Sharing my adventures
              through visual storytelling and creative content.
            </p>

            <section className="grid grid-cols-2 gap-4 w-full text-center my-5">
              <div className="bg-purple-50 p-3">
                <h3 className="text-2xl font-semibold">24</h3>
                <span className="text-sm text-gray-600">Cards</span>
              </div>

              <div className="bg-green-50 p-3">
                <h3 className="text-2xl font-semibold">12,500</h3>
                <span className="text-sm text-gray-600">Views</span>
              </div>

              <div className="bg-red-50 p-3">
                <h3 className="text-2xl font-semibold">890</h3>
                <span className="text-sm text-gray-600">Likes</span>
              </div>

              <div className="bg-yellow-50 p-3">
                <h3 className="text-2xl font-semibold">156</h3>
                <span className="text-sm text-gray-600">Followers</span>
              </div>
            </section>

            <p className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={18} /> Joined March 2023
            </p>
          </section>

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
        </section>

        <section className="w-full lg:flex-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100/50">
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
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <ProfileTab />
            </TabsContent>

            <TabsContent value="my-cards" className="space-y-4">
              <MyCardsTab />
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
