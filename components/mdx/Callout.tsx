import { cn } from '@/lib/utils'

type CalloutType = 'default' | 'insight' | 'warning' | 'example'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const typeStyles: Record<CalloutType, string> = {
  default: 'border-[var(--sand-6)] bg-[var(--sand-3)]',
  insight: 'border-[var(--segment-7)] bg-[var(--segment-3)]',
  warning: 'border-[var(--red-7)] bg-[var(--red-3)]',
  example: 'border-[var(--sand-7)] bg-[var(--sand-4)]',
}

const titleStyles: Record<CalloutType, string> = {
  default: 'text-[var(--sand-11)]',
  insight: 'text-[var(--segment-11)]',
  warning: 'text-[var(--red-11)]',
  example: 'text-[var(--sand-11)]',
}

export function Callout({ type = 'default', title, children }: CalloutProps) {
  return (
    <div className={cn('border rounded-lg px-5 py-4 my-6', typeStyles[type])}>
      {title && (
        <p className={cn('text-xs font-semibold uppercase tracking-widest mb-2', titleStyles[type])}>
          {title}
        </p>
      )}
      <div className="text-sm leading-6 text-[var(--sand-11)]">
        {children}
      </div>
    </div>
  )
}