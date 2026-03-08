import { notFound } from 'next/navigation'
import { getSegment, isValidSegment } from '@/lib/config/segments'

export default async function SegmentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ segment: string }>
}) {
  const { segment } = await params
  if (!isValidSegment(segment)) notFound()
  const seg = getSegment(segment)!

  return (
    <div data-segment={seg.slug}>
      {children}
    </div>
  )
}