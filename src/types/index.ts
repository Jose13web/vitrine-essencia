export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc?: string | null;
  price: number;
  originalPrice?: number | null;
  affiliateUrl: string;
  imageUrl: string;
  images: string;
  brand?: string | null;
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  active: boolean;
  categoryId: string;
  category: CategoryType;
  coupons: CouponType[];
  favorites: FavoriteType[];
  reviews: ReviewType[];
  tags: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  order: number;
  products?: ProductType[];
  createdAt: Date;
}

export interface CouponType {
  id: string;
  code: string;
  discount: string;
  description?: string | null;
  expiresAt?: Date | null;
  active: boolean;
  productId: string;
  createdAt: Date;
}

export interface ArticleType {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  imageUrl?: string | null;
  authorId?: string | null;
  tags: string;
  published: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role: string;
  createdAt: Date;
}

export interface FavoriteType {
  id: string;
  userId: string;
  productId: string;
  product?: ProductType;
  createdAt: Date;
}

export interface ReviewType {
  id: string;
  rating: number;
  comment?: string | null;
  userId: string;
  user: UserType;
  productId: string;
  createdAt: Date;
}
