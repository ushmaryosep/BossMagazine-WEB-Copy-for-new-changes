import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './ArticleDetail.css'

export default function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setArticle(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="article-detail__loading">
      <span className="loading__dot"/><span className="loading__dot"/><span className="loading__dot"/>
    </div>
  )

  if (!article) return (
    <div className="article-detail__not-found">
      <h2>Article not found</h2>
      <Link to="/articles" className="btn-primary">Back to Articles</Link>
    </div>
  )


  return (
    <main className="article-detail">
      <div className="article-detail__hero">
        {article.cover_image && (
          <div className="article-detail__cover">
            <img src={article.cover_image} alt={article.title} />
          </div>
        )}
        <div className="article-detail__header">
          <div className="article-detail__meta">
            {article.category && (
              <span className="article-detail__tag">{article.category}</span>
            )}
          {/* Change formattedDate to article.published_at */}
            {article.published_at && (
              <span className="article-detail__date">{article.published_at}</span>
            )}
          </div>
          <h1 className="article-detail__title">{article.title}</h1>
          {article.excerpt && (
            <p className="article-detail__excerpt">{article.excerpt}</p>
          )}
          {article.author && (
            <p className="article-detail__pub">By <em>{article.author}</em></p>
          )}
        </div>
      </div>

      <div className="article-detail__body">
        {article.content
          ? article.content.split('\n').map((para, i) =>
              para.trim()
                ? <p key={i}>{para}</p>
                : <br key={i} />
            )
          : <p className="empty-state">Full article content coming soon.</p>
        }
      </div>

      <div className="article-detail__footer">
        <Link to="/articles" className="article-detail__back">← Back to Articles</Link>
      </div>
    </main>
  )
}