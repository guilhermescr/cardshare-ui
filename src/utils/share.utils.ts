import { toast } from 'sonner';

export async function shareProfile(
  username: string,
  description: string,
  url: string
) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: username,
        text: description,
        url,
      });
      toast.success('Profile shared successfully!');
    } catch (error) {
      console.error('Error sharing profile:', error);
      toast.error('Failed to share the profile.');
    }
  } else {
    toast.error('Sharing is not supported in this browser.');
  }
}

export async function shareCard(
  title: string,
  description: string,
  url: string
) {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: description,
        url,
      });
      toast.success('Card shared successfully!');
    } catch (error) {
      console.error('Error sharing card:', error);
      toast.error('Failed to share the card.');
    }
  } else {
    toast.error('Sharing is not supported in this browser.');
  }
}
