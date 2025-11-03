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

  const [isSaving, setIsSaving] = useState(false);

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
              render={({ field }) => (
                <input
                  {...field}
                  className="bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black"
                  type="text"
                  placeholder="Enter a title..."
                />
              )}
            />
          </section>

          <section className="flex flex-col">
            <h3 className="text-sm font-medium mb-1">Description *</h3>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black"
                  placeholder="Describe your card in detail..."
                ></textarea>
              )}
            />
          </section>

          <section>
            <h3 className="text-sm font-medium mb-1">Category *</h3>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <select
                    {...field}
                    className="bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black appearance-none"
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
