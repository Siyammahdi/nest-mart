import React from 'react';
import type { Metadata } from 'next';
import BlogList from './_components/BlogList';

export const metadata: Metadata = {
  title: 'Blog | Nest Shop',
  description: 'Explore our latest articles about e-commerce, shopping tips, and sustainable living.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen ">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            Nest Blogs
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights about e-commerce, smart shopping strategies, and sustainable living practices.
          </p>
        </header>

        <div className="max-w-[2000px] mx-auto">
          <BlogList />
        </div>
      </div>
    </main>
  );
} 