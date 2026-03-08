import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { SegmentSlug } from '@/lib/config/segments';
import { SEGMENTS } from '@/lib/config/segments';
import type {
  Article,
  ArticleFrontmatter,
  ArticleMeta,
  Manifest,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getArticleSlugs(segment: SegmentSlug): string[] {
  const dir = path.join(CONTENT_DIR, segment);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getArticleMeta(
  segment: SegmentSlug,
  slug: string,
): ArticleMeta {
  const filePath = path.join(CONTENT_DIR, segment, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  const fm = data as ArticleFrontmatter;
  return {
    ...fm,
    href: `/${segment}/${slug}`,
  };
}

export function getAllArticlesForSegment(
  segment: SegmentSlug,
): ArticleMeta[] {
  return getArticleSlugs(segment)
    .map((slug) => getArticleMeta(segment, slug))
    .filter((a) => a.published)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getAllArticles(): ArticleMeta[] {
  return SEGMENTS.flatMap((s) => getAllArticlesForSegment(s.slug));
}

export async function getArticle(
  segment: SegmentSlug,
  slug: string,
): Promise<Article> {
  const filePath = path.join(CONTENT_DIR, segment, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;
  return {
    ...fm,
    href: `/${segment}/${slug}`,
    content,
  };
}

export function generateManifest(): Manifest {
  const segments: Manifest['segments'] = {};
  for (const seg of SEGMENTS) {
    segments[seg.slug] = getAllArticlesForSegment(seg.slug);
  }
  return {
    generatedAt: new Date().toISOString(),
    segments,
  };
}
