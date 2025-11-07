'use client';

import { Button } from '@/components/ui/button';
import { CardDetailsDto } from '@/types/card.dto';
import { httpRequest } from '@/utils/http.utils';
import { Heart, Loader2 } from 'lucide-react';
import { useState } from 'react';

type LikeButtonProps = {
  token: string | null;
  card: CardDetailsDto | null;
  setCard: (card: CardDetailsDto) => void;
};

export default function LikeButton({ token, card, setCard }: LikeButtonProps) {
  const [loading, setLoading] = useState(false);

  if (!token || !card) {
    return null;
  }

  const handleClick = async () => {
    try {
      setLoading(true);

      const updatedCard = await httpRequest<CardDetailsDto>(
        `/cards/${card.id}/like`,
        {
          method: 'POST',
          token,
        }
      );
      setCard(updatedCard);
    } catch (error) {
      console.error('Error toggling like status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={card.isLiked ? 'gradient' : 'outline'}
      gradientColor={card.isLiked ? 'pink' : 'none'}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="mr-2 animate-spin" />
      ) : card.isLiked ? (
        <Heart className="mr-2 fill-current" />
      ) : (
        <Heart className="mr-2" />
      )}
      {card.likes.length}
    </Button>
  );
}
