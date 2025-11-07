'use client';

import { Button } from '@/components/ui/button';
import { CardDetailsDto } from '@/types/card.dto';
import { httpRequest } from '@/utils/http.utils';
import { Bookmark, Loader2 } from 'lucide-react';
import { useState } from 'react';

type FavoriteButtonProps = {
  token: string | null;
  card: CardDetailsDto | null;
  setCard: (card: CardDetailsDto) => void;
};

export default function FavoriteButton({
  token,
  card,
  setCard,
}: FavoriteButtonProps) {
  const [loading, setLoading] = useState(false);

  if (!token || !card) {
    return null;
  }

  const handleClick = async () => {
    try {
      setLoading(true);

      const updatedCard = await httpRequest<CardDetailsDto>(
        `/cards/${card.id}/favorite`,
        {
          method: 'POST',
          token,
        }
      );
      setCard(updatedCard);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={card.isFavorited ? 'gradient' : 'outline'}
      gradientColor={card.isFavorited ? 'yellow' : 'none'}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 animate-spin" /> Updating...
        </>
      ) : card.isFavorited ? (
        <>
          <Bookmark className="mr-2 fill-current" /> Saved
        </>
      ) : (
        <>
          <Bookmark className="mr-2" /> Save
        </>
      )}
    </Button>
  );
}
