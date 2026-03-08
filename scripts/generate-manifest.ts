import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { SegmentSlug } from '../lib/config/segments';
import { SEGMENTS } from '../lib/config/segments';
import type {
  ArticleFrontmatter,
  ArticleMeta,
  Manifest,
} from '../lib/content/types';

// Inline version of the content reading functions — avoids @/ alias issues
// when running outside of Next.js with tsx
const CONTENT_DIR = path.join(process.cwd(), 'content');

function getArticleSlugs(segment: SegmentSlug): string[] {
  const dir = path.join(CONTENT_DIR, segment);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

function getArticleMeta(
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

function getAllArticlesForSegment(
  segment: SegmentSlug,
): ArticleMeta[] {
  return getArticleSlugs(segment)
    .map((slug) => getArticleMeta(segment, slug))
    .filter((a) => a.published)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

function generateManifest(): Manifest {
  const segments: Manifest['segments'] = {};
  for (const seg of SEGMENTS) {
    segments[seg.slug] = getAllArticlesForSegment(seg.slug);
  }
  return {
    generatedAt: new Date().toISOString(),
    segments,
  };
}

// Write the manifest
const manifest = generateManifest();
const outPath = path.join(
  process.cwd(),
  'public',
  'api',
  'manifest.json',
);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));

const totalArticles = Object.values(manifest.segments).flat().length;
console.log(
  `✓ Manifest written — ${totalArticles} articles across ${SEGMENTS.length} segments`,
);
console.log(`  Output: ${outPath}`);
