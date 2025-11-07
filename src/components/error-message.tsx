import { FieldError } from 'react-hook-form';

interface ErrorMessageProps {
  error?: FieldError;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return <p className="text-sm text-red-500 mt-1">{error.message}</p>;
}
