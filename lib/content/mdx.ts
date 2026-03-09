import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { SegmentSlug } from '../config/segments';
import { SEGMENTS } from '../config/segments';
import type {
  Article,
  ArticleFrontmatter,
  ArticleManifestEntry,
  ArticleMeta,
  ContentBlock,
  Manifest,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// ---------------------------------------------------------------------------
// Content readers
// ---------------------------------------------------------------------------

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
  return { ...fm, href: `/${segment}/${slug}` };
}

export function getAllArticlesForSegment(segment: SegmentSlug): ArticleMeta[] {
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
  return { ...fm, href: `/${segment}/${slug}`, content };
}

// ---------------------------------------------------------------------------
// MDX content block parser
// ---------------------------------------------------------------------------

function parseJsxProps(propsStr: string): Record<string, string> {
  const props: Record<string, string> = {};
  const propRegex = /(\w+)=["']([^"']*)["']/g;
  let m: RegExpExecArray | null;
  while ((m = propRegex.exec(propsStr)) !== null) {
    props[m[1]] = m[2];
  }
  return props;
}

function parseJsxBlock(
  tagName: string,
  propsStr: string,
  innerContent?: string,
): ContentBlock | null {
  const props = parseJsxProps(propsStr);
  switch (tagName) {
    case 'Callout': {
      const text = (innerContent ?? '')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .join(' ');
      return {
        type: 'callout',
        calloutType: props.type ?? 'default',
        ...(props.title ? { title: props.title } : {}),
        text,
      };
    }
    case 'InteractiveDemo':
      if (!props.id) return null;
      return { type: 'interactive', id: props.id };
    case 'Diagram':
      if (!props.id) return null;
      return {
        type: 'diagram',
        id: props.id,
        ...(props.caption ? { caption: props.caption } : {}),
      };
    default:
      return null;
  }
}

function parseMarkdownChunk(markdown: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = markdown.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // h2
    const h2 = line.match(/^## (.+)/);
    if (h2) {
      blocks.push({ type: 'heading', level: 2, text: h2[1].trim() });
      i++;
      continue;
    }

    // h3
    const h3 = line.match(/^### (.+)/);
    if (h3) {
      blocks.push({ type: 'heading', level: 3, text: h3[1].trim() });
      i++;
      continue;
    }

    // unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith('- ') || l.startsWith('* ')) {
          items.push(l.slice(2).trim());
          i++;
        } else if (!l) {
          i++;
          break;
        } else {
          break;
        }
      }
      blocks.push({ type: 'list', ordered: false, items });
      continue;
    }

    // ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        const match = l.match(/^\d+\.\s(.+)/);
        if (match) {
          items.push(match[1].trim());
          i++;
        } else if (!l) {
          i++;
          break;
        } else {
          break;
        }
      }
      blocks.push({ type: 'list', ordered: true, items });
      continue;
    }

    // paragraph — collect consecutive non-heading, non-list lines
    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i].trim();
      if (
        l &&
        !l.startsWith('#') &&
        !l.startsWith('- ') &&
        !l.startsWith('* ') &&
        !/^\d+\./.test(l)
      ) {
        paragraphLines.push(l);
        i++;
      } else {
        break;
      }
    }
    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') });
    }
  }

  return blocks;
}

// Matches self-closing (<Foo bar="x" />) and multi-line (<Foo>...</Foo>) JSX blocks.
// Only targets known block-level components; inline JSX is not expected.
const JSX_BLOCK_RE = /<(\w+)([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/g;

export function parseMdxContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  JSX_BLOCK_RE.lastIndex = 0;

  while ((match = JSX_BLOCK_RE.exec(content)) !== null) {
    const [fullMatch, tagName, propsStr, innerContent] = match;

    // parse any markdown that appeared before this JSX block
    const before = content.slice(lastIndex, match.index).trim();
    if (before) blocks.push(...parseMarkdownChunk(before));

    const jsxBlock = parseJsxBlock(tagName, propsStr, innerContent);
    if (jsxBlock) blocks.push(jsxBlock);

    lastIndex = match.index + fullMatch.length;
  }

  // remaining markdown after the last JSX block
  const remaining = content.slice(lastIndex).trim();
  if (remaining) blocks.push(...parseMarkdownChunk(remaining));

  return blocks;
}

// ---------------------------------------------------------------------------
// Manifest generation
// ---------------------------------------------------------------------------

function getArticleManifestEntry(
  segment: SegmentSlug,
  slug: string,
): ArticleManifestEntry {
  const filePath = path.join(CONTENT_DIR, segment, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;
  return {
    ...fm,
    href: `/${segment}/${slug}`,
    blocks: parseMdxContent(content),
  };
}

export function generateManifest(): Manifest {
  const segments: Manifest['segments'] = {};
  for (const seg of SEGMENTS) {
    segments[seg.slug] = getArticleSlugs(seg.slug)
      .map((slug) => getArticleManifestEntry(seg.slug, slug))
      .filter((a) => a.published)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }
  return { generatedAt: new Date().toISOString(), segments };
}
