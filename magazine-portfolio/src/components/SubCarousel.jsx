import { useState, useEffect, useRef, useCallback } from 'react'
import Lightbox from './Lightbox'
import './SubCarousel.css'

const BASE_INTERVAL = 3500

export default function SubCarousel({ images = [], title = '', description = '', objectFit = 'cover', num = 0 }) {
  const [current, setCurrent]   = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const timerRef  = useRef(null)
  const interval  = BASE_INTERVAL + num * 400

  const next = useCallback(() => setCurrent(p => (p + 1) % images.length), [images.length])

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
    if (lightbox !== null) clearInterval(timerRef.current)
    else if (images.length >= 2) startTimer()
  }, [lightbox, images.length, startTimer])

  const goTo   = (i) => { setCurrent(i); startTimer() }
  const lbNext = useCallback((i) => {
    if (typeof i === 'number') setLightbox(i)
    else setLightbox(p => (p + 1) % images.length)
  }, [images.length])
  const lbPrev = useCallback(() => setLightbox(p => (p - 1 + images.length) % images.length), [images.length])

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