// lib/config/segments.ts

export type SegmentSlug =
  | 'principles'
  | 'elements'
  | 'ux'
  | 'patterns'
  | 'insights';

export interface SegmentConfig {
  slug: SegmentSlug;
  label: string;
  description: string;
  color: string; // maps to a CSS custom property namespace, e.g. '--color-ux'
  accentVar: string; // e.g. 'var(--ux-9)' for Radix scale step 9
  order: number;
}

export const SEGMENTS: SegmentConfig[] = [
  {
    slug: 'principles',
    label: 'Design Principles',
    description:
      'Foundational thinking that guides good design decisions.',
    color: 'principles',
    accentVar: 'var(--principles-9)',
    order: 1,
  },
  {
    slug: 'elements',
    label: 'Design Elements',
    description: 'The raw materials of visual design.',
    color: 'elements',
    accentVar: 'var(--elements-9)',
    order: 2,
  },
  {
    slug: 'ux',
    label: 'Laws of UX',
    description:
      'Psychological and behavioral principles that shape user experience.',
    color: 'ux',
    accentVar: 'var(--ux-9)',
    order: 3,
  },
  {
    slug: 'patterns',
    label: 'Patterns & Components',
    description:
      'Reusable solutions to recurring design and interaction problems.',
    color: 'patterns',
    accentVar: 'var(--patterns-9)',
    order: 4,
  },
  {
    slug: 'insights',
    label: 'Insights & Reference',
    description:
      'Research, history, and reference material for practicing designers.',
    color: 'insights',
    accentVar: 'var(--insights-9)',
    order: 5,
  },
];

export const getSegment = (slug: SegmentSlug) =>
  SEGMENTS.find((s) => s.slug === slug)!;
