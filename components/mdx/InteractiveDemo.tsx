import { demoRegistry } from '@/components/demos'

interface InteractiveDemoProps {
  id?: string
  height?: number
}

export function InteractiveDemo({ id, height = 320 }: InteractiveDemoProps) {
  const Demo = id ? demoRegistry[id] : undefined

  if (Demo) {
    return (
      <div className="my-8 w-full rounded-lg overflow-hidden" style={{ height }}>
        <Demo />
      </div>
    )
  }

  return (
    <div
      className="my-8 w-full rounded-lg bg-[var(--sand-3)] border border-[var(--sand-5)] border-dashed flex items-center justify-center"
      style={{ height }}
      data-demo={id}
    >
      <span className="text-xs text-[var(--sand-8)] font-mono">
        {id ? `interactive: ${id}` : 'interactive demo'}
      </span>
    </div>
  )
}
