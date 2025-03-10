import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Post | Nest Mart',
  description: 'Read our latest blog post on Nest Mart',
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 