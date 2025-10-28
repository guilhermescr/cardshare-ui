'use client';

import Image from 'next/image';
import UploadProfilePictureButton from './upload-profile-picture-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { EllipsisVertical, Loader2 } from 'lucide-react';
import { Button } from './button';
import { httpRequest } from '@/utils/http.utils';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth';
import DeleteDialog from '../delete-dialog';
import { useRef, useState } from 'react';
import ImageCropDialog from './image-crop-dialog';
import { handleCropComplete } from '@/utils/upload.utils';

interface MoreOptionsButtonProps {
  onUpload?: (imageUrl: string) => void;
  onRemove?: () => void;
}

const MoreOptionsButton = ({ onUpload, onRemove }: MoreOptionsButtonProps) => {
  const { token } = useAuthStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setIsCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleCropCompleteWrapper = async (croppedImage: File) => {
    if (token) {
      setIsUploading(true);
      await handleCropComplete(croppedImage, token, (newUrl) => {
        if (onUpload) {
          onUpload(newUrl);
        }
      });
      setIsUploading(false);
      setIsCropDialogOpen(false);
      setImageSrc(null);
    }
  };

  const removePhoto = async () => {
    try {
      setIsDeleting(true);

      await httpRequest('/upload/profile-picture', {
        method: 'DELETE',
        token,
      });
      onRemove?.();
    } catch (error) {
      console.error('Error removing profile picture:', error);
      toast.error('Failed to remove profile picture. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white shadow-lg absolute -bottom-1 -right-1 py-4.5 rounded-full cursor-pointer hover:bg-gray-100 transition disabled:opacity-100"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <EllipsisVertical size={16} />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-40">
          <DropdownMenuItem onClick={handleUpdatePhotoClick}>
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

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {imageSrc && (
        <ImageCropDialog
          isOpen={isCropDialogOpen}
          onClose={() => {
            setIsCropDialogOpen(false);
            setImageSrc(null);
          }}
          imageSrc={imageSrc}
          onCropComplete={handleCropCompleteWrapper}
        />
      )}

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

  if (!url) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-[#E7E7E7] relative ${className}`}
        style={{
          width: dimension,
          height: dimension,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[#B3B3B3]"
          style={{ width: dimension / 2, height: dimension / 2 }}
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        {isOwnProfile && onUpload && (
          <UploadProfilePictureButton onUpload={onUpload} />
        )}
      </div>
    );
  }

  return (
    <div
      className={`rounded-full bg-gray-200 shadow-lg relative ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      <Image
        src={url}
        alt="Profile Picture"
        width={dimension}
        height={dimension}
        className="rounded-full object-cover"
        priority
      />

      {isOwnProfile && onUpload && (
        <MoreOptionsButton onUpload={onUpload} onRemove={onRemove} />
      )}
    </div>
  );
}
