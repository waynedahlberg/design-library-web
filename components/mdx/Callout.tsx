export function Callout({ children, type = 'default' }: { children: React.ReactNode; type?: string }) {
  return <div data-callout={type}>{children}</div>
}