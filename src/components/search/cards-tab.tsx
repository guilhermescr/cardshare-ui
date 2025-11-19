import Link from 'next/link';
import { CardDto } from '@/types/card.dto';
import GradientCardImage from '../cards/gradient-card-image';
import { User, Calendar, Heart, Tag, Loader2 } from 'lucide-react';
import { formatNotificationDate } from '@/utils/date-handlers.utils';
import GradientText from '../gradient-text';
import ProfilePicture from '../ui/profile-picture';

interface CardsTabProps {
  cardResults: CardDto[] | null;
  isSearching: boolean;
  onClose: () => void;
}

export default function CardsTab({
  cardResults,
  isSearching,
  onClose,
}: CardsTabProps) {
  const formatTags = (tags: string[]) => {
    if (tags.length === 0) return 'No tags';

    const displayedTags = tags.slice(0, 3).join(', ');
    return tags.length > 3
      ? `${displayedTags}, +${tags.length - 3} more`
      : displayedTags;
  };

  if (isSearching) {
    return (
      <div className="flex justify-center items-center h-28">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      {cardResults === null ? (
        <p className="text-gray-500 text-sm">Start typing to search...</p>
      ) : cardResults.length === 0 ? (
        <p className="text-gray-500 text-sm">No cards found.</p>
      ) : (
        <ul className="space-y-4">
          {cardResults.map((card) => (
            <li key={card.id}>
              <Link
                href={`/dashboard/${card.id}`}
                className="p-4 border rounded-lg shadow-sm bg-white block hover:brightness-98 hover:border-blue-400 transition"
                onClick={onClose}
              >
                <GradientCardImage gradient={card.gradient} size="tiny" />

                <div className="mt-3">
                  <GradientText className="font-semibold">
                    {card.title}
                  </GradientText>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {card.description}
                  </p>
                  <div className="text-sm text-gray-500 mt-3 space-y-1">
                    <div className="flex items-center gap-1 mb-4">
                      <ProfilePicture
                        url={card.author.profilePicture}
                        size="tiny"
                        className="mr-1"
                      />
                      By:
                      <span className="font-medium">
                        {card.author.username}
                      </span>
                    </div>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Created: {formatNotificationDate(card.createdAt)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Likes: {card.likes.length}
                    </p>
                    {card.tags.length > 0 && (
                      <p className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Tags: {formatTags(card.tags)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
