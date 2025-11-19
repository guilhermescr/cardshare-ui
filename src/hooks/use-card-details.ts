import { useEffect, useState } from 'react';
import { CardDto } from '@/types/card.dto';
import { httpRequest } from '@/utils/http.utils';

export function useCardDetails(cardId: string, token: string | null) {
  const [cardDetails, setCardDetails] = useState<CardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cardId && token) {
      const fetchCardDetails = async () => {
        try {
          setLoading(true);
          const data = await httpRequest<CardDto>(`/cards/${cardId}`, {
            token,
          });
          setCardDetails(data);
        } catch (err) {
          setError('Error fetching card details!');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCardDetails();
    }
  }, [cardId, token]);

  return { cardDetails, setCardDetails, loading, error };
}
