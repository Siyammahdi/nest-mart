'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog post error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Unable to load blog post
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We're having trouble loading this blog post. This could be due to a temporary connection issue or the post may no longer be available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
          >
            Try again
          </button>
          <Link 
            href="/blog"
            className="bg-gray-100 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-200 transition-colors"
          >
            Return to blog listing
          </Link>
        </div>
      </div>
    </div>
  );
} 