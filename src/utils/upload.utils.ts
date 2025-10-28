import { toast } from 'sonner';
import { API_URL } from '@/constants/api';

export async function handleCropComplete(
  croppedImage: File,
  token: string,
  onUpload: (imageUrl: string) => void
): Promise<void> {
  try {
    const formData = new FormData();
    formData.append('file', croppedImage);

    const response = await fetch(`${API_URL}/upload/profile-picture`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to upload profile picture');
    }

    const result = await response.json();
    toast.success('Profile picture updated successfully!');

    onUpload(result.url);
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    toast.error('Failed to upload profile picture. Please try again.');
  }
}
