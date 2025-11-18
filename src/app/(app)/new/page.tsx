'use client';

import { useForm } from 'react-hook-form';
import { Sparkles } from 'lucide-react';
import VisibilitySettings from './visibility-settings';
import TagsSection from './tags-section';
import VisualStyleSection from './visual-style-section';
import MediaSection from './media-section';
import PublishingOptions from './publishing-options';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CardFormType,
  cardFormSchema,
} from '../../../components/cards/form/card-form.schema';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GeneratedCardResponse } from '@/types/card.dto';
import { httpRequest } from '@/utils/http.utils';
import TitleInput from '@/components/cards/form/title-input';
import DescriptionInput from '@/components/cards/form/description-input';
import CategorySelect from '@/components/cards/form/category-select';
import CardFormHeader from '@/components/cards/form/header';
import CardPreview from '@/components/cards/form/card-preview';

export default function CreateCardPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  const { control, handleSubmit, watch, setValue } = useForm<CardFormType>({
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

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCardPreview, setShowCardPreview] = useState(false);

  const cardPreviewData = {
    title: watch('title'),
    description: watch('description'),
    category: watch('category'),
    selectedGradient: watch('selectedGradient'),
    tags: watch('tags'),
    mediaFiles: watch('mediaFiles'),
  };

  const handleGenerateCard = async () => {
    if (!token) {
      toast.error('You must be logged in to generate a card.');
      return;
    }

    try {
      setIsGenerating(true);

      const generatedCard = await httpRequest<GeneratedCardResponse>(
        '/cards/generate',
        {
          method: 'POST',
          token,
        }
      );

      setValue('title', generatedCard.title);
      setValue('description', generatedCard.description);
      setValue('category', generatedCard.category);
      setValue('selectedGradient', generatedCard.gradient);
      setValue('selectedVisibility', generatedCard.visibility);
      setValue('allowComments', generatedCard.allowComments);
      setValue(
        'tags',
        generatedCard.tags.map((tag) =>
          tag.startsWith('#') ? tag.slice(1) : tag
        )
      );

      toast.success(
        'Card generated! Review and customize it before publishing.'
      );
    } catch (error) {
      console.error('Error generating card:', error);
      toast.error('Failed to generate card.');
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: CardFormType) => {
    if (!token) {
      toast.error('You must be logged in to create a card.');
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

    data.mediaFiles?.forEach((file) => {
      formData.append('files', file.file);
    });

    try {
      const base = process.env.NEXT_PUBLIC_API_URL!;
      const url = new URL('/cards', base);
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 503) {
        toast.error(
          'AI service is currently unavailable. Please try again later.'
        );
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes('File too large')) {
          throw new Error('File too large');
        }
        throw new Error('Failed to update card');
      }

      const createdCard = await response.json();

      toast.success('Card created successfully!');
      router.push(`/dashboard/${createdCard.id}`);
    } catch (error) {
      console.error('Error updating card:', error);
      if (error instanceof Error && error.message === 'File too large') {
        toast.error(
          'One or more files are too large. Please upload smaller files.'
        );
      } else {
        toast.error('Failed to update card.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardFormHeader
        title="Create New Card"
        backLink="/dashboard"
        onSubmit={handleSubmit(onSubmit)}
        isSaving={isSaving}
        onPreviewToggle={() => setShowCardPreview(!showCardPreview)}
        onGenerate={handleGenerateCard}
        isGenerating={isGenerating}
        showGenerateButton
        isPreviewing={showCardPreview}
      />

      <section className="flex flex-col gap-6 lg:flex-row">
        <section className="flex-2 p-6 bg-white shadow-md rounded-lg space-y-4">
          {showCardPreview ? (
            <CardPreview card={cardPreviewData} />
          ) : (
            <>
              <div className="mb-6">
                <h2 className="flex items-center gap-2 font-medium">
                  <Sparkles size={20} /> Card Details
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  Fill in the information for your card
                </p>
              </div>

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
