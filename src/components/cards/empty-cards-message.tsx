import { FileQuestion } from 'lucide-react';

export default function EmptyCardsMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
      <FileQuestion className="w-16 h-16 mb-4 opacity-60" strokeWidth={1.2} />
      <h2 className="text-xl font-semibold mb-2 text-gray-500">
        No cards found
      </h2>
      <p className="mb-4 text-gray-400">
        Try changing your filters or create a new card to get started!
      </p>
    </div>
  );
}
