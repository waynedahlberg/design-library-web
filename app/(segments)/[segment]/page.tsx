import { notFound } from 'next/navigation'
import { getSegment, isValidSegment, SEGMENTS } from '@/lib/config/segments'
import { getAllArticlesForSegment } from '@/lib/content/mdx'
import { SegmentHeader } from '@/components/layout/SegmentHeader'
import { ArticleGrid } from '@/components/content/ArticleGrid'

import { Container } from '@/components/layout/Container'

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
    <Container className="py-12">      <SegmentHeader segment={seg} count={articles.length} />
      <ArticleGrid articles={articles} />
    </Container>
  )
}