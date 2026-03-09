import { notFound } from 'next/navigation'
import { getSegment, isValidSegment, SEGMENTS } from '@/lib/config/segments'
import { getAllArticlesForSegment } from '@/lib/content/mdx'
import { SegmentHeader } from '@/components/layout/SegmentHeader'
import Link from 'next/link'

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ segment: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>
}) {
  const { segment } = await params
  if (!isValidSegment(segment)) return {}
  const seg = getSegment(segment)!
  return {
    title: seg.label,
    description: seg.description,
  }
}

export default async function SegmentPage({
  params,
}: {
  params: Promise<{ segment: string }>
}) {
  const { segment } = await params
  if (!isValidSegment(segment)) notFound()

  const seg = getSegment(segment)!
  const articles = getAllArticlesForSegment(seg.slug)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SegmentHeader segment={seg} count={articles.length} />
      <ul className="flex flex-col gap-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={article.href}
              className="text-[var(--sand-11)] hover:text-[var(--sand-12)] transition-colors"
            >
              <span className="font-serif text-xl">{article.title}</span>
              <span className="text-sm text-[var(--sand-8)] ml-3">
                {article.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}