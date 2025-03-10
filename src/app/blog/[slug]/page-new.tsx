import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { BlogPost } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Avatar from '../_components/Avatar';

// This would typically fetch from an API/database
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
  const res = await fetch(`${baseUrl}/api/blog?slug=${slug}`, {
    next: {
      revalidate: 60
    }
  });
  
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch blog post');
  }

  return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Nest Shop Blog',
    };
  }

  return {
    title: `${post.title} | Nest Shop Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString()}
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
            {post.content}
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
      </div>
    </article>
  );
} 