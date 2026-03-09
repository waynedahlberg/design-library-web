import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Article } from '@/lib/content/types'
import { getSegment } from '@/lib/config/segments'
import { getCoverComponent } from '@/components/covers'
import { Container } from '@/components/layout/Container'

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const segment = getSegment(article.segment)
  const CoverComponent = getCoverComponent(article.coverKey)

  return (
    <div className="w-full bg-[var(--segment-4)] pt-12 pb-16">
      <Container>

        {/* ── Back button — visible on desktop, hidden on mobile (nav handles it) ── */}
        <div className="hidden nav:block mb-10">
          <Link
            href={`/${article.segment}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--segment-6)] text-[var(--segment-11)] hover:bg-[var(--segment-7)] transition-colors"
            aria-label="Back"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* ── Two-column layout: text left, illustration right ── */}
        <div className="flex flex-col nav:flex-row nav:items-center gap-10 nav:gap-16">

          {/* Text column */}
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-widest text-[var(--segment-9)] mb-4">
              {segment?.navLabel}
            </p>
            <h1 className="font-serif text-4xl nav:text-5xl lg:text-6xl text-[var(--segment-12)] leading-tight mb-5">
              {article.title}
            </h1>
            <p className="text-base nav:text-lg text-[var(--segment-10)] leading-7 max-w-lg">
              {article.description}
            </p>
          </div>

          {/* Illustration column */}
          {CoverComponent && (
            <div className="w-full nav:w-[320px] nav:shrink-0 aspect-square nav:aspect-auto nav:h-[280px]">
              <CoverComponent />
            </div>
          )}

        </div>
      </Container>
    </div>
  )
}