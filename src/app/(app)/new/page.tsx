'use client';

import { useForm, Controller } from 'react-hook-form';
import GradientText from '@/components/gradient-text';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  Eye,
  Loader2,
  MoveLeft,
  Save,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import VisibilitySettings from './visibility-settings';
import TagsSection from './tags-section';
import VisualStyleSection from './visual-style-section';
import MediaSection from './media-section';
import PublishingOptions from './publishing-options';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCardFormType, createCardSchema } from './create-card.schema';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '@/components/error-message';
import { GeneratedCardResponse } from '@/types/card.dto';
import { httpRequest } from '@/utils/http.utils';

export default function CreateCardPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  const { control, handleSubmit, watch, setValue } =
    useForm<CreateCardFormType>({
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
      resolver: zodResolver(createCardSchema),
    });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      setValue('tags', generatedCard.tags);

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

  const onSubmit = async (data: CreateCardFormType) => {
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
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('gradient', data.selectedGradient);
    formData.append('allowComments', String(data.allowComments));
    formData.append('allowDownloads', String(data.allowDownloads));

    if (data.mediaFiles && data.mediaFiles.length > 0) {
      data.mediaFiles.forEach((file) => {
        formData.append('files', file);
      });
    }

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

      if (!response.ok) {
        throw new Error('Failed to create card');
      }

      const createdCard = await response.json();

      toast.success('Card created successfully!');
      router.push(`/dashboard/${createdCard.id}`);
    } catch (error) {
      console.error('Error creating card:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col items-start md:flex-row md:items-center gap-4">
          <Button variant="ghost" className="md:mb-2" asChild>
            <Link href="/dashboard">
              <MoveLeft className="mr-2" /> Back
            </Link>
          </Button>

          <div>
            <h1 className="text-3xl font-bold">
              <GradientText>Create New Card</GradientText>
            </h1>
            <p className="text-gray-700">
              Share your amazing content with the world
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline">
            <Eye className="mr-2" /> Preview
          </Button>

          <Button
            variant="outline"
            onClick={handleGenerateCard}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <svg
                fill="currentColor"
                fillRule="evenodd"
                height="1em"
                viewBox="0 0 24 24"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="blueGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="20%" stopColor="#4f46e5" />
                    <stop offset="80%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <title>Gemini</title>
                <path
                  d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
                  fill="url(#blueGradient)"
                ></path>
              </svg>
            )}
            Generate Card
          </Button>

          <Button
            variant="gradient"
            gradientColor="blue"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <Save className="mr-2" />
            )}{' '}
            Publish Card
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6 lg:flex-row">
        <section className="flex-2 p-6 bg-white shadow-md rounded-lg space-y-4">
          <div className="mb-6">
            <h2 className="flex items-center gap-2 font-medium">
              <Sparkles size={20} /> Card Details
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Fill in the information for your card
            </p>
          </div>

          <section>
            <h3 className="text-sm font-medium mb-1">Title *</h3>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className={`bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black ${
                      fieldState.error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type="text"
                    placeholder="Enter a title..."
                  />
                  <ErrorMessage error={fieldState.error} />
                </>
              )}
            />
          </section>

          <section className="flex flex-col">
            <h3 className="text-sm font-medium mb-1">Description *</h3>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <textarea
                    {...field}
                    className={`bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black ${
                      fieldState.error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your card in detail..."
                  ></textarea>
                  <ErrorMessage error={fieldState.error} />
                </>
              )}
            />
          </section>

          <section>
            <h3 className="text-sm font-medium mb-1">Category *</h3>
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <div className="relative">
                    <select
                      {...field}
                      className={`bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black appearance-none ${
                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="" disabled>
                        Select a category...
                      </option>
                      <option value="photography">📸 Photography</option>
                      <option value="art-design">🎨 Art & Design</option>
                      <option value="technology">💻 Technology</option>
                      <option value="travel">✈️ Travel</option>
                      <option value="music">🎵 Music</option>
                      <option value="education">📚 Education</option>
                      <option value="food-recipes">🍔 Food & Recipes</option>
                      <option value="other">✨ Other</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      size={18}
                    />
                  </div>
                  <ErrorMessage error={fieldState.error} />
                </>
              )}
            />
          </section>

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
        </section>

        <aside className="flex-1 space-y-6">
          <VisibilitySettings watch={watch} setValue={setValue} />

          <PublishingOptions watch={watch} setValue={setValue} />
        </aside>
      </section>
    </form>
  );
}
