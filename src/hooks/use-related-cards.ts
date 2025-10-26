import { useEffect, useState } from 'react';
import { httpRequest } from '@/utils/http.utils';
import { RelatedCard } from '@/types/card.dto';

export function useRelatedCards(cardId: string, token: string | null) {
  const [relatedCards, setRelatedCards] = useState<RelatedCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedCards = async () => {
      try {
        setLoading(true);
        const data = await httpRequest<RelatedCard[]>(
          `/cards/${cardId}/related`,
          {
            method: 'GET',
            token,
          }
        );
        setRelatedCards(data);
      } catch (err) {
        setError('Failed to fetch related cards.');
      } finally {
        setLoading(false);
      }
    };

    if (cardId && token) {
      fetchRelatedCards();
    }
  }, [cardId, token]);

  return { relatedCards, loading, error };
}
