'use client';
import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import type { BlogPost } from '@/types/blog';
import { BlogListSkeleton } from "@/components/ui/BlogSkeleton";

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Use absolute URLs for production to avoid connection issues
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/blog`, {
          cache: 'force-cache',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Set empty array to avoid undefined errors
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <BlogListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
} 