import { NextResponse } from 'next/server';
import type { BlogPost } from '@/types/blog';
import blogData from '@/mock/blog-posts.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const post = blogData.posts.find(post => post.slug === slug);
      if (!post) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(post);
    }

    return NextResponse.json(blogData.posts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blog posts';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newPost: BlogPost = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'content', 'excerpt', 'author', 'category'];
    const missingFields = requiredFields.filter(field => !newPost[field as keyof BlogPost]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate content length
    if (newPost.content.length < 100) {
      return NextResponse.json(
        { error: 'Content must be at least 100 characters long' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    if (!newPost.slug) {
      newPost.slug = newPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Add timestamps if not provided
    const now = new Date().toISOString();
    newPost.createdAt = newPost.createdAt || now;
    newPost.updatedAt = now;

    // In a real app, you would save to a database here
    // For now, we'll just return success with the processed post
    return NextResponse.json(
      { message: 'Blog post created successfully', post: newPost },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 