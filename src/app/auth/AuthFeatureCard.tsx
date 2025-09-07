interface FeatureCardProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export function AuthFeatureCard({
  icon,
  text,
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center ${className}`}
    >
      <div className="w-6 h-6 mx-auto mb-2">{icon}</div>
      <p className="text-xs text-gray-600">{text}</p>
    </div>
  );
}
