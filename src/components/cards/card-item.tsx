import {
  Bookmark,
  Ellipsis,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  User,
} from 'lucide-react';
import { Button } from '../ui/button';
import { CardDto } from '@/types/card.dto';
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
import DeleteDialog from '../delete-dialog';
import { useIsOwnProfile } from '@/hooks/use-is-own-profile';
import ProfilePicture from '../ui/profile-picture';

interface CardMoreOptionsButtonProps {
  card: CardDto;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: () => void;
}

function CardMoreOptionsButton({
  card,
  onEdit,
  onDelete,
}: CardMoreOptionsButtonProps) {
  const { token } = useAuthStore();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCard = async () => {
    try {
      setIsDeleting(true);
      await httpRequest(`/cards/${card.id}`, {
        method: 'DELETE',
        token,
      });

      toast.success('Card deleted successfully.');
      onDelete();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete the card.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div
      className="invisible group-hover:visible"
      onClick={(e) => e.stopPropagation()}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-40">
          <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog
        isOpen={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onDelete={deleteCard}
        isDeleting={isDeleting}
        title="Delete Card?"
        description="Are you sure you want to delete this card? This action cannot be undone. All comments, likes, and associated data will be permanently removed."
      />
    </div>
  );
}

interface CardItemProps {
  card: CardDto;
  onDelete: () => void;
  onLikeToggle?: (updatedCard: CardDto) => void;
}

export default function CardItem({
  card,
  onLikeToggle,
  onDelete,
}: CardItemProps) {
  const router = useRouter();
  const { token } = useAuthStore();
  const isOwnProfile = useIsOwnProfile(card.author.username);

  const [isLiking, setIsLiking] = useState(false);
  const MAX_TAGS_TO_SHOW = 5;

  const handleCardClick = () => {
    router.push(`/dashboard/${card.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/dashboard/${card.id}/edit`);
  };

  const handleCardLike = async () => {
    try {
      setIsLiking(true);

      const updatedCard = await httpRequest<CardDto>(`/cards/${card.id}/like`, {
        method: 'POST',
        token,
      });

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
      className="bg-white shadow rounded-md p-6 flex flex-col cursor-pointer transition-transform ease-out duration-300 hover:scale-102 hover:shadow-lg group"
      onClick={handleCardClick}
    >
      <GradientCardImage gradient={card.gradient} />

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg mt-5 mb-4 group-hover:text-blue-600">
          {card.title}
        </h3>

        {isOwnProfile && (
          <CardMoreOptionsButton
            card={card}
            onEdit={handleEditClick}
            onDelete={onDelete}
          />
        )}
      </div>
      <p className="text-gray-600 text-sm line-clamp-1 pr-6 mb-8">
        {card.description}
      </p>

      <div className="flex items-center gap-2 text-sm">
        {card.author.profilePicture ? (
          <ProfilePicture url={card.author.profilePicture} size="tiny" />
        ) : (
          <User size={16} />
        )}{' '}
        <span className="text-gray-700">{card.author.username}</span>{' '}
        <span className="text-gray-400">•</span>{' '}
        <span className="text-gray-400">2 hours ago</span>
      </div>

      {card.tags.length > 0 && (
        <div className="text-xs flex flex-wrap items-center gap-2 my-4">
          {card.tags
            .map((tag) => (
              <span
                key={`${card.id}-${tag}`}
                className="bg-gray-100 rounded-lg py-1 px-2"
              >
                #{tag}
              </span>
            ))
            .slice(0, MAX_TAGS_TO_SHOW)}
          {card.tags.length > MAX_TAGS_TO_SHOW && (
            <span className="text-gray-500">
              +{card.tags.length - MAX_TAGS_TO_SHOW} more
            </span>
          )}
        </div>
      )}

      <div className="flex gap-4 items-center justify-between text-xs mt-auto mb-6">
        <div className="flex items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <MessageCircle size={16} /> {card.comments.length}
          </span>

          <span className="flex items-center gap-1">
            <Bookmark size={17} /> {card.favorites.length}
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

      <div className="flex items-center justify-between">
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
