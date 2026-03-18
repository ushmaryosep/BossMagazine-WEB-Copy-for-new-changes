import './MagazineCard.css'

export default function MagazineCard({ magazine }) {
  const { title, issue, date, cover_image, link } = magazine

  const handleClick = () => {
    if (link) window.open(link, '_blank', 'noreferrer')
  }

  return (
    <div className="mag-card" onClick={handleClick} role={link ? 'button' : undefined} tabIndex={link ? 0 : undefined}>
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
        {link && <div className="mag-card__overlay"><span>View Issue →</span></div>}
      </div>

      <div className="mag-card__info">
        <span className="mag-card__title">{title}</span>
        <span className="mag-card__date">{date}</span>
      </div>
    </div>
  )
}
