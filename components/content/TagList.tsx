interface TagListProps {
  tags: string[]
  className?: string
}

export function TagList({ tags, className }: TagListProps) {
  if (!tags.length) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ''}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] uppercase tracking-widest text-[var(--segment-9)] border border-[var(--segment-6)] rounded px-2.5 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}