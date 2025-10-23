import { cn } from '@/lib/utils';

interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function Wrapper({ className = '', children }: WrapperProps) {
  return (
    <div className={cn('max-w-[1350px] mx-auto w-full px-6', className)}>
      {children}
    </div>
  );
}
