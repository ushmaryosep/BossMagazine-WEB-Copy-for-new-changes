import { useState, useEffect, useRef, useCallback } from 'react'
import './SubCarousel.css'

const BASE_INTERVAL = 3500

export default function SubCarousel({ images = [], title = '', description = '', objectFit = 'cover', num = 0 }) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const timerRef = useRef(null)
  const interval = BASE_INTERVAL + num * 400

  const next = useCallback(() => setCurrent(prev => (prev + 1) % images.length), [images.length])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, interval)
  }, [next, interval])

  useEffect(() => {
    if (images.length < 2) return
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer, images.length])

  useEffect(() => {
    if (lightbox !== null) {
      clearInterval(timerRef.current)
    } else {
      if (images.length >= 2) startTimer()
    }
  }, [lightbox, images.length, startTimer])

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(prev => (prev + 1) % images.length)
      if (e.key === 'ArrowLeft')  setLightbox(prev => (prev - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, images.length])

  const goTo = (i) => { setCurrent(i); startTimer() }

  if (!images.length) return (
    <div className="sub-carousel sub-carousel--empty">
      <span className="sub-carousel__empty-label">Coming Soon</span>
    </div>
  )

  return (
    <>
      <div className="sub-carousel">
        <div className="sub-carousel__viewport">
          {images.map((src, i) => (
            <div key={i} className={`sub-carousel__slide ${i === current ? 'active' : ''}`}>
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                className="sub-carousel__img"
                style={{ objectFit }}
                onClick={() => setLightbox(i)}
                title="Click to view full image"
              />
            </div>
          ))}
          <div className="sub-carousel__overlay" />
        </div>

        <div className="sub-carousel__zoom-hint">&#128269;</div>

        <div className="sub-carousel__info">
          {title && <h3 className="sub-carousel__title">{title}</h3>}
          {description && <p className="sub-carousel__desc">{description}</p>}
        </div>

        {images.length > 1 && (
          <div className="sub-carousel__dots">
            {images.map((_, i) => (
              <button key={i} className={`sub-carousel__dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        )}

        <div className="sub-carousel__progress">
          <div key={current} className="sub-carousel__progress-fill" style={{ animationDuration: `${interval}ms` }} />
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Close">&#10005;</button>

          <button
            className="lightbox__arrow lightbox__arrow--prev"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => (prev - 1 + images.length) % images.length) }}
            aria-label="Previous"
          >&#8592;</button>

          <div className="lightbox__img-wrap" onClick={e => e.stopPropagation()}>
            <img src={images[lightbox]} alt={`${title} ${lightbox + 1}`} className="lightbox__img" />
          </div>

          <button
            className="lightbox__arrow lightbox__arrow--next"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => (prev + 1) % images.length) }}
            aria-label="Next"
          >&#8594;</button>

          <div className="lightbox__counter">
            {String(lightbox + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>

          <div className="lightbox__dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`lightbox__dot ${i === lightbox ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}