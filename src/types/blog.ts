export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  readTime?: number;
} 