import type { CoverProps } from './index'
import { cn } from '@/lib/utils'

export function FittsLawCover({ className }: CoverProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
      aria-hidden="true"
    >
      {/* Top half-circle — bowl facing down */}
      <path
        d="M 60 160 A 100 100 0 0 0 260 160 Z"
        fill="var(--segment-9)"
      />
      {/* Bottom half-circle — bowl facing up */}
      <path
        d="M 60 160 A 100 100 0 0 1 260 160 Z"
        fill="var(--segment-9)"
      />
      {/* Subtle inner highlight on top bowl */}
      <path
        d="M 100 160 A 60 60 0 0 0 220 160 Z"
        fill="var(--segment-8)"
        opacity="0.4"
      />
    </svg>
  )
}