'use client';

import GradientCardImage from '@/components/cards/gradient-card-image';
import { Palette } from 'lucide-react';
import { CARD_GRADIENTS, CardGradient } from '@/constants/card-gradients';

interface VisualStyleProps {
  selectedGradient: CardGradient;
  setSelectedGradient: (gradient: CardGradient) => void;
}

export default function VisualStyleSection({
  selectedGradient,
  setSelectedGradient,
}: VisualStyleProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
        <Palette size={20} /> Visual Style
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {CARD_GRADIENTS.map((gradient) => (
          <GradientCardImage
            key={gradient.id}
            gradient={gradient.value}
            size="horizontal"
            selected={selectedGradient === gradient.id}
            selectable
            onClick={() => setSelectedGradient(gradient.id)}
          />
        ))}
      </div>
    </div>
  );
}
