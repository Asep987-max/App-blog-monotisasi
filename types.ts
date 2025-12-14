export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  excerpt: string;
  content: string; // HTML string for simplicity in MVP
  views: number;
  isBreaking?: boolean;
}

export enum AdVariant {
  LEADERBOARD = 'leaderboard', // 728x90
  RECTANGLE = 'rectangle', // 300x250 or 300x600
  MOBILE_BANNER = 'mobile_banner', // 320x50
  IN_FEED = 'in_feed', // Fluid
}

export interface NavItem {
  label: string;
  href: string;
}