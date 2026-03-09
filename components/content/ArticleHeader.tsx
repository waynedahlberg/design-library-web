import Link from 'next/link'
import type { Article } from '@/lib/content/types'
import { getSegment } from '@/lib/config/segments'
import { ArrowLeft } from 'lucide-react'

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const segment = getSegment(article.segment)

  return (
    <div className="mb-12">
      <Link
        href={`/${article.segment}`}
        className="inline-flex items-center gap-2 text-sm text-[var(--sand-8)] hover:text-[var(--sand-11)] transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        {segment?.navLabel ?? article.segment}
      </Link>

      <p className="text-xs uppercase tracking-widest text-[var(--segment-9)] mb-4">
        {segment?.navLabel}
      </p>
      <h1 className="font-serif text-5xl md:text-6xl text-[var(--sand-12)] leading-tight mb-6">
        {article.title}
      </h1>
      <p className="text-lg text-[var(--sand-10)] max-w-2xl leading-7">
        {article.description}
      </p>
    </div>
  )
}