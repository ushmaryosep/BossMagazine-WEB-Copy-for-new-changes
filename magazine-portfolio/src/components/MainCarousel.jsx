import { useState, useEffect, useRef, useCallback } from 'react'
import './MainCarousel.css'

const INTERVAL = 4000

export default function MainCarousel({ images = [], category = '', title = '', description = '' }) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const timerRef = useRef(null)

  const next = useCallback(() => setCurrent(prev => (prev + 1) % images.length), [images.length])
  const prev = useCallback(() => setCurrent(prev => (prev - 1 + images.length) % images.length), [images.length])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, INTERVAL)
  }, [next])

  useEffect(() => {
    if (images.length < 2) return
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer, images.length])

  // Pause timer when lightbox is open
  useEffect(() => {
    if (lightbox !== null) {
      clearInterval(timerRef.current)
    } else {
      if (images.length >= 2) startTimer()
    }
  }, [lightbox, images.length, startTimer])

  // Keyboard: Escape closes, arrow keys navigate lightbox
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
  const handlePrev = (e) => { e.stopPropagation(); prev(); startTimer() }
  const handleNext = (e) => { e.stopPropagation(); next(); startTimer() }

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
                title="Click to view full image"
              />
            </div>
          ))}
          <div className="main-carousel__gradient" />
        </div>

        {/* Zoom hint */}
        <div className="main-carousel__zoom-hint">
          <span>&#128269;</span>
        </div>

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