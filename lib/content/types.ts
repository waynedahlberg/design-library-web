import type { SegmentSlug } from '@/lib/config/segments';

export interface ArticleReference {
  label: string;
  url: string;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  segment: SegmentSlug;
  description: string;
  tags: string[];
  cover?: string;
  application?: string[];
  references?: ArticleReference[];
  order?: number;
  published: boolean;
}

// Lightweight — used in grids, nav, and the JSON manifest
export interface ArticleMeta extends ArticleFrontmatter {
  href: string; // e.g. /ux/fitts-law
}

// Full article — includes raw MDX content string for rendering
export interface Article extends ArticleMeta {
  content: string;
}

// Shape of /public/api/manifest.json
export interface Manifest {
  generatedAt: string;
  segments: {
    [segment: string]: ArticleMeta[];
  };
}
