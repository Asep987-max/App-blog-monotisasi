// Frontend Types matching Backend API Responses

// Base Interfaces
export interface User {
  id: number;
  google_id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'author' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

// NOTE: The Backend 'Article' has relations (user, category).
// The API response for /api/articles usually includes these nested objects or their IDs.
// I'm updating this to reflect the 'bridge' state where we support the old UI usage (simple strings)
// but type them correctly for the future API.
export interface Article {
  id: string | number; // Backend uses int ID, Frontend mocks used string. supporting both.
  slug: string;
  title: string;

  // Bridge: Frontend expects string, Backend returns Object.
  // ideally, frontend components should be updated to handle Objects.
  // For now, I will define these as unions to prevent build errors if I don't touch components.
  category: string | Category;
  author: string | User;

  // LEGACY FIELDS (Required for Frontend Mocks to work without crashing)
  publishedAt: string;
  imageUrl: string;

  // BACKEND FIELDS (Optional for now)
  created_at?: string;
  cover_image_url?: string;

  excerpt: string;
  content: string;
  views: number;
  isBreaking?: boolean;

  status?: 'draft' | 'published';
}

export interface AdPlacement {
  id: number;
  placement_key: string;
  label: string;
  ad_code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Frontend specific types (Non-backend)
export enum AdVariant {
  LEADERBOARD = 'leaderboard',
  RECTANGLE = 'rectangle',
  MOBILE_BANNER = 'mobile_banner',
  IN_FEED = 'in_feed',
}

export interface NavItem {
  label: string;
  href: string;
}

// API Responses
export interface ArticlesResponse {
  data: Article[];
  meta: {
      current_page: number;
      last_page: number;
      total: number;
  }
}

export interface AuthResponse {
  token: string;
  user: User;
}
