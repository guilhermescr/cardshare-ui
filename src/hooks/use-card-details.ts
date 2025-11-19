import { useEffect, useState } from 'react';
import { CardDto } from '@/types/card.dto';
import { httpRequest } from '@/utils/http.utils';
import { toast } from 'sonner';

export function useCardDetails(
  cardId: string,
  token: string | null,
  userId?: string,
  isEdit?: boolean
) {
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

          if (userId && data.author.id) {
            const isOwner = data.author.id === userId;
            const isAllowed =
              (data.visibility === 'public' && !isOwner && !isEdit) || isOwner;

            if (!isAllowed) {
              throw new Error(
                `You do not have permission to ${isEdit ? 'edit' : 'access'} this card.`
              );
            }
          }

          setCardDetails(data);
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message);
            setError(err.message);
          } else {
            setError('Error fetching card details!');
          }

          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCardDetails();
    }
  }, [cardId, token, userId, isEdit]);

  return { cardDetails, setCardDetails, loading, error };
}
