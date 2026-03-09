import type { ArticleReference } from '@/lib/content/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface ReferencesSectionProps {
  references: ArticleReference[]
}

export function ReferencesSection({ references }: ReferencesSectionProps) {
  if (!references.length) return null

  return (
    <section className="mt-16 pt-10 border-t border-[var(--sand-4)]">
      <h2 className="text-xs uppercase tracking-widest text-[var(--sand-8)] mb-6">
        References
      </h2>
      <ul className="flex flex-col gap-3">
        {references.map((ref) => (
          <li key={ref.url}>
            <Link
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-2 text-sm text-[var(--sand-9)] hover:text-[var(--sand-11)] transition-colors"
            >
              <ArrowUpRight
                size={14}
                className="mt-0.5 shrink-0 text-[var(--sand-7)] group-hover:text-[var(--segment-9)] transition-colors"
              />
              {ref.label}
            </Link>
          </li>
        ))}
      </ul>
    </section >
  )
}