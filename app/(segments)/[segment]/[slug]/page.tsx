import { notFound } from 'next/navigation'
import { isValidSegment, SEGMENTS } from '@/lib/config/segments'
import { getArticle, getArticleSlugs } from '@/lib/content/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { ArticleHeader } from '@/components/content/ArticleHeader'
import { ReferencesSection } from '@/components/content/ReferencesSection'
import { Container } from '@/components/layout/Container'

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
    <>
      <ArticleHeader article={article} />

      <Container fluid className="max-w-[1080px] py-8">
        {/* ── Two-column on desktop, stacked on mobile ── */}
        <div className="mt-10 flex flex-col nav:grid nav:grid-cols-[1fr_400px] nav:gap-16">

          {/* ── Left: prose body ── */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-[var(--sand-8)] mb-8">
              Summary
            </h2>
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>

          {/* ── Right: application + references ── */}
          <div className="flex flex-col gap-12 mt-8 sm:mt-0 pt-[2.125rem] sm:pt-0">

            {article.application && article.application.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-widest text-[var(--sand-8)] mb-8">
                  Application
                </h2>
                <ul className="flex flex-col gap-4">
                  {article.application.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm leading-6 text-[var(--sand-10)] px-5 py-4 bg-[var(--sand-2)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ReferencesSection references={article.references ?? []} />

          </div>
        </div>
      </Container>
    </>
  )
}