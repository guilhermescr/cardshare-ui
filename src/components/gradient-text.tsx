import React from 'react';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({
  children,
  className = '',
}: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
