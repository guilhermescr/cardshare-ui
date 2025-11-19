'use client';

import { useState } from 'react';
import {
  Bookmark,
  Eye,
  Globe,
  Heart,
  MessageCircle,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import DeleteDialog from '@/components/delete-dialog';
import { toast } from 'sonner';
import { httpRequest } from '@/utils/http.utils';
import { useAuthStore } from '@/stores/auth';
import { CardDto } from '@/types/card.dto';
import GradientCardImage from './gradient-card-image';

interface MyCardsItemProps {
  isOwnProfile: boolean;
  card: CardDto;
  onDelete: () => void;
}

export default function MyCardsItem({
  card,
  isOwnProfile = false,
  onDelete,
}: MyCardsItemProps) {
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
    <li className="border border-gray-100 rounded-md p-4 flex flex-col gap-2">
      <GradientCardImage gradient={card.gradient} size="small" />

      <div>
        <h3 className="font-medium text-gray-700 line-clamp-1 mt-1">
          {card.title}
        </h3>

        <div className="flex items-center gap-4 text-sm my-3">
          <span className="flex items-center gap-1 text-gray-700">
            <Bookmark size={16} /> {card.favorites.length}
          </span>

          <span className="flex items-center gap-1 text-gray-700">
            <Heart size={16} /> {card.likes.length}
          </span>

          <span className="flex items-center gap-1 text-gray-700">
            <MessageCircle size={16} /> {card.comments.length}
          </span>

          <span className="text-gray-700">2 days ago</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-auto">
        {isOwnProfile && (
          <span className="flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-green-500 to-teal-400 text-white px-2 py-1 rounded-md">
            <Globe className="text-teal-700" size={14} /> Public
          </span>
        )}

        <div className="flex items-center gap-2 text-sm">
          {isOwnProfile && (
            <Link href={`/dashboard/${card.id}/edit`}>
              <button
                type="button"
                className="cursor-pointer border rounded-md py-1.5 px-3.5 font-medium transition-all duration-300 hover:bg-gray-50"
              >
                Edit
              </button>
            </Link>
          )}

          <Link href={`/dashboard/${card.id}`}>
            <button
              type="button"
              className="cursor-pointer border rounded-md py-1.5 px-3.5 font-medium transition-all duration-300 hover:bg-gray-50"
            >
              {isOwnProfile ? 'View' : 'View Card'}
            </button>
          </Link>

          {isOwnProfile && (
            <div>
              <button
                type="button"
                className="cursor-pointer border rounded-md py-1.5 px-2 transition-all duration-300 hover:bg-destructive group"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2
                  className="transition-all duration-300 text-destructive group-hover:text-white"
                  size={19}
                />
              </button>

              <DeleteDialog
                isOpen={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
                onDelete={deleteCard}
                isDeleting={isDeleting}
                title="Delete Card?"
                description="Are you sure you want to delete this card? This action cannot be undone. All comments, likes, and associated data will be permanently removed."
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
