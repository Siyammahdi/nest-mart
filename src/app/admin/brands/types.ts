export interface Brand {
  _id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  status: string;
  featured: boolean;
  productsCount: number;
  slug?: string;
}

export interface NewBrand {
  name: string;
  logo: string;
  description: string;
  website: string;
  status: string;
  featured: boolean;
  slug?: string;
} 