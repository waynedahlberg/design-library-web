'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import { SEGMENTS } from '@/lib/config/segments'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/Container'

function useNavContext() {
  const pathname = usePathname()
  const activeSegment = SEGMENTS.find((s) => pathname.startsWith(`/${s.slug}`))
  const isArticlePage = activeSegment
    ? pathname !== `/${activeSegment.slug}`
    : false
  const backHref = activeSegment ? `/${activeSegment.slug}` : '/'
  return { pathname, activeSegment, isArticlePage, backHref }
}

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname, activeSegment, isArticlePage, backHref } = useNavContext()

  return (
    <>
      {/* ── Nav bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--segment-4)] backdrop-blur-sm">
        <Container as="nav" fluid className="max-w-[1080px] py-8">

          {/* ── Desktop: segment links centered ── */}
          <div className="hidden nav:flex w-full items-center justify-between">
            {SEGMENTS.map((seg) => {
              const isActive = pathname.startsWith(`/${seg.slug}`)
              return (
                <Link
                  key={seg.slug}
                  href={`/${seg.slug}`}
                  className={cn(
                    'text-sm font-normal transition-colors',
                    isActive
                      ? 'text-[var(--segment-12)]'
                      : 'text-[var(--segment-9)] hover:text-[var(--segment-11)]'
                  )}
                >
                  {seg.navLabel}
                </Link>
              )
            })}
          </div>

          {/* ── Mobile: left side ── */}
          <div className="nav:hidden flex items-center">
            {isArticlePage ? (
              // Circular back button on article pages
              <Link
                href={backHref}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--segment-4)] text-[var(--segment-11)] hover:bg-[var(--segment-5)] transition-colors"
                aria-label="Back"
              >
                <ArrowLeft size={20} strokeWidth={2.5} />
              </Link>
            ) : (
              // Home link on segment index pages
              <Link
                href="/"
                className="text-sm text-[var(--segment-8)] hover:text-[var(--segment-11)] transition-colors"
              >
                Design Library
              </Link>
            )}
          </div>

          {/* ── Mobile: right side — theme toggle + hamburger ── */}
          <div className="nav:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="w-12 h-12 flex flex-col items-center justify-center gap-[5px] text-[var(--segment-11)]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-5 h-[3px] rounded-full bg-current" />
              <span className="w-5 h-[3px] rounded-full bg-current" />
              <span className="w-5 h-[3px] rounded-full bg-current" />
            </button>
          </div>

        </Container>
      </header>

      {/* ── Mobile menu overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[var(--segment-2)] flex flex-col">

          {/* Close button */}
          <div className="h-12 flex items-center justify-end px-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="w-12 h-12 flex items-center justify-center text-[var(--segment-9)] hover:text-[var(--segment-11)] transition-colors"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-8 px-8 pt-12">
            {SEGMENTS.map((seg) => {
              const isActive = pathname.startsWith(`/${seg.slug}`)
              return (
                <Link
                  key={seg.slug}
                  href={`/${seg.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'font-serif text-2xl leading-tight transition-colors',
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-primary)] opacity-50 hover:opacity-100'
                  )}
                >
                  {seg.navLabel}
                </Link>
              )
            })}
          </nav>

        </div>
      )}

      {/* ── Spacer ── */}
      <div className="h-12" />
    </>
  )
}