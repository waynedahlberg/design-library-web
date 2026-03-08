interface DiagramProps {
  id?: string
  caption?: string
  aspectRatio?: string
}

export function Diagram({ id, caption, aspectRatio = '16/9' }: DiagramProps) {
  return (
    <figure className="my-8" data-diagram={id}>
      <div
        className="w-full rounded-lg bg-[var(--sand-3)] border border-[var(--sand-5)] flex items-center justify-center"
        style={{ aspectRatio }}
      >
        <span className="text-xs text-[var(--sand-8)] font-mono">
          {id ? `diagram: ${id}` : 'diagram'}
        </span>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-[var(--sand-9)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}