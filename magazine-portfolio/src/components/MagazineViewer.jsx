import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import './MagazineViewer.css'

export default function MagazineViewer({ magazine, onClose }) {
  const [page, setPage]         = useState(0)
  const [zoom, setZoom]         = useState(false)
  const [direction, setDir]     = useState('next')
  const [animating, setAnim]    = useState(false)
  const [thumbsOpen, setThumbs] = useState(false)
  const [loaded, setLoaded]     = useState({})
  const touchStartX = useRef(null)
  const thumbRef    = useRef(null)

  const pages = magazine.pages
  const total = pages.length

  // Preload current, next and prev
  useEffect(() => {
    [-1, 0, 1, 2].forEach(offset => {
      const i = page + offset
      if (i >= 0 && i < total && !loaded[i]) {
        const img = new Image()
        img.src = pages[i]
        img.onload = () => setLoaded(prev => ({ ...prev, [i]: true }))
      }
    })
  }, [page, pages, total, loaded])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [])

  const goTo = useCallback((i, dir = 'next') => {
    if (animating || i < 0 || i >= total) return
    setDir(dir)
    setAnim(true)
    setTimeout(() => {
      setPage(i)
      setZoom(false)
      setAnim(false)
    }, 280)
  }, [animating, total])

  const goPrev = useCallback(() => goTo(page - 1, 'prev'), [page, goTo])
  const goNext = useCallback(() => goTo(page + 1, 'next'), [page, goTo])

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  goNext()
      if (e.key === 'ArrowLeft')   goPrev()
      if (e.key === '+')           setZoom(true)
      if (e.key === '-')           setZoom(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, goNext, goPrev])

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? goNext() : goPrev()
    touchStartX.current = null
  }

  // Scroll thumbnail into view
  useEffect(() => {
    if (!thumbRef.current) return
    const el = thumbRef.current.querySelector(`[data-idx="${page}"]`)
    if (el) el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [page, thumbsOpen])

  const content = (
    <div className="mv" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <div className="mv__bar">
        <div className="mv__bar-left">
          <button className="mv__close" onClick={onClose} aria-label="Close">&#10005;</button>
          <div className="mv__issue-info">
            <span className="mv__issue-label">{magazine.issue}</span>
            <span className="mv__issue-title">{magazine.title}</span>
          </div>
        </div>
        <div className="mv__bar-center">
          <span className="mv__counter">
            <span className="mv__counter-cur">{String(page + 1).padStart(2, '0')}</span>
            <span className="mv__counter-sep"> / </span>
            <span className="mv__counter-tot">{String(total).padStart(2, '0')}</span>
          </span>
        </div>
        <div className="mv__bar-right">
          <button
            className={`mv__btn ${zoom ? 'active' : ''}`}
            onClick={() => setZoom(z => !z)}
            aria-label="Toggle zoom"
            title="Zoom (+ / -)"
          >
            {zoom ? '&#128270;' : '&#128269;'}
          </button>
          <button
            className={`mv__btn ${thumbsOpen ? 'active' : ''}`}
            onClick={() => setThumbs(t => !t)}
            aria-label="Toggle thumbnails"
            title="Page thumbnails"
          >
            &#9783;
          </button>
        </div>
      </div>

      {/* ── MAIN VIEWER ─────────────────────────────────────── */}
      <div className="mv__stage" onClick={() => !zoom && goNext()}>

        <div
          className={`mv__page-wrap ${animating ? `mv__page-wrap--${direction}` : ''} ${zoom ? 'mv__page-wrap--zoomed' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <img
            src={pages[page]}
            alt={`Page ${page + 1}`}
            className="mv__page-img"
            draggable={false}
          />
          {!loaded[page] && <div className="mv__page-loading"><div className="mv__spinner" /></div>}
        </div>

        {/* Side nav zones — only visible on desktop */}
        <button className="mv__nav mv__nav--prev" onClick={e => { e.stopPropagation(); goPrev() }} disabled={page === 0} aria-label="Previous page">
          &#8592;
        </button>
        <button className="mv__nav mv__nav--next" onClick={e => { e.stopPropagation(); goNext() }} disabled={page === total - 1} aria-label="Next page">
          &#8594;
        </button>
      </div>

      {/* ── BOTTOM PROGRESS BAR ─────────────────────────────── */}
      <div className="mv__progress-track">
        <div className="mv__progress-fill" style={{ width: `${((page + 1) / total) * 100}%` }} />
      </div>

      {/* ── BOTTOM NAV ──────────────────────────────────────── */}
      <div className="mv__bottom">
        <button className="mv__bottom-btn" onClick={goPrev} disabled={page === 0}>&#8592; Prev</button>
        <button className="mv__bottom-btn mv__bottom-btn--thumb" onClick={() => setThumbs(t => !t)}>
          {thumbsOpen ? 'Hide Pages' : 'All Pages'}
        </button>
        <button className="mv__bottom-btn" onClick={goNext} disabled={page === total - 1}>Next &#8594;</button>
      </div>

      {/* ── THUMBNAIL STRIP ─────────────────────────────────── */}
      {thumbsOpen && (
        <div className="mv__thumbs" ref={thumbRef}>
          <div className="mv__thumbs-inner">
            {pages.map((src, i) => (
              <button
                key={i}
                data-idx={i}
                className={`mv__thumb ${i === page ? 'active' : ''}`}
                onClick={() => { goTo(i, i > page ? 'next' : 'prev'); setThumbs(false) }}
                aria-label={`Page ${i + 1}`}
              >
                <img src={src} alt={`Page ${i + 1}`} loading="lazy" />
                <span className="mv__thumb-num">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return createPortal(content, document.body)
}