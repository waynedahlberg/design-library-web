import type { SegmentConfig } from '@/lib/config/segments'

interface SegmentHeaderProps {
  segment: SegmentConfig
  count: number
}

export function SegmentHeader({ segment, count }: SegmentHeaderProps) {
  return (
    <div className="border-b border-[var(--sand-4)] pb-12 mb-12">
      <p className="text-xs uppercase tracking-widest text-[var(--segment-9)] mb-4">
        Design Library
      </p>
      <h1 className="font-serif text-5xl md:text-6xl text-[var(--sand-12)] mb-4">
        {segment.label}
      </h1>
      <p className="text-base text-[var(--sand-10)] max-w-xl mb-6">
        {segment.description}
      </p>
      <p className="text-xs text-[var(--sand-7)] uppercase tracking-widest">
        {count} {count === 1 ? 'article' : 'articles'}
      </p>
    </div>
  )
}