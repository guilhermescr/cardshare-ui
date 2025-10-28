'use client';

import { Camera, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import ImageCropDialog from './image-crop-dialog';
import { toast } from 'sonner';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/stores/auth';
import { handleCropComplete } from '@/utils/upload.utils';

interface UploadProfilePictureButtonProps {
  onUpload: (imageUrl: string) => void;
}

export default function UploadProfilePictureButton({
  onUpload,
}: UploadProfilePictureButtonProps) {
  const { token } = useAuthStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    fileInputRef.current?.click();
  };

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

  const handleCropCompleteWrapper = async (croppedImage: File) => {
    if (token) {
      setIsUploading(true);
      await handleCropComplete(croppedImage, token, onUpload);
      setIsUploading(false);
      setIsCropDialogOpen(false);
      setImageSrc(null);
    }
  };

  const handleCloseDialog = () => {
    setIsCropDialogOpen(false);
    setImageSrc(null);
  };

  return (
    <>
      <button
        type="button"
        className="bg-white shadow-lg absolute -bottom-1 -right-1 p-3 rounded-full cursor-pointer hover:bg-gray-100 transition"
        onClick={handleButtonClick}
        disabled={isUploading}
      >
        {isUploading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Camera size={16} />
        )}
      </button>

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
          onClose={handleCloseDialog}
          imageSrc={imageSrc}
          onCropComplete={handleCropCompleteWrapper}
        />
      )}
    </>
  );
}
