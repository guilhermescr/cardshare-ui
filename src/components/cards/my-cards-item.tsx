'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Eye,
  Globe,
  Heart,
  Loader2,
  MessageCircle,
  Trash,
  Trash2,
} from 'lucide-react';

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
            <Dialog
              open={showDeleteConfirm}
              onOpenChange={setShowDeleteConfirm}
            >
              <DialogTrigger className="cursor-pointer border rounded-md py-1.5 px-2 transition-all duration-300 hover:bg-destructive group">
                <Trash2
                  className="transition-all duration-300 text-destructive group-hover:text-white"
                  size={19}
                />
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-destructive flex items-center gap-2 mb-2">
                    <Trash2 size={22} /> Delete Card?
                  </DialogTitle>

                  <DialogDescription>
                    Are you sure you want to delete this card? This action
                    cannot be undone. All comments, likes, and associated data
                    will be permanently removed.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <button
                    type="button"
                    className="cursor-pointer border rounded-md h-full px-4 py-2 transition-all duration-300 font-medium text-sm hover:bg-gray-50"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="cursor-pointer bg-destructive flex items-center gap-3.5 text-sm font-medium text-white rounded-md px-4 py-2 h-full hover:bg-red-800 transition active:scale-95"
                    onClick={deleteCard}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 size={20} className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash size={20} />
                    )}{' '}
                    Delete Card
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </li>
  );
}
