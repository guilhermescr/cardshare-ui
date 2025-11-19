import { Sparkles } from 'lucide-react';
import MyCardsItem from '@/components/cards/my-cards-item';
import { CardDto } from '@/types/card.dto';
import { useState, useEffect, useRef } from 'react';
import { UserDto } from '@/types/user.dto';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';
import { fetchAllCards } from '@/api/card-queries';
import CardSkeleton from '@/components/cards/card-skeleton';
import { Loader2 } from 'lucide-react';

interface MyCardsTabProps {
  isOwnProfile: boolean;
  user: UserDto | null;
}

export default function MyCardsTab({
  isOwnProfile = false,
  user,
}: MyCardsTabProps) {
  const { token } = useAuthStore();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['cards', token],
      queryFn: async ({ pageParam = '' }) => {
        return fetchAllCards({ pageParam, token, userId: user?.id });
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: '',
      enabled: !!token,
      retry: false,
    });

  const [cards, setCards] = useState<CardDto[]>([]);

  useEffect(() => {
    if (data) {
      const allCards = data.pages.flatMap((page) => page.items);
      setCards(allCards);
    }
  }, [data]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <MyCardsItem
              key={card.id}
              card={card}
              isOwnProfile={isOwnProfile}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
        </ul>
      ) : (
        !isLoading && (
          <div className="text-center text-gray-500">
            {isOwnProfile
              ? "You haven't published any cards yet."
              : `${user?.username} hasn't published any cards yet.`}
          </div>
        )
      )}

      {(isFetchingNextPage || isLoading) &&
        Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}

      <div ref={loaderRef} />

      {isFetchingNextPage && (
        <div className="text-center py-4 text-gray-500">
          <Loader2 className="animate-spin inline-block w-4 h-4 mr-2" />
          Loading more...
        </div>
      )}
    </section>
  );
}
