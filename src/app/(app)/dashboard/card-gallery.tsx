'use client';

import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CardFilters from './card-filters';
import CardItem from '@/components/cards/card-item';
import { CardDto } from '@/types/card.dto';
import { useInfiniteQuery } from '@tanstack/react-query';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/stores/auth';
import CardSkeleton from '@/components/cards/card-skeleton';

export default function CardGallery() {
  const { token } = useAuthStore();

  async function fetchCards({ pageParam }: { pageParam?: string }) {
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const url = new URL(`${API_URL}/cards?limit=9`);
    if (pageParam) url.searchParams.set('cursor', pageParam);
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });
    return response.json();
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['cards'],
      queryFn: fetchCards,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: undefined,
      enabled: !!token,
    });

  const [activeCategory, setActiveCategory] = useState<'all' | 'my' | 'liked'>(
    'all'
  );
  const [activeFilter, setActiveFilter] = useState<
    'none' | 'most-liked' | 'recent'
  >('none');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const cards: CardDto[] = data?.pages?.flatMap((page) => page.items) ?? [];

  const loaderRef = useRef<HTMLDivElement | null>(null);

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
        <div className="bg-white border rounded-lg">
          <Button
            variant={activeCategory === 'all' ? 'gradient' : 'ghost'}
            gradientColor={activeCategory === 'all' ? 'blue' : undefined}
            onClick={() => setActiveCategory('all')}
          >
            All Cards
          </Button>
          <Button
            variant={activeCategory === 'my' ? 'gradient' : 'ghost'}
            gradientColor={activeCategory === 'my' ? 'blue' : undefined}
            onClick={() => setActiveCategory('my')}
          >
            My Cards
          </Button>
          <Button
            variant={activeCategory === 'liked' ? 'gradient' : 'ghost'}
            gradientColor={activeCategory === 'liked' ? 'blue' : undefined}
            onClick={() => setActiveCategory('liked')}
          >
            Liked
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <CardFilters />

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

      <section
        className={`grid ${activeView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}
      >
        {cards.map((card, idx) => (
          <CardItem key={card.id} card={card} gradientIndex={idx} />
        ))}

        {(isFetchingNextPage || !cards.length) &&
          Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={`skeleton-${i}`} />
          ))}
      </section>

      <div ref={loaderRef} />

      {isFetchingNextPage && (
        <div className="text-center py-4 text-gray-500">Loading more...</div>
      )}
    </>
  );
}
