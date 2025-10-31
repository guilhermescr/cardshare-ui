'use client';

import { useState } from 'react';
import GradientText from '@/components/gradient-text';
import { Button } from '@/components/ui/button';
import { ChevronDown, Eye, MoveLeft, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';
import VisibilitySettings from './visibility-settings';
import { useForm } from 'react-hook-form';
import { CardGradient } from '@/constants/card-gradients';
import TagsSection from './tags-section';
import VisualStyleSection from './visual-style-section';

export default function CreateCardPage() {
  const form = useForm();

  const [selectedGradient, setSelectedGradient] =
    useState<CardGradient>('aurora');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedVisibility, setSelectedVisibility] = useState('public');

  return (
    <form>
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="mb-2" asChild>
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
          <Button variant="gradient" gradientColor="blue">
            <Save className="mr-2" /> Publish Card
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6 lg:flex-row">
        <section className="flex-2 space-y-6">
          <section className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="flex items-center gap-2 font-medium">
              <Sparkles size={20} /> Card Details
            </h2>

            <p className="text-gray-500 text-sm mt-2 mb-6">
              Fill in the information for your card
            </p>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-1">Title *</h3>

              <input
                className="bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black"
                type="text"
                placeholder="Enter a title..."
              />
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-1">Description *</h3>

              <textarea
                name="description"
                id="description"
                className="bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black"
                placeholder="Describe your card in detail..."
              ></textarea>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-1">Category *</h3>

              <div className="relative">
                <select
                  className="bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black appearance-none"
                  defaultValue=""
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
            </div>

            <VisualStyleSection
              selectedGradient={selectedGradient}
              setSelectedGradient={setSelectedGradient}
            />

            <TagsSection tags={tags} setTags={setTags} />
          </section>
        </section>

        <aside className="flex-1 space-y-6">
          <VisibilitySettings
            selectedVisibility={selectedVisibility}
            setSelectedVisibility={setSelectedVisibility}
          />
        </aside>
      </section>
    </form>
  );
}
