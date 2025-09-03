import { Layers } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
        <Layers className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </header>
  );
}
