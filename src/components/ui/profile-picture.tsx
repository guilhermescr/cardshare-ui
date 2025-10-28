'use client';

import Image from 'next/image';
import UploadProfilePictureButton from './upload-profile-picture-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Button } from './button';
import { httpRequest } from '@/utils/http.utils';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth';
import DeleteDialog from '../delete-dialog';
import { useState } from 'react';

interface MoreOptionsButtonProps {
  onRemove?: () => void;
}

const MoreOptionsButton = ({ onRemove }: MoreOptionsButtonProps) => {
  const { token } = useAuthStore();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updatePhoto = async () => {};

  const removePhoto = async () => {
    try {
      await httpRequest('/upload/profile-picture', {
        method: 'DELETE',
        token,
      });
      onRemove?.();
    } catch (error) {
      console.error('Error removing profile picture:', error);
      toast.error('Failed to remove profile picture. Please try again.');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white shadow-lg absolute -bottom-1 -right-1 py-4.5 rounded-full cursor-pointer hover:bg-gray-100 transition"
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-40">
          <DropdownMenuItem onClick={updatePhoto}>
            Update Photo
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Remove Photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog
        isOpen={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onDelete={removePhoto}
        isDeleting={isDeleting}
        title="Delete Profile Picture?"
        description="Are you sure you want to delete this profile picture? This action cannot be undone."
      />
    </>
  );
};

interface ProfilePictureProps {
  url: string | null;
  size?: 'small' | 'medium' | 'large';
  isOwnProfile?: boolean;
  className?: string;
  onUpload?: (imageUrl: string) => void;
  onRemove?: () => void;
}

const sizeMap = {
  small: 40,
  medium: 80,
  large: 120,
};

export default function ProfilePicture({
  url,
  size = 'medium',
  isOwnProfile = false,
  className = '',
  onUpload,
  onRemove,
}: ProfilePictureProps) {
  const dimension = sizeMap[size];

  return (
    <div
      className={`rounded-full bg-gray-200 shadow-lg relative ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {url ? (
        <>
          <Image
            src={url}
            alt="Profile Picture"
            width={dimension}
            height={dimension}
            className="rounded-full object-cover"
            priority
          />

          {isOwnProfile && onUpload && (
            <MoreOptionsButton onRemove={onRemove} />
          )}
        </>
      ) : (
        isOwnProfile &&
        onUpload && <UploadProfilePictureButton onUpload={onUpload} />
      )}
    </div>
  );
}
