import React from 'react';

export const BlogCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl border hover:shadow-lg transition-shadow overflow-hidden h-full">
      {/* Image placeholder */}
      <div className="relative w-full pt-[60%] bg-gray-200"></div>
      
      <div className="p-4 sm:p-5">
        {/* Date and category placeholder */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        
        {/* Title placeholder */}
        <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        
        {/* Excerpt placeholder */}
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        
        {/* Author placeholder */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {[...Array(8)].map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}; 