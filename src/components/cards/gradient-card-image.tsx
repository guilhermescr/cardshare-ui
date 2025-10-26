import { Sparkles } from 'lucide-react';

interface GradientCardImageProps {
  gradient: string;
  size?: 'tiny' | 'small' | 'large';
}

enum ImageIconSize {
  tiny = 14,
  small = 30,
  large = 48,
}

enum ImageContainerSize {
  tiny = 'h-14',
  small = 'h-36',
  large = 'h-80',
}

export default function GradientCardImage({
  gradient,
  size = 'small',
}: GradientCardImageProps) {
  return (
    <div
      className={`bg-gradient-to-br flex items-center justify-center ${gradient} w-full ${ImageContainerSize[size]} px-8 rounded-lg`}
    >
      <Sparkles className="text-white/80" size={ImageIconSize[size]} />
    </div>
  );
}
