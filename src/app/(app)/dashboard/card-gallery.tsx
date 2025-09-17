'use client';

import { Button } from '@/components/ui/button';
import { Grid, List, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CardFilters from './card-filters';
import CardItem from '@/components/cards/card-item';
import { CardDto, CardsResponse } from '@/types/card.dto';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';
import CardSkeleton from '@/components/cards/card-skeleton';
import {
  CardQueryParams,
  fetchAllCards,
  fetchLikedCards,
  fetchMyCards,
} from '@/api/card-queries';
import EmptyCardsMessage from '@/components/cards/empty-cards-message';

export default function CardGallery() {
  const { token } = useAuthStore();

  const [activeCategory, setActiveCategory] = useState<'all' | 'my' | 'liked'>(
    'all'
  );
  const [activeFilter, setActiveFilter] = useState<'latest' | 'most-liked'>(
    'latest'
  );
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<CardsResponse>({
      queryKey: ['cards', activeCategory, activeFilter, token],
      queryFn: async ({ pageParam }) => {
        const params: CardQueryParams = {
          pageParam: pageParam as string,
          token,
          sortBy: activeFilter,
        };

        switch (activeCategory) {
          case 'my':
            return fetchMyCards(params);
          case 'liked':
            return fetchLikedCards(params);
          case 'all':
          default:
            return fetchAllCards(params);
        }
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: undefined,
      enabled: !!token,
      retry: false,
    });
  const cards: CardDto[] = data?.pages?.flatMap((page) => page.items) ?? [];

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

  return (
    <>
      <section className="flex items-center justify-between mt-10 mb-6">
        <div className="bg-white border rounded-lg flex">
          <Button
            variant={activeCategory === 'all' ? 'gradient' : 'ghost'}
            gradientColor={activeCategory === 'all' ? 'blue' : undefined}
            onClick={() => setActiveCategory('all')}
            disabled={isFetchingNextPage}
            className="flex items-center gap-2 px-4 py-2"
          >
            {isLoading && activeCategory === 'all' && (
              <Loader2 className="animate-spin w-4 h-4" />
            )}
            All Cards
          </Button>
          <Button
            variant={activeCategory === 'my' ? 'gradient' : 'ghost'}
            gradientColor={activeCategory === 'my' ? 'blue' : undefined}
            onClick={() => setActiveCategory('my')}
            disabled={isFetchingNextPage}
            className="flex items-center gap-2 px-4 py-2"
          >
            {isLoading && activeCategory === 'my' && (
              <Loader2 className="animate-spin w-4 h-4" />
            )}
            My Cards
          </Button>
          <Button
            variant={activeCategory === 'liked' ? 'gradient' : 'ghost'}
            gradientColor={activeCategory === 'liked' ? 'blue' : undefined}
            onClick={() => setActiveCategory('liked')}
            disabled={isFetchingNextPage}
            className="flex items-center gap-2 px-4 py-2"
          >
            {isLoading && activeCategory === 'liked' && (
              <Loader2 className="animate-spin w-4 h-4" />
            )}
            Liked
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <CardFilters value={activeFilter} onChange={setActiveFilter} />

          <div className="hidden md:block">
            <Button
              variant={activeView === 'grid' ? 'gradient' : 'ghost'}
              gradientColor={activeView === 'grid' ? 'blue' : undefined}
              className={`rounded-tr-none rounded-br-none ${activeView !== 'grid' ? 'bg-white border' : undefined}`}
              onClick={() => setActiveView('grid')}
            >
              <Grid />
            </Button>

            <Button
              variant={activeView === 'list' ? 'gradient' : 'ghost'}
              gradientColor={activeView === 'list' ? 'blue' : undefined}
              className={`rounded-tl-none rounded-bl-none ${activeView !== 'list' ? 'bg-white border' : undefined}`}
              onClick={() => setActiveView('list')}
            >
              <List />
            </Button>
          </div>
        </div>
      </section>

      {cards.length === 0 && !isLoading ? (
        <EmptyCardsMessage />
      ) : (
        <section
          className={`grid ${
            activeView === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          } gap-6`}
        >
          {cards.map((card, idx) => (
            <CardItem key={card.id} card={card} gradientIndex={idx} />
          ))}

          {(isFetchingNextPage || isLoading) &&
            Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={`skeleton-${i}`} />
            ))}
        </section>
      )}

      <div ref={loaderRef} />

      {isFetchingNextPage && (
        <div className="text-center py-4 text-gray-500">
          <Loader2 className="animate-spin inline-block w-4 h-4 mr-2" />
          Loading more...
        </div>
      )}
    </>
  );
}
