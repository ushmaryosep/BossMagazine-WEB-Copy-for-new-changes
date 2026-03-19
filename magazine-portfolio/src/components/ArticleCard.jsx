import { Link } from 'react-router-dom'
import './ArticleCard.css'

export default function ArticleCard({ article, featured = false }) {
  const { id, title, excerpt, cover_image, category, author, created_at } = article

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })
    : ''

  return (
    <Link to={`/articles/${id}`} className={`article-card ${featured ? 'article-card--featured' : ''}`}>
      <div className="article-card__img-wrap">
        {cover_image
          ? <img src={cover_image} alt={title} className="article-card__img" />
          : <div className="article-card__img-placeholder"><span>Boss Magazine Ph</span></div>
        }
      </div>

      <div className="article-card__body">
        <div className="article-card__meta">
          {category && <span className="article-card__tag">{category}</span>}
          {formattedDate && <span className="article-card__date">{formattedDate}</span>}
        </div>

        <h3 className="article-card__title">{title}</h3>

        {excerpt && (
          <p className="article-card__excerpt">{excerpt}</p>
        )}

        {author && (
          <span className="article-card__pub">By {author}</span>
        )}

        <span className="article-card__read">Read Article →</span>
      </div>
    </Link>
  )
}
