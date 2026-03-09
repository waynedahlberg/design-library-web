import type { CoverProps } from './index'
import { cn } from '@/lib/utils'

export function MillersLawCover({ className }: CoverProps) {
  // 7 dots in a structured but slightly organic arrangement
  const dots = [
    { cx: 160, cy: 100, r: 28 },
    { cx: 100, cy: 145, r: 22 },
    { cx: 220, cy: 145, r: 22 },
    { cx: 80, cy: 210, r: 18 },
    { cx: 160, cy: 220, r: 18 },
    { cx: 240, cy: 210, r: 18 },
    { cx: 130, cy: 268, r: 14 },
  ]

  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
      aria-hidden="true"
    >
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="var(--segment-9)"
          opacity={1 - i * 0.08}
        />
      ))}
    </svg>
  )
}