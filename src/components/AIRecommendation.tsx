const AIRecommendationSkeleton = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md animate-pulse">
      {/* Header skeleton */}
      <div className="mb-4">
        <div className="h-8 bg-gray-200 rounded-md w-1/2"></div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
      </div>

      {/* Footer skeleton */}
      <div className="mt-6 flex justify-end">
        <div className="h-6 bg-gray-200 rounded-md w-24"></div>
      </div>
    </div>
  );
};

export default AIRecommendationSkeleton;