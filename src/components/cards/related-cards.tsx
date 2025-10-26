import Link from 'next/link';
import GradientCardImage from '@/components/cards/gradient-card-image';
import { useRelatedCards } from '@/hooks/use-related-cards';

interface RelatedCardsProps {
  cardId: string;
  token: string | null;
}

export default function RelatedCards({ cardId, token }: RelatedCardsProps) {
  const {
    relatedCards,
    // loading: relatedLoading,
    // error: relatedError,
  } = useRelatedCards(cardId, token);

  return (
    <div className="bg-white p-5 shadow-md rounded-lg">
      <h2 className="font-medium text-lg mb-7">Related Cards</h2>

      {relatedCards.length === 0 ? (
        <div>
          <GradientCardImage
            gradient="from-gray-300 to-gray-400"
            size="small"
          />
          <p className="mt-4 text-sm text-gray-600">No related cards found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {relatedCards.map((card) => (
            <li key={card.id} className="flex items-start gap-3">
              <Link
                href={`/dashboard/${card.id}`}
                className="flex items-start gap-3"
              >
                <div>
                  <GradientCardImage
                    gradient="from-orange-500 to-pink-500"
                    size="tiny"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium">{card.title}</h3>
                  <p className="text-xs text-gray-600">
                    by {card.ownerUsername}.
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
