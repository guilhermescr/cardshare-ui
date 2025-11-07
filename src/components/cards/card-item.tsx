import {
  Ellipsis,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  User,
} from 'lucide-react';
import { Button } from '../ui/button';
import { CardDetailsDto, CardDto } from '@/types/card.dto';
import { capitalizeFirstLetter } from '@/utils/string.utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import GradientCardImage from './gradient-card-image';
import { toast } from 'sonner';
import { shareCard } from '@/utils/share.utils';
import { useState } from 'react';
import { httpRequest } from '@/utils/http.utils';
import { useAuthStore } from '@/stores/auth';

function CardMoreOptionsButton() {
  return (
    <div className="invisible group-hover:visible">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-40">
          <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={() => {}}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface CardItemProps {
  card: CardDto;
  onLikeToggle?: (updatedCard: CardDto) => void;
}

export default function CardItem({ card, onLikeToggle }: CardItemProps) {
  const router = useRouter();

  const { token } = useAuthStore();

  const [isLiking, setIsLiking] = useState(false);

  const handleCardClick = () => {
    router.push(`/dashboard/${card.id}`);
  };

  const handleCardLike = async () => {
    try {
      setIsLiking(true);

      const updatedCard = await httpRequest<CardDetailsDto>(
        `/cards/${card.id}/like`,
        {
          method: 'POST',
          token,
        }
      );

      if (onLikeToggle) {
        onLikeToggle(updatedCard);
      }
    } catch (error) {
      console.error('Error toggling like status:', error);
      toast.error('Failed to update like status.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleCardShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    shareCard(
      card.title,
      card.description,
      `${window.location.origin}/dashboard/${card.id}`
    );
  };

  return (
    <section
      className="bg-white shadow rounded-md p-6 cursor-pointer transition-transform ease-out duration-300 hover:scale-102 hover:shadow-lg group"
      onClick={handleCardClick}
    >
      <GradientCardImage gradient={card.gradient} />

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg mt-5 mb-4 group-hover:text-blue-600">
          {card.title}
        </h3>

        <CardMoreOptionsButton />
      </div>
      <p className="text-gray-600 text-sm line-clamp-1 pr-6 mb-8">
        {card.description}
      </p>

      <div className="flex items-center gap-3 text-sm">
        <User size={16} />{' '}
        <span className="text-gray-700">{card.author.username}</span>{' '}
        <span className="text-gray-400">•</span>{' '}
        <span className="text-gray-400">2 hours ago</span>
      </div>

      <div className="text-xs flex flex-wrap items-center gap-2 my-4">
        <span className="bg-gray-100 rounded-lg py-1 px-2">#nature</span>
        <span className="bg-gray-100 rounded-lg py-1 px-2">#sunset</span>
        <span className="bg-gray-100 rounded-lg py-1 px-2">#photography</span>
      </div>

      <div className="flex gap-4 items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <Eye size={16} /> 156
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle size={16} /> 8
          </span>
        </div>

        <span
          className={`${
            card.visibility === 'public'
              ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
              : 'bg-gray-100 text-black'
          } py-1 px-3 rounded-xl font-medium`}
        >
          {capitalizeFirstLetter(card.visibility)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="ghost"
          className={`hover:bg-red-100 duration-300 ${
            card.isLiked ? 'text-red-600' : 'text-gray-600'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleCardLike();
          }}
          disabled={isLiking}
        >
          <Heart /> {card.likes.length}
        </Button>

        <Button
          variant="ghost"
          className="hover:bg-blue-100 hover:text-blue-600 duration-300"
          onClick={handleCardShare}
        >
          <Share2 /> Share
        </Button>
      </div>
    </section>
  );
}
