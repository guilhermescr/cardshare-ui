'use client';

import { CreateCardFormType } from '@/app/(app)/new/create-card.schema';
import TagsSection from '@/app/(app)/new/tags-section';
import GradientCardImage from '@/components/cards/gradient-card-image';
import GradientText from '@/components/gradient-text';
import Carousel from '@/components/ui/carousel';
import { capitalizeFirstLetter } from '@/utils/string.utils';

interface CardPreviewProps {
  card: Partial<CreateCardFormType>;
}

export default function CardPreview({ card }: CardPreviewProps) {
  return (
    <>
      <div className="relative">
        {card.mediaFiles?.length ? (
          <Carousel mediaFiles={card.mediaFiles} />
        ) : (
          <GradientCardImage
            gradient={card.selectedGradient || 'aurora'}
            size="large"
          />
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2">
        <GradientText>{card.title || 'No Title'}</GradientText>
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
        {card.description || 'No description provided.'}
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Category:</span>{' '}
          {capitalizeFirstLetter(card.category || 'None.')}
        </p>

        {card.tags && card.tags?.length > 0 && (
          <TagsSection tags={card.tags} hideActions />
        )}
      </div>
    </>
  );
}
