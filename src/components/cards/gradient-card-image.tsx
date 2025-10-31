import { Sparkles } from 'lucide-react';

interface GradientCardImageProps {
  gradient: string;
  size?: 'tiny' | 'small' | 'large' | 'horizontal';
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
}

enum ImageIconSize {
  tiny = 14,
  small = 30,
  large = 48,
  horizontal = 25,
}

enum ImageContainerSize {
  tiny = 'h-14',
  small = 'h-36',
  large = 'h-80',
  horizontal = 'h-18',
}

export default function GradientCardImage({
  gradient,
  size = 'small',
  selected = false,
  selectable = false,
  onClick,
}: GradientCardImageProps) {
  return (
    <div
      className={`bg-gradient-to-br flex items-center justify-center ${gradient} w-full ${ImageContainerSize[size]} px-8 rounded-lg ${
        selected ? 'ring-2 ring-offset-2 ring-blue-500 scale-102' : ''
      } ${
        selectable ? 'cursor-pointer hover:scale-105 transition-transform' : ''
      }`}
      onClick={onClick}
    >
      <Sparkles className="text-white/80" size={ImageIconSize[size]} />
    </div>
  );
}
