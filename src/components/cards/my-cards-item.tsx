'use client';

import { useState } from 'react';
import { Eye, Globe, Heart, MessageCircle, Trash2 } from 'lucide-react';
import DeleteDialog from '@/components/delete-dialog';

interface MyCardsItemProps {
  isOwnProfile: boolean;
}

export default function MyCardsItem({
  isOwnProfile = false,
}: MyCardsItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCard = async () => {
    setIsDeleting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsDeleting(false);
    setShowDeleteConfirm(false);
  };

  return (
    <li className="border border-gray-100 rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <div>{/* Card Image */}</div>

        <div>
          <h3 className="font-medium mb-2">Beautiful Sunset</h3>

          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-gray-700">
              <Eye size={16} /> 156
            </span>

            <span className="flex items-center gap-1 text-gray-700">
              <Heart size={16} /> 24
            </span>

            <span className="flex items-center gap-1 text-gray-700">
              <MessageCircle size={16} /> 8
            </span>

            <span className="text-gray-700">2 days ago</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {isOwnProfile && (
          <span className="flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-green-500 to-teal-400 text-white px-2 py-1 rounded-md">
            <Globe className="text-teal-700" size={14} /> Public
          </span>
        )}

        <div className="flex items-center gap-2 text-sm">
          {isOwnProfile && (
            <button
              type="button"
              className="cursor-pointer border rounded-md py-1.5 px-3.5 font-medium transition-all duration-300 hover:bg-gray-50"
            >
              Edit
            </button>
          )}

          <button
            type="button"
            className="cursor-pointer border rounded-md py-1.5 px-3.5 font-medium transition-all duration-300 hover:bg-gray-50"
          >
            {isOwnProfile ? 'View' : 'View Card'}
          </button>

          {isOwnProfile && (
            <>
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
            </>
          )}
        </div>
      </div>
    </li>
  );
}
