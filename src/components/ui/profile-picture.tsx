'use client';

import Image from 'next/image';
import UploadProfilePictureButton from './upload-profile-picture-button';

interface ProfilePictureProps {
  url: string | null;
  size?: 'small' | 'medium' | 'large';
  isOwnProfile?: boolean;
  onUpload?: (imageUrl: string) => void;
  className?: string;
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
  onUpload,
  className = '',
}: ProfilePictureProps) {
  const dimension = sizeMap[size];

  return (
    <div
      className={`rounded-full bg-gray-200 shadow-lg relative ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {url ? (
        <Image
          src={url}
          alt="Profile Picture"
          width={dimension}
          height={dimension}
          className="rounded-full object-cover"
          priority
        />
      ) : (
        isOwnProfile &&
        onUpload && <UploadProfilePictureButton onUpload={onUpload} />
      )}
    </div>
  );
}
