export default function CardSkeleton() {
  return (
    <section className="bg-white shadow rounded-md p-6 animate-pulse">
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full px-8 py-14 rounded-lg mb-4" />
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-8" />
      <div className="flex items-center gap-3 mb-4">
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-gray-200 rounded-lg" />
        <div className="h-5 w-16 bg-gray-200 rounded-lg" />
      </div>
      <div className="flex gap-4">
        <div className="h-4 w-12 bg-gray-200 rounded" />
        <div className="h-4 w-12 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-2 justify-between mt-6">
        <div className="h-8 w-16 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
    </section>
  );
}
