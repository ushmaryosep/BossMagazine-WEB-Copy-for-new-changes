import { Link } from 'react-router-dom'
import './ArticleCard.css'

export default function ArticleCard({ article, featured = false }) {
  const { id, title, excerpt, cover_image, category, author, published_at } = article

  const formattedDate = published_at
    ? new Date(published_at).toLocaleDateString('en-PH', {
        month: 'long', year: 'numeric'
      })
    : ''

  return (
    <Link
      to={`/articles/${id}`}
      className={`article-card ${featured ? 'article-card--featured' : ''}`}
    >
      <div className="article-card__img-wrap">
        {cover_image
          ? <img src={cover_image} alt={title} className="article-card__img" />
          : (
            <div className="article-card__placeholder">
              <img src="/logo.png" alt="Boss Magazine Ph" className="article-card__placeholder-logo" />
            </div>
          )
        }
        {category && (
          <span className="article-card__category">{category}</span>
        )}
      </div>

      <div className="article-card__body">
        <h3 className="article-card__title">{title}</h3>

        {excerpt && (
          <p className="article-card__excerpt">{excerpt}</p>
        )}

        <div className="article-card__footer">
          {author && <span className="article-card__author">By {author}</span>}
          {formattedDate && <span className="article-card__date">{formattedDate}</span>}
        </div>

        <span className="article-card__read">Read Article →</span>
      </div>
    </Link>
  )
}
