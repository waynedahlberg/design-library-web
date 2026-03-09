import type { ArticleMeta } from '@/lib/content/types'
import { ArticleCard } from './ArticleCard'

interface ArticleGridProps {
  articles: ArticleMeta[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm text-[var(--sand-8)]">No articles yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  )
}