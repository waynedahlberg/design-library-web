import type { CoverProps } from './index'
import { cn } from '@/lib/utils'

export function HicksLawCover({ className }: CoverProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
      aria-hidden="true"
    >
      {/* Stem */}
      <line x1="160" y1="280" x2="160" y2="180" stroke="var(--segment-9)" strokeWidth="6" strokeLinecap="round" />
      {/* First split */}
      <line x1="160" y1="180" x2="100" y2="120" stroke="var(--segment-9)" strokeWidth="6" strokeLinecap="round" />
      <line x1="160" y1="180" x2="220" y2="120" stroke="var(--segment-9)" strokeWidth="6" strokeLinecap="round" />
      {/* Second split — left */}
      <line x1="100" y1="120" x2="70" y2="70" stroke="var(--segment-8)" strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="120" x2="130" y2="70" stroke="var(--segment-8)" strokeWidth="4" strokeLinecap="round" />
      {/* Second split — right */}
      <line x1="220" y1="120" x2="190" y2="70" stroke="var(--segment-8)" strokeWidth="4" strokeLinecap="round" />
      <line x1="220" y1="120" x2="250" y2="70" stroke="var(--segment-8)" strokeWidth="4" strokeLinecap="round" />
      {/* Terminal dots */}
      <circle cx="70" cy="60" r="8" fill="var(--segment-7)" />
      <circle cx="130" cy="60" r="8" fill="var(--segment-7)" />
      <circle cx="190" cy="60" r="8" fill="var(--segment-7)" />
      <circle cx="250" cy="60" r="8" fill="var(--segment-7)" />
    </svg>
  )
}