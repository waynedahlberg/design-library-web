interface CodeBlockProps {
  children?: React.ReactNode
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[var(--sand-4)]">
      <pre className="bg-[var(--sand-2)] p-5 overflow-x-auto text-sm font-mono leading-6 text-[var(--sand-11)]">
        {children}
      </pre>
    </div>
  )
}