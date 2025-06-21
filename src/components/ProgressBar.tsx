const ProgressBarSkeleton = () => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 animate-pulse">
      <div className="bg-gray-400 h-2.5 rounded-full w-1/4"></div>
    </div>
  );
};

export default ProgressBarSkeleton;