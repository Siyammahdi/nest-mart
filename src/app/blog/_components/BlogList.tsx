'use client';
import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import type { BlogPost } from '@/types/blog';

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
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 sm:h-52 lg:h-56 rounded-2xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
} 