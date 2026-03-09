'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { isValidSegment } from '@/lib/config/segments'

export function SegmentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const segment = pathname?.split('/')[1]
    const html = document.documentElement

    if (segment && isValidSegment(segment)) {
      html.setAttribute('data-segment', segment)
    } else {
      html.removeAttribute('data-segment')
    }
  }, [pathname])

  return <>{children}</>
}