import { cn } from '@/lib/utils';

interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function Wrapper({ className = '', children }: WrapperProps) {
  return (
    <div className={cn('max-w-[1500px] mx-auto w-full px-4', className)}>
      {children}
    </div>
  );
}
