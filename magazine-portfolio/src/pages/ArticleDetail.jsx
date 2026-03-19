import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './ArticleDetail.css'

export default function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
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
        // Fetch related by same category
        if (data?.category) {
          supabase
            .from('articles')
            .select('id, title, excerpt, cover_image, category, author, published_at')
            .eq('category', data.category)
            .neq('id', id)
            .limit(3)
            .then(({ data: rel }) => setRelated(rel || []))
        }
      })
  }, [id])

  if (loading) return (
    <div className="article-detail__loading">
      <span className="loading__dot"/>
      <span className="loading__dot"/>
      <span className="loading__dot"/>
    </div>
  )

  if (!article) return (
    <div className="article-detail__not-found">
      <h2>Article not found</h2>
      <p>This article may have been removed or the link is incorrect.</p>
      <Link to="/articles" className="btn-primary">Back to Articles</Link>
    </div>
  )

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-PH', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    : ''

  return (
    <main className="article-detail">

      {/* Cover image — full bleed */}
      {article.cover_image && (
        <div className="article-detail__cover">
          <img src={article.cover_image} alt={article.title} />
          <div className="article-detail__cover-overlay" />
        </div>
      )}

      {/* Header */}
      <div className="article-detail__header">
        <div className="article-detail__meta">
          {article.category && (
            <Link
              to={`/articles?category=${article.category}`}
              className="article-detail__tag"
            >
              {article.category}
            </Link>
          )}
          {formattedDate && (
            <span className="article-detail__date">{formattedDate}</span>
          )}
        </div>

        <h1 className="article-detail__title">{article.title}</h1>

        {article.excerpt && (
          <p className="article-detail__excerpt">{article.excerpt}</p>
        )}

        {article.author && (
          <div className="article-detail__byline">
            <span className="article-detail__byline-label">By</span>
            <span className="article-detail__byline-name">{article.author}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="article-detail__divider">
        <span />
        <span className="article-detail__divider-icon">✦</span>
        <span />
      </div>

      {/* Body content */}
      <div className="article-detail__body">
        {article.content
          ? article.content.split('\n').map((para, i) =>
              para.trim()
                ? <p key={i}>{para}</p>
                : <br key={i} />
            )
          : <p className="article-detail__no-content">Full article content coming soon.</p>
        }
      </div>

      {/* Footer nav */}
      <div className="article-detail__footer">
        <Link to="/articles" className="article-detail__back">
          ← Back to Articles
        </Link>
        {article.category && (
          <Link
            to="/articles"
            className="article-detail__category-link"
          >
            More in {article.category} →
          </Link>
        )}
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="article-detail__related">
          <div className="article-detail__related-header">
            <span className="section-label">Related Articles</span>
          </div>
          <div className="article-detail__related-grid">
            {related.map(a => (
              <Link key={a.id} to={`/articles/${a.id}`} className="related-card">
                <div className="related-card__img">
                  {a.cover_image
                    ? <img src={a.cover_image} alt={a.title} />
                    : <div className="related-card__placeholder">
                        <img src="/logo.png" alt="" />
                      </div>
                  }
                  {a.category && <span className="related-card__cat">{a.category}</span>}
                </div>
                <div className="related-card__body">
                  <h4 className="related-card__title">{a.title}</h4>
                  {a.author && <span className="related-card__author">By {a.author}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}
