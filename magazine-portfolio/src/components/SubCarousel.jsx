import { useState, useEffect, useRef, useCallback } from 'react'
import './SubCarousel.css'

const INTERVAL = 3500

export default function SubCarousel({ images = [], title = '', description = '', objectFit = 'cover', num = '' }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % images.length)
  }, [images.length])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, INTERVAL + num * 400)
  }, [next, num])

  useEffect(() => {
    if (images.length < 2) return
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer, images.length])

  const goTo = (i) => { setCurrent(i); startTimer() }

  if (!images.length) return (
    <div className="sub-carousel sub-carousel--empty">
      <span className="sub-carousel__empty-label">Coming Soon</span>
    </div>
  )

  return (
    <div className="sub-carousel">
      {/* Image slides */}
      <div className="sub-carousel__viewport">
        {images.map((src, i) => (
          <div key={i} className={`sub-carousel__slide ${i === current ? 'active' : ''}`}>
            <img
              src={src}
              alt={`${title} ${i + 1}`}
              className="sub-carousel__img"
              style={{ objectFit }}
            />
          </div>
        ))}
        <div className="sub-carousel__overlay" />
      </div>

      {/* Text info at bottom */}
      <div className="sub-carousel__info">
        {title && <h3 className="sub-carousel__title">{title}</h3>}
        {description && <p className="sub-carousel__desc">{description}</p>}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="sub-carousel__dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`sub-carousel__dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="sub-carousel__progress">
        <div key={current} className="sub-carousel__progress-fill" style={{ animationDuration: `${INTERVAL + num * 400}ms` }} />
      </div>
    </div>
  )
}
