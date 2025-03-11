'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Avatar component for the blog post
const Avatar = ({ name, size = 40 }: { name: string; size?: number }) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div
      className="rounded-full bg-primary text-white flex items-center justify-center font-medium"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the slug from params
        const slug = params.slug as string;
        
        // Use the current origin to construct the API URL
        const response = await fetch(`/api/blog?slug=${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/blog/not-found');
            return;
          }
          throw new Error(`Failed to fetch blog post: ${response.status}`);
        }
        
        const data = await response.json();
        setPost(data);
        
        // Update document title
        if (data && data.title) {
          document.title = `${data.title} | Nest Mart Blog`;
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.slug, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Unable to load blog post
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {error}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
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

  // No post state (should not happen due to router.push above, but just in case)
  if (!post) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The blog post you&apus;re looking for doesn&apus;t exist or may have been removed.
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

  // Safely format date
  const formattedDate = (() => {
    try {
      
      return new Date(post.createdAt).toLocaleDateString();
    } catch (error) {
      console.log(error);
      return 'Unknown date';
    }
  })();

  return (
    <article className="min-h-screen bg-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <time dateTime={post.createdAt}>
              {formattedDate}
            </time>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-blue-600">{post.category}</span>
            {post.readTime && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{post.readTime} min read</span>
              </>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 sm:mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Avatar name={post.author.name} size={40} />
            <div>
              <div className="font-medium text-gray-900">{post.author.name}</div>
              {post.author.bio && (
                <div className="text-xs sm:text-sm text-gray-500 line-clamp-2 max-w-xl">
                  {post.author.bio}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="relative w-full aspect-[16/9] mb-8 sm:mb-12 bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden">
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px"
              className="object-cover"
              priority
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qQEBALkE6Oz5DRVlLT1NbWl5eYWJhSl9yX2JhYVv/2wBDARUXFx4aHjshITtbQjVCW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1v/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          )}
        </div>

        <div className="prose prose-base sm:prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 mt-6 sm:mt-8">{children}</h1>,
              h2: ({children}) => <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-5 sm:mt-6">{children}</h2>,
              h3: ({children}) => <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 mt-4 sm:mt-5">{children}</h3>,
              p: ({children}) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
              ul: ({children}) => <ul className="list-disc pl-4 sm:pl-6 mb-4 space-y-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal pl-4 sm:pl-6 mb-4 space-y-2">{children}</ol>,
              li: ({children}) => <li className="text-gray-700">{children}</li>,
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700">{children}</blockquote>
              ),
              code: ({children}) => (
                <code className="bg-gray-100 rounded px-1 py-0.5 text-sm text-gray-800">{children}</code>
              ),
              pre: ({children}) => (
                <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto text-sm mb-4">{children}</pre>
              ),
            }}
          >
            {post.content || 'No content available'}
          </ReactMarkdown>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 sm:mt-12 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-12 pt-6 border-t">
          <Link 
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}