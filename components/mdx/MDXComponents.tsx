// components/mdx/MDXComponents.tsx

import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout'
import { Diagram } from './Diagram'
import { InteractiveDemo } from './InteractiveDemo'
import { CodeBlock } from './CodeBlock'

export const mdxComponents: MDXComponents = {
  // Override HTML elements
  h2: ({ children }) => (
    <h2 className="font-serif text-3xl mt-12 mb-4 text-[var(--segment-12)]">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xl mt-8 mb-3 text-[var(--segment-11)]">{children}</h3>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-[var(--segment-9)] underline underline-offset-2 hover:text-[var(--segment-10)]">
      {children}
    </a>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,

  // Custom JSX components available in all MDX files
  Callout,
  Diagram,
  InteractiveDemo,
}