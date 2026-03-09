import Link from 'next/link'
import { SEGMENTS } from '@/lib/config/segments'

import { Container } from './Container'

export function SiteFooter() {
  return (
    <footer className="bg-[var(--sand-2)] mt-24">
      <Container fluid className="max-w-[1080px] py-8">
        <nav className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
          {SEGMENTS.map((seg) => (
            <Link
              key={seg.slug}
              href={`/${seg.slug}`}
              className="text-sm text-[var(--sand-9)] hover:text-[var(--sand-11)] transition-colors"
            >
              {seg.navLabel}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-[var(--sand-7)]">
          Design Library &rsquo;26 &mdash; Curated by Wayne Dahlberg
        </p>
      </Container>
    </footer>
  )
}

export default SiteFooter