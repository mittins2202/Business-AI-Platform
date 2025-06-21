const BusinessCardSkeleton = () => {
  return (
    <div className="border rounded-md p-4 space-y-2 animate-pulse">
      <div className="h-24 bg-gray-200 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
      <div className="h-8 bg-gray-200 rounded-md w-1/2"></div>
    </div>
  );
};

export default BusinessCardSkeleton;