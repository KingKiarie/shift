"use client";

export default function SkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex space-x-4 items-center bg-[#2a2a2a] rounded-md p-4"
        >
          <div className="rounded-full bg-gray-700 h-12 w-12"></div>

          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
