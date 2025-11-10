import { Sparkles } from 'lucide-react';
import MyCardsItem from '@/components/cards/my-cards-item';
import { useAuthStore } from '@/stores/auth';
import { CardDto } from '@/types/card.dto';
import { useState } from 'react';

interface MyCardsTabProps {
  isOwnProfile: boolean;
}

export default function MyCardsTab({ isOwnProfile = false }: MyCardsTabProps) {
  const { user } = useAuthStore();
  const [cards, setCards] = useState<CardDto[]>([]);

  const handleDelete = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

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

      {cards.length > 0 ? (
        <ul className="space-y-4">
          {cards.map((card) => (
            <MyCardsItem
              key={card.id}
              cardId={card.id}
              isOwnProfile={isOwnProfile}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500">
          {isOwnProfile
            ? "You haven't published any cards yet."
            : `${user?.username} hasn't published any cards yet.`}
        </div>
      )}
    </section>
  );
}
