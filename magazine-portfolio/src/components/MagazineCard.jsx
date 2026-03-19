import './MagazineCard.css'

export default function MagazineCard({ magazine, onOpen }) {
  const { title, issue, date, cover_image, pages } = magazine

  return (
    <div className="mag-card" onClick={() => onOpen && onOpen(magazine)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpen && onOpen(magazine)}>
      <div className="mag-card__cover">
        {cover_image
          ? <img src={cover_image} alt={title} className="mag-card__img" />
          : (
            <div className="mag-card__placeholder">
              <span className="mag-card__placeholder-logo">Boss</span>
              <span className="mag-card__placeholder-issue">{issue}</span>
            </div>
          )
        }
        <div className="mag-card__overlay">
          <span>Read Issue →</span>
          {pages && <span className="mag-card__overlay-pages">{pages.length} pages</span>}
        </div>
      </div>

      <div className="mag-card__info">
        <span className="mag-card__title">{title}</span>
        <span className="mag-card__date">{date}</span>
      </div>
    </div>
  )
}