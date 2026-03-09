import { notFound } from 'next/navigation'
import { isValidSegment } from '@/lib/config/segments'

export default async function SegmentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ segment: string }>
}) {
  const { segment } = await params
  if (!isValidSegment(segment)) notFound()

  return (
    <>
      {children}
    </>
  )
}