import { notFound } from 'next/navigation'
import { getSegment, isValidSegment, SEGMENTS } from '@/lib/config/segments'
import { getAllArticlesForSegment } from '@/lib/content/mdx'
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
    <main style={{ padding: '2rem' }}>
      <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        {seg.navLabel}
      </p>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{seg.label}</h1>
      <p style={{ marginBottom: '2rem' }}>{seg.description}</p>
      <p style={{ marginBottom: '1rem', opacity: 0.6 }}>{articles.length} articles</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={article.href}>
              {article.title} — {article.description}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}