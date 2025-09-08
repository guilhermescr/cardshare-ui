import GradientText from '@/components/gradient-text';
import { Button } from '@/components/ui/button';
import { Eye, Grid, Heart, MessageCircle, Plus } from 'lucide-react';
import CardGallery from './card-gallery';

export default function DashboardPage() {
  return (
    <>
      <section className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">
            <GradientText>Dashboard</GradientText>
          </h1>
          <p className="text-gray-700 mt-2">
            Discover and manage your amazing cards
          </p>
        </div>

        <Button variant="gradient" gradientColor="blue" className="mt-4 md:mt-0">
          <Plus /> Create New Card
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-center justify-between">
        <section className="bg-white flex items-center justify-between py-4 md:py-10 px-6 flex-1 shadow-md rounded-lg">
          <div>
            <h2 className="text-gray-700 font-medium text-sm">Total Cards</h2>
            <p className="text-3xl text-gray-900 font-bold">24</p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white rounded-xl">
            <Grid />
          </div>
        </section>

        <section className="bg-white flex items-center justify-between py-4 md:py-10 px-6 flex-1 shadow-md rounded-lg">
          <div>
            <h2 className="text-gray-700 font-medium text-sm">Total Views</h2>
            <p className="text-3xl text-gray-900 font-bold">1.2K</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 text-white rounded-xl">
            <Eye />
          </div>
        </section>

        <section className="bg-white flex items-center justify-between py-4 md:py-10 px-6 flex-1 shadow-md rounded-lg">
          <div>
            <h2 className="text-gray-700 font-medium text-sm">Total Likes</h2>
            <p className="text-3xl text-gray-900 font-bold">456</p>
          </div>

          <div className="bg-gradient-to-r from-pink-600 to-red-400 p-3 text-white rounded-xl">
            <Heart />
          </div>
        </section>

        <section className="bg-white flex items-center justify-between py-4 md:py-10 px-6 flex-1 shadow-md rounded-lg">
          <div>
            <h2 className="text-gray-700 font-medium text-sm">Comments</h2>
            <p className="text-3xl text-gray-900 font-bold">89</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-3 text-white rounded-xl">
            <MessageCircle />
          </div>
        </section>
      </section>

      <CardGallery />
    </>
  );
}
