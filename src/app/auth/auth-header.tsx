import GradientText from '@/components/gradient-text';
import Logo from '@/components/logo';

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="text-center mb-8">
      <Logo className="mb-4" />
      <h1 className="text-3xl font-bold">
        <GradientText>{title}</GradientText>
      </h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </header>
  );
}
