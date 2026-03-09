'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { SEGMENTS } from '@/lib/config/segments'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

import { Container } from './Container'

export function SiteNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // const activeSegment = SEGMENTS.find((s) => pathname.startsWith(`/${s.slug}`))

  return (
    <>
      {/* ── Desktop nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--sand-4)] bg-[var(--sand-1)]">
        <Container as="nav" className="h-12 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-8">
            {SEGMENTS.map((seg) => {
              const isActive = pathname.startsWith(`/${seg.slug}`)
              return (
                <Link
                  key={seg.slug}
                  href={`/${seg.slug}`}
                  className={cn(
                    'text-sm transition-colors',
                    isActive
                      ? 'text-[var(--sand-12)]'
                      : 'text-[var(--sand-9)] hover:text-[var(--sand-11)]'
                  )}
                >
                  {seg.navLabel}
                </Link>
              )
            })}
          </div>

          {/* Mobile — left side home link, right side controls */}
          <Link
            href="/"
            className="md:hidden text-sm font-medium text-[var(--sand-11)]"
          >
            Design Library
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="md:hidden text-[var(--sand-11)] hover:text-[var(--sand-12)] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </Container>
      </header>

      {/* ── Mobile menu overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[var(--sand-1)] flex flex-col">
          <div className="flex items-center justify-end px-6 h-12 border-b border-[var(--sand-4)]">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[var(--sand-11)] hover:text-[var(--sand-12)] transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-10 gap-8">
            {SEGMENTS.map((seg) => {
              const isActive = pathname.startsWith(`/${seg.slug}`)
              return (
                <Link
                  key={seg.slug}
                  href={`/${seg.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'font-serif text-3xl transition-colors',
                    isActive
                      ? 'text-[var(--sand-12)]'
                      : 'text-[var(--sand-9)] hover:text-[var(--sand-11)]'
                  )}
                >
                  {seg.navLabel}
                </Link>
              )
            })}
          </nav>
        </div>
      )}

      {/* ── Spacer so content clears the fixed nav ── */}
      <div className="h-12" />
    </>
  )
}