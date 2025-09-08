'use client';

import { Button } from '@/components/ui/button';
import { Filter, Grid, List } from 'lucide-react';
import { useState } from 'react';
import CardFilters from './card-filters';
import CardItem from '@/components/cards/card-item';
import { CardDto } from '@/types/card.dto';

export default function CardGallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'my' | 'liked'>(
    'all'
  );
  const [activeFilter, setActiveFilter] = useState<
    'none' | 'most-liked' | 'recent'
  >('none');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [cards, setCards] = useState<CardDto[]>([
    {
      id: '1',
      title: 'Beautiful Sunset',
      description:
        'A stunning sunset over the mountains captured during my recent hiking trip.',
      ownerUsername: 'John Doe',
      visibility: 'public',
      likes: [
        'user1',
        'user2',
        'user3',
        'user4',
        'user5',
        'user6',
        'user7',
        'user8',
      ],
      favorites: ['user1', 'user4', 'user5', 'user6'],
      createdAt: '2025-09-08T00:00:00Z',
      updatedAt: '2025-09-08T00:00:00Z',
    },
    {
      id: '2',
      title: 'Recipe Collection',
      description:
        'My favorite recipes from around the world, carefully curated over years.',
      ownerUsername: 'Jane Smith',
      visibility: 'public',
      likes: ['user1', 'user2'],
      favorites: ['user1', 'user3', 'user5', 'user9'],
      createdAt: '2025-09-07T00:00:00Z',
      updatedAt: '2025-09-07T00:00:00Z',
    },
    {
      id: '3',
      title: 'Travel Memories',
      description:
        'Photos and stories from my recent trip to Japan - an unforgettable experience.',
      ownerUsername: 'Mike Johnson',
      visibility: 'private',
      likes: ['user1'],
      favorites: ['user3', 'user7', 'user10', 'user14'],
      createdAt: '2025-09-05T00:00:00Z',
      updatedAt: '2025-09-05T00:00:00Z',
    },
    {
      id: '4',
      title: 'Design Inspiration',
      description:
        'A collection of modern design patterns and color schemes for web projects.',
      ownerUsername: 'Sarah Wilson',
      visibility: 'public',
      likes: ['user1', 'user2', 'user3', 'user4'],
      favorites: ['user1', 'user4', 'user5', 'user6'],
      createdAt: '2025-09-03T00:00:00Z',
      updatedAt: '2025-09-03T00:00:00Z',
    },
  ]);

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
      </section>
    </>
  );
}
