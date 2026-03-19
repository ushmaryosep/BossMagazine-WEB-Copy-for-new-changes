import { useState, useEffect, useRef, useCallback } from 'react'
import Lightbox from './Lightbox'
import './MainCarousel.css'

const INTERVAL = 4000

export default function MainCarousel({ images = [], category = '', title = '', description = '' }) {
  const [current, setCurrent]   = useState(0)
  const [lightbox, setLightbox] = useState(null) // null = closed, number = open at index
  const timerRef = useRef(null)

  const next = useCallback(() => setCurrent(p => (p + 1) % images.length), [images.length])
  const prev = useCallback(() => setCurrent(p => (p - 1 + images.length) % images.length), [images.length])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, INTERVAL)
  }, [next])

  useEffect(() => {
    if (images.length < 2) return
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer, images.length])

  // Pause auto-slide while lightbox is open
  useEffect(() => {
    if (lightbox !== null) clearInterval(timerRef.current)
    else if (images.length >= 2) startTimer()
  }, [lightbox, images.length, startTimer])

  const goTo       = (i) => { setCurrent(i); startTimer() }
  const handlePrev = (e) => { e.stopPropagation(); prev(); startTimer() }
  const handleNext = (e) => { e.stopPropagation(); next(); startTimer() }

  // Lightbox navigation
  const lbNext = useCallback((i) => {
    if (typeof i === 'number') setLightbox(i)
    else setLightbox(p => (p + 1) % images.length)
  }, [images.length])
  const lbPrev = useCallback(() => setLightbox(p => (p - 1 + images.length) % images.length), [images.length])

  if (!images.length) return null

  return (
    <>
      <div className="main-carousel">
        <div className="main-carousel__viewport">
          {images.map((src, i) => (
            <div key={i} className={`main-carousel__slide ${i === current ? 'active' : ''}`}>
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                className="main-carousel__img"
                onClick={() => setLightbox(i)}
              />
            </div>
          ))}
          <div className="main-carousel__gradient" />
        </div>

        <div className="main-carousel__zoom-hint">&#128269;</div>

        <div className="main-carousel__content">
          {category && <span className="main-carousel__tag">{category}</span>}
          <h2 className="main-carousel__title">{title}</h2>
          {description && <p className="main-carousel__desc">{description}</p>}
        </div>

        <button className="main-carousel__arrow main-carousel__arrow--prev" onClick={handlePrev} aria-label="Previous">&#8592;</button>
        <button className="main-carousel__arrow main-carousel__arrow--next" onClick={handleNext} aria-label="Next">&#8594;</button>

        <div className="main-carousel__controls">
          <div className="main-carousel__dots">
            {images.map((_, i) => (
              <button key={i} className={`main-carousel__dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
          <span className="main-carousel__counter">
            <span className="main-carousel__counter-cur">{String(current + 1).padStart(2, '0')}</span>
            <span className="main-carousel__counter-sep"> / </span>
            <span className="main-carousel__counter-tot">{String(images.length).padStart(2, '0')}</span>
          </span>
        </div>

        <div className="main-carousel__progress-bar">
          <div key={current} className="main-carousel__progress-fill" />
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={images}
          current={lightbox}
          onClose={() => setLightbox(null)}
          onNext={lbNext}
          onPrev={lbPrev}
        />
      )}
    </>
  )
}