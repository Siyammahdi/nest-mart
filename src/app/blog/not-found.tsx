import React from 'react';
import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Blog Content Not Found
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The blog content you're looking for doesn't exist or may have been removed.
        </p>
        <Link 
          href="/blog"
          className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors inline-block"
        >
          Browse all blog posts
        </Link>
      </div>
    </div>
  );
} 