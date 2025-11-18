import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface MediaItem {
  type?: 'image' | 'video';
  media: string;
  file?: File | null;
}

interface CarouselProps {
  mediaFiles: MediaItem[];
  currentIndex?: number;
}

export default function Carousel({
  mediaFiles,
  currentIndex = 0,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? mediaFiles.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === mediaFiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="relative w-full">
      <div className="relative w-full pt-[56.25%]">
        <div className="absolute top-0 left-0 w-full h-full bg-[#444] rounded-lg overflow-hidden">
          {mediaFiles[activeIndex].type === 'video' ? (
            <video
              src={mediaFiles[activeIndex].media}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={mediaFiles[activeIndex].media}
              alt={`Media ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={activeIndex === 0}
            />
          )}
        </div>
      </div>

      {mediaFiles.length > 1 && (
        <>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-full">
            <button
              type="button"
              onClick={handlePrevious}
              className="cursor-pointer bg-white border border-gray-300 p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <ArrowLeft size={18} />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 translate-x-full">
            <button
              type="button"
              onClick={handleNext}
              className="cursor-pointer bg-white border border-gray-300 p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
