import { Sparkles } from 'lucide-react';
import MyCardsItem from '@/components/cards/my-cards-item';
import { useAuthStore } from '@/stores/auth';

interface MyCardsTabProps {
  isOwnProfile: boolean;
}

export default function MyCardsTab({ isOwnProfile = false }: MyCardsTabProps) {
  const { user } = useAuthStore();
  const cards = Array.from({ length: 3 });

  return (
    <section className="bg-white flex flex-col justify-between shadow-md rounded-lg p-6">
      <div className="mb-5">
        <h2 className="flex items-center gap-2 font-semibold mb-2">
          <Sparkles /> {isOwnProfile ? 'My' : 'Public'} Cards ({cards.length})
        </h2>
        <p className="text-sm text-gray-500">
          {isOwnProfile
            ? 'Manage your published'
            : `${user?.username}'s public`}{' '}
          cards
        </p>
      </div>

      <ul className="space-y-4">
        {cards.map((_, index) => (
          <MyCardsItem key={index} isOwnProfile={isOwnProfile} />
        ))}
      </ul>
    </section>
  );
}
