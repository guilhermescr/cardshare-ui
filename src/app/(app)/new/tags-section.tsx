'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface TagsSectionProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function TagsSection({ tags, setTags }: TagsSectionProps) {
  const [newTag, setNewTag] = useState('');
  const MAX_TAGS = 10;

  const handleNewTag = () => {
    if (!newTag) return;

    if (tags.includes(newTag)) {
      setNewTag('');
      return;
    }

    if (tags.length < MAX_TAGS) {
      setTags([...tags, newTag]);
      setNewTag('');
    } else {
      toast.error(`You can add up to ${MAX_TAGS} tags only.`);
    }
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNewTag();
    }
  };

  return (
    <section>
      <label className="text-sm font-medium mb-1" htmlFor="tags">
        Tags
      </label>

      <div className="flex items-center gap-2">
        <input
          className="bg-gray-50 border rounded-md flex-1 py-2 px-2.5 w-full text-gray-600 text-sm focus:outline-none focus:border-black"
          type="text"
          id="tags"
          placeholder="Add a tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={50}
        />

        <Button variant="gradient" gradientColor="blue" onClick={handleNewTag}>
          <Plus />
        </Button>
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-md py-1 px-2 text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 flex items-center gap-1 hover:opacity-85 transition-opacity break-all"
            >
              #{tag}{' '}
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => handleDeleteTag(index)}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
