import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Lightbox.css'

export default function Lightbox({ images, current, onClose, onPrev, onNext }) {
  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = prev
      document.body.style.touchAction = ''
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  onNext()
      if (e.key === 'ArrowLeft')   onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])

  const content = (
    <div
      className="lb"
      onClick={onClose}
      onTouchStart={e => e.stopPropagation()}
      onTouchMove={e => { e.stopPropagation(); e.preventDefault() }}
    >
      {/* Close */}
      <button className="lb__close" onClick={onClose} aria-label="Close">&#10005;</button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="lb__arrow lb__arrow--prev"
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
        >&#8592;</button>
      )}

      {/* Image */}
      <div className="lb__img-wrap" onClick={e => e.stopPropagation()}>
        <img
          key={current}
          src={images[current]}
          alt={`Image ${current + 1}`}
          className="lb__img"
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="lb__arrow lb__arrow--next"
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next"
        >&#8594;</button>
      )}

      {/* Counter */}
      <div className="lb__counter" onClick={e => e.stopPropagation()}>
        {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="lb__dots" onClick={e => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`lb__dot ${i === current ? 'active' : ''}`}
              onClick={e => { e.stopPropagation(); onNext(i) }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )

  return createPortal(content, document.body)
}