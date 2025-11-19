import GradientText from '@/components/gradient-text';
import { Plus } from 'lucide-react';
import CardGallery from './card-gallery';
import { LinkButton } from '@/components/ui/link-button';
import DashboardStats from './dashboard-stats';

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

        <LinkButton
          variant="gradient"
          gradientColor="blue"
          className="mt-4 md:mt-0"
          href="/new"
        >
          <Plus /> Create New Card
        </LinkButton>
      </section>

      <DashboardStats />

      <CardGallery />
    </>
  );
}
