export type SegmentSlug =
  | 'principles'
  | 'elements'
  | 'ux'
  | 'patterns'
  | 'insights';

export interface SegmentConfig {
  slug: SegmentSlug;
  label: string;
  navLabel: string;
  description: string;
  color: string;
  order: number;
}

export const SEGMENTS: SegmentConfig[] = [
  {
    slug: 'principles',
    label: 'Principles of Design',
    navLabel: 'Principles of Design',
    description:
      'Foundational thinking that guides good design decisions.',
    color: 'principles',
    order: 1,
  },
  {
    slug: 'elements',
    label: 'Elements of Design',
    navLabel: 'Elements of Design',
    description: 'The raw materials of visual design.',
    color: 'elements',
    order: 2,
  },
  {
    slug: 'ux',
    label: 'The Laws of UX',
    navLabel: 'The Laws of UX',
    description:
      'Psychological and behavioral principles that shape user experience.',
    color: 'ux',
    order: 3,
  },
  {
    slug: 'patterns',
    label: 'Patterns & Components',
    navLabel: 'Patterns & Components',
    description:
      'Reusable solutions to recurring design and interaction problems.',
    color: 'patterns',
    order: 4,
  },
  {
    slug: 'insights',
    label: 'Insights & Reference',
    navLabel: 'Insights & Reference',
    description:
      'Research, history, and reference material for practicing designers.',
    color: 'insights',
    order: 5,
  },
];

export function getSegment(slug: string): SegmentConfig | undefined {
  return SEGMENTS.find((s) => s.slug === slug);
}

export function isValidSegment(slug: string): slug is SegmentSlug {
  return SEGMENTS.some((s) => s.slug === slug);
}
