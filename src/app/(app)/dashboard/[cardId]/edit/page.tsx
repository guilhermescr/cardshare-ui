'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  CardFormType,
  cardFormSchema,
} from '@/components/cards/form/card-form.schema';
import MediaSection from '@/app/(app)/new/media-section';
import PublishingOptions from '@/app/(app)/new/publishing-options';
import TagsSection from '@/app/(app)/new/tags-section';
import VisibilitySettings from '@/app/(app)/new/visibility-settings';
import VisualStyleSection from '@/app/(app)/new/visual-style-section';
import { useAuthStore } from '@/stores/auth';
import { useCardDetails } from '@/hooks/use-card-details';
import { httpRequest } from '@/utils/http.utils';
import { useEffect, useState } from 'react';
import TitleInput from '@/components/cards/form/title-input';
import DescriptionInput from '@/components/cards/form/description-input';
import CategorySelect from '@/components/cards/form/category-select';
import CardFormHeader from '@/components/cards/form/header';
import CardPreview from '@/components/cards/form/card-preview';

export default function EditCardPage() {
  const router = useRouter();
  const { cardId } = useParams();
  const { token } = useAuthStore();

  const { cardDetails, loading, error } = useCardDetails(
    cardId as string,
    token
  );

  const { control, handleSubmit, watch, setValue, reset } =
    useForm<CardFormType>({
      defaultValues: {
        title: '',
        description: '',
        category: '',
        mediaFiles: [],
        selectedGradient: 'aurora',
        tags: [],
        selectedVisibility: 'public',
        allowComments: true,
        allowDownloads: false,
      },
      resolver: zodResolver(cardFormSchema),
    });

  const [showCardPreview, setShowCardPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const cardPreviewData = {
    title: watch('title'),
    description: watch('description'),
    category: watch('category'),
    selectedGradient: watch('selectedGradient'),
    tags: watch('tags'),
    mediaFiles: watch('mediaFiles'),
  };

  useEffect(() => {
    if (cardDetails) {
      reset({
        title: cardDetails.title,
        description: cardDetails.description,
        category: cardDetails.category,
        mediaFiles: cardDetails.mediaUrls.map((url) => ({
          type: url.endsWith('.mp4') ? 'video' : 'image',
          media: url,
          file: null,
        })),
        selectedGradient: cardDetails.gradient,
        tags: cardDetails.tags || [],
        selectedVisibility: cardDetails.visibility,
        allowComments: cardDetails.allowComments,
        allowDownloads: cardDetails.allowDownloads,
      });
    }
  }, [cardDetails, reset]);

  const onSubmit = async (data: CardFormType) => {
    if (!token) {
      toast.error('You must be logged in to edit a card.');
      return;
    }

    setIsSaving(true);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('visibility', data.selectedVisibility);
    formData.append('gradient', data.selectedGradient);
    formData.append('allowComments', String(data.allowComments));
    formData.append('allowDownloads', String(data.allowDownloads));

    data.tags?.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    if (data.mediaFiles && data.mediaFiles.length > 0) {
      const newMedia = data.mediaFiles.filter((file) => file.file !== null);

      newMedia.forEach((file) => {
        formData.append('files', file.file);
      });
    }

    try {
      const base = process.env.NEXT_PUBLIC_API_URL!;
      const url = new URL(`/cards/${cardId}`, base);
      const response = await fetch(url.toString(), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update card');
      }

      toast.success('Card updated successfully!');
      router.push(`/dashboard/${cardId}`);
    } catch (error) {
      console.error('Error updating card:', error);
      toast.error('Failed to update card.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardFormHeader
        title="Edit Card"
        backLink={`/dashboard/${cardId}`}
        onSubmit={handleSubmit(onSubmit)}
        isSaving={isSaving}
        onPreviewToggle={() => setShowCardPreview(!showCardPreview)}
        isPreviewing={showCardPreview}
      />

      <section className="flex flex-col gap-6 lg:flex-row">
        <section className="flex-2 p-6 bg-white shadow-md rounded-lg space-y-4">
          {showCardPreview && cardDetails ? (
            <CardPreview card={cardPreviewData} />
          ) : (
            <>
              <TitleInput control={control} />

              <DescriptionInput control={control} />

              <CategorySelect control={control} />

              <MediaSection watch={watch} setValue={setValue} />

              <VisualStyleSection
                selectedGradient={watch('selectedGradient') || ''}
                setSelectedGradient={(gradient) =>
                  setValue('selectedGradient', gradient)
                }
              />

              <TagsSection
                tags={watch('tags') || []}
                setTags={(tags) => setValue('tags', tags)}
              />
            </>
          )}
        </section>

        <aside className="flex-1 space-y-6">
          <VisibilitySettings watch={watch} setValue={setValue} />

          <PublishingOptions watch={watch} setValue={setValue} />
        </aside>
      </section>
    </form>
  );
}
