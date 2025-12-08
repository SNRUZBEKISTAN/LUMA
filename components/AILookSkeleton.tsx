import React from 'react';

interface AILookSkeletonProps {
  compact?: boolean;
}

export function AILookSkeleton({ compact = false }: AILookSkeletonProps) {
  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-ai-card border border-gray-100 overflow-hidden animate-pulse">
        {/* Cover Image Skeleton */}
        <div className="aspect-[4/5] bg-gray-200 shimmer relative">
          {/* Arrow button skeleton */}
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-gray-300 rounded-full shimmer" />
        </div>

        {/* Compact Content */}
        <div className="p-3 space-y-2">
          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-full shimmer" />
          <div className="h-3 bg-gray-200 rounded w-3/4 shimmer" />
          
          {/* Tags */}
          <div className="flex gap-1">
            <div className="h-4 bg-gray-200 rounded-full w-12 shimmer" />
            <div className="h-4 bg-gray-200 rounded-full w-16 shimmer" />
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between pt-1">
            <div className="space-y-1">
              <div className="h-2 bg-gray-200 rounded w-8 shimmer" />
              <div className="h-3 bg-gray-200 rounded w-16 shimmer" />
            </div>
            
            <div className="h-6 bg-gray-200 rounded w-16 shimmer" />
          </div>

          {/* Disclaimer */}
          <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-ai-card border border-gray-100 overflow-hidden animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="aspect-[4/5] bg-gray-200 shimmer" />

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4 shimmer" />
          
          {/* Tags */}
          <div className="flex gap-1.5">
            <div className="h-5 bg-gray-200 rounded-full w-16 shimmer" />
            <div className="h-5 bg-gray-200 rounded-full w-20 shimmer" />
            <div className="h-5 bg-gray-200 rounded-full w-18 shimmer" />
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32 shimmer" />
          
          <div className="space-y-2">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                {/* Item Image */}
                <div className="w-10 h-10 rounded-lg bg-gray-200 shimmer" />
                
                {/* Item Info */}
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-full shimmer" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-16 shimmer" />
            <div className="h-5 bg-gray-200 rounded w-24 shimmer" />
          </div>
          
          <div className="h-10 bg-gray-200 rounded-xl w-28 shimmer" />
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-20 shimmer" />
            <div className="h-6 bg-gray-200 rounded w-24 shimmer" />
          </div>
          
          <div className="h-6 bg-gray-200 rounded w-16 shimmer" />
        </div>

        {/* Disclaimer */}
        <div className="pt-2">
          <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto shimmer" />
        </div>
      </div>
    </div>
  );
}

export default AILookSkeleton;