import type { SegmentSlug } from '../config/segments';

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
  coverKey?: string;
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

// Structured content blocks — parsed from MDX body for iOS native rendering
export type ContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'callout'; calloutType: string; title?: string; text: string }
  | { type: 'interactive'; id: string }
  | { type: 'diagram'; id: string; caption?: string }

// Manifest article entry — metadata + blocks for iOS
export interface ArticleManifestEntry extends ArticleMeta {
  blocks: ContentBlock[];
}

// Shape of /public/api/manifest.json
export interface Manifest {
  generatedAt: string;
  segments: {
    [segment: string]: ArticleManifestEntry[];
  };
}
