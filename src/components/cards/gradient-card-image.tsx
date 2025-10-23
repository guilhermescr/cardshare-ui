import { Sparkles } from 'lucide-react';

interface GradientCardImageProps {
  gradient: string;
  size?: 'small' | 'large';
}

enum ImageIconSize {
  small = 30,
  large = 48,
}

export default function GradientCardImage({
  gradient,
  size = 'small',
}: GradientCardImageProps) {
  return (
    <div
      className={`bg-gradient-to-br flex items-center justify-center ${gradient} w-full ${size === 'small' ? 'h-36' : 'h-80'} px-8 rounded-lg`}
    >
      <Sparkles className="text-white/80" size={ImageIconSize[size]} />
    </div>
  );
}
