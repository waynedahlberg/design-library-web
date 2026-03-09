import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout'
import { Diagram } from './Diagram'
import { InteractiveDemo } from './InteractiveDemo'
import { CodeBlock } from './CodeBlock'

export const mdxComponents: MDXComponents = {
  // ── Block elements ──
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl mt-16 mb-6 text-[var(--segment-12)] leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-sans text-2xl mt-12 mb-4 text-[var(--segment-12)]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-sans text-xl mt-8 mb-3 text-[var(--segment-11)]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base leading-7 text-[var(--sand-11)] mb-5">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 mb-5 space-y-2 text-[var(--sand-11)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 mb-5 space-y-2 text-[var(--sand-11)]">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base leading-7">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--segment-7)] pl-4 my-6 text-[var(--sand-10)] italic">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="border-[var(--sand-4)] my-10" />
  ),

  // ── Inline elements ──
  a: ({ href, children }) => (
    <a href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-[var(--segment-9)] underline underline-offset-2 hover:text-[var(--segment-10)] transition-colors">
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--sand-12)]">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[var(--sand-11)]">
      {children}
    </em>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-[var(--sand-3)] text-[var(--segment-11)] px-1.5 py-0.5 rounded">
      {children}
    </code>
  ),

  // ── Code blocks ──
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,

  // ── Custom JSX components available in all MDX files ──
  Callout,
  Diagram,
  InteractiveDemo,
}