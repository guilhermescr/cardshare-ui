import { Layers } from 'lucide-react';

const logoSizes = {
  small: 'w-10 h-10',
  large: 'w-16 h-16',
};

const iconSizes = {
  small: 'w-6 h-6',
  large: 'w-8 h-8',
};

type LogoSizeKey = keyof typeof logoSizes;

interface LogoProps {
  size?: LogoSizeKey;
  className?: string;
}

export default function Logo({ size = 'large', className = '' }: LogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg ${logoSizes[size]} ${className}`}
    >
      <Layers className={`${iconSizes[size]} text-white`} />
    </div>
  );
}
