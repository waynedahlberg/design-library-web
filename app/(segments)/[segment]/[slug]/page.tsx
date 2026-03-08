import { notFound } from 'next/navigation'
import { isValidSegment, SEGMENTS } from '@/lib/config/segments'
import { getArticle, getArticleSlugs } from '@/lib/content/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import Link from 'next/link'

export function generateStaticParams() {
  return SEGMENTS.flatMap((seg) =>
    getArticleSlugs(seg.slug).map((slug) => ({
      segment: seg.slug,
      slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string; slug: string }>
}) {
  const { segment, slug } = await params
  if (!isValidSegment(segment)) return {}
  const article = await getArticle(segment, slug).catch(() => null)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ segment: string; slug: string }>
}) {
  const { segment, slug } = await params
  if (!isValidSegment(segment)) notFound()

  const article = await getArticle(segment, slug).catch(() => notFound())

  return (
    <main style={{ padding: '2rem', maxWidth: '720px' }}>
      <Link href={`/${segment}`} style={{ fontSize: '0.875rem' }}>
        ← Back to {segment}
      </Link>

      <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', marginTop: '2rem' }}>
        {segment}
      </p>
      <h1 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{article.title}</h1>
      <p style={{ marginBottom: '1rem', opacity: 0.7 }}>{article.description}</p>

      {article.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {article.tags.map((tag) => (
            <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid currentColor', borderRadius: '4px' }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <hr style={{ marginBottom: '2rem' }} />

      <div>
        <MDXRemote source={article.content} components={mdxComponents} />
      </div>

      {article.application && article.application.length > 0 && (
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Application
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
            {article.application.map((item, i) => (
              <li key={i} style={{ padding: '1rem', border: '1px solid currentColor', borderRadius: '6px' }}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {article.references && article.references.length > 0 && (
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            References
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {article.references.map((ref) => (
              <li key={ref.url}>
                <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem' }}>
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}