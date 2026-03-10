import Link from 'next/link'
import type { ArticleMeta } from '@/lib/content/types'
import { cn } from '@/lib/utils'

interface ArticleCardProps {
  article: ArticleMeta
  className?: string
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Link
      href={article.href}
      className={cn(
        'group flex flex-col justify-between',
        'bg-[var(--sand-2)]',
        'p-6 min-h-48',
        'hover:border-[var(--segment-7)] hover:bg-[var(--sand-3)]',
        'transition-colors duration-200',
        className
      )}
    >
      {/* ── Top: title + description ── */}
      <div>
        <h2 className="font-sans font-medium text-base tracking-wide text-[var(--sand-12)] mb-2 group-hover:text-[var(--segment-11)] transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-[var(--sand-9)] group-hover:text-[var(--sand-11)] leading-6 line-clamp-3">
          {article.description}
        </p>
      </div>

      {/* ── Bottom: tags ── */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest text-[var(--sand-8)] border border-[var(--sand-5)] rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}