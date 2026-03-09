interface TagListProps {
  tags: string[]
}

export function TagList({ tags }: TagListProps) {
  if (!tags.length) return null

  return (
    <div className="flex flex-wrap gap-2 mb-10">
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