import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselProps {
  mediaUrls: string[];
}

export default function Carousel({ mediaUrls }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const isVideo = (url: string) => {
    const videoExtensions = ['.mp4'];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  return (
    <section className="relative w-full">
      <div className="relative w-full pt-[56.25%]">
        <div className="absolute top-0 left-0 w-full h-full bg-[#444] rounded-lg overflow-hidden">
          {isVideo(mediaUrls[currentIndex]) ? (
            <video
              src={mediaUrls[currentIndex]}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={mediaUrls[currentIndex]}
              alt={`Media ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentIndex === 0}
            />
          )}
        </div>
      </div>

      {mediaUrls.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="cursor-pointer absolute top-1/2 left-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </section>
  );
}
