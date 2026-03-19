import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import './MagazineViewer.css'

export default function MagazineViewer({ magazine, onClose }) {
  // spreadIndex: 0 = cover alone, 1 = pages 2-3, 2 = pages 4-5, etc.
  const [spread, setSpread]     = useState(0)
  const [zoom, setZoom]         = useState(false)
  const [direction, setDir]     = useState('next')
  const [animating, setAnim]    = useState(false)
  const [thumbsOpen, setThumbs] = useState(false)
  const [loaded, setLoaded]     = useState({})
  const touchStartX = useRef(null)
  const thumbRef    = useRef(null)

  const pages = magazine.pages
  const total = pages.length

  // Spread helpers
  // spread 0 → [0] (cover alone)
  // spread 1 → [1, 2]
  // spread 2 → [3, 4]  etc.
  const getSpreadPages = (s) => {
    if (s === 0) return [0]
    const left = 1 + (s - 1) * 2
    const right = left + 1
    return right < total ? [left, right] : [left]
  }

  const totalSpreads = Math.ceil((total - 1) / 2) + 1

  const currentPages = getSpreadPages(spread)
  // For counter display: show page range
  const pageLabel = currentPages.length === 2
    ? `${currentPages[0] + 1} – ${currentPages[1] + 1}`
    : `${currentPages[0] + 1}`

  // Preload surrounding pages
  useEffect(() => {
    const toLoad = []
    getSpreadPages(spread).forEach(i => toLoad.push(i - 1, i, i + 1, i + 2))
    toLoad.forEach(i => {
      if (i >= 0 && i < total && !loaded[i]) {
        const img = new Image()
        img.src = pages[i]
        img.onload = () => setLoaded(prev => ({ ...prev, [i]: true }))
      }
    })
  }, [spread, pages, total])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [])

  const goTo = useCallback((s, dir = 'next') => {
    if (animating || s < 0 || s >= totalSpreads) return
    setDir(dir)
    setAnim(true)
    setTimeout(() => {
      setSpread(s)
      setZoom(false)
      setAnim(false)
    }, 260)
  }, [animating, totalSpreads])

  const goPrev = useCallback(() => goTo(spread - 1, 'prev'), [spread, goTo])
  const goNext = useCallback(() => goTo(spread + 1, 'next'), [spread, goTo])

  // Jump to spread that contains a given page index
  const goToPage = (pageIdx) => {
    if (pageIdx === 0) goTo(0, pageIdx > currentPages[0] ? 'next' : 'prev')
    else {
      const s = Math.floor((pageIdx - 1) / 2) + 1
      goTo(s, s > spread ? 'next' : 'prev')
    }
    setThumbs(false)
  }

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === '+')          setZoom(true)
      if (e.key === '-')          setZoom(false)
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

  // Scroll active thumb into view
  useEffect(() => {
    if (!thumbRef.current) return
    const el = thumbRef.current.querySelector('.mv__thumb.active')
    if (el) el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [spread, thumbsOpen])

  const isSinglePage = currentPages.length === 1
  const progress = ((spread + 1) / totalSpreads) * 100

  const content = (
    <div className="mv" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <div className="mv__bar">
        <div className="mv__bar-left">
          <button className="mv__close" onClick={onClose} aria-label="Close">✕</button>
          <div className="mv__issue-info">
            <span className="mv__issue-label">{magazine.issue}</span>
            <span className="mv__issue-title">{magazine.title}</span>
          </div>
        </div>

        <div className="mv__bar-center">
          <span className="mv__counter">
            <span className="mv__counter-cur">{pageLabel}</span>
            <span className="mv__counter-sep"> / </span>
            <span className="mv__counter-tot">{total}</span>
          </span>
        </div>

        <div className="mv__bar-right">
          <button
            className={`mv__btn ${zoom ? 'mv__btn--active' : ''}`}
            onClick={() => setZoom(z => !z)}
            aria-label="Toggle zoom"
            title="Zoom"
          >{zoom ? '🔎' : '🔍'}</button>
          <button
            className={`mv__btn ${thumbsOpen ? 'mv__btn--active' : ''}`}
            onClick={() => setThumbs(t => !t)}
            aria-label="Toggle thumbnails"
            title="All pages"
          >☰</button>
        </div>
      </div>

      {/* ── STAGE ───────────────────────────────────────────── */}
      <div className="mv__stage">

        <button
          className="mv__nav mv__nav--prev"
          onClick={goPrev}
          disabled={spread === 0}
          aria-label="Previous spread"
        >←</button>

        {/* Book spread */}
        <div className={`mv__spread ${isSinglePage ? 'mv__spread--single' : ''} ${animating ? `mv__spread--${direction}` : ''} ${zoom ? 'mv__spread--zoomed' : ''}`}>

          {/* Left page (or single cover) */}
          <div className="mv__page mv__page--left">
            <img
              src={pages[currentPages[0]]}
              alt={`Page ${currentPages[0] + 1}`}
              className="mv__page-img"
              draggable={false}
            />
            {!loaded[currentPages[0]] && (
              <div className="mv__page-loading"><div className="mv__spinner" /></div>
            )}
            <span className="mv__page-num">{currentPages[0] + 1}</span>
          </div>

          {/* Right page — only on spreads */}
          {!isSinglePage && (
            <>
              <div className="mv__spine" />
              <div className="mv__page mv__page--right">
                <img
                  src={pages[currentPages[1]]}
                  alt={`Page ${currentPages[1] + 1}`}
                  className="mv__page-img"
                  draggable={false}
                />
                {!loaded[currentPages[1]] && (
                  <div className="mv__page-loading"><div className="mv__spinner" /></div>
                )}
                <span className="mv__page-num">{currentPages[1] + 1}</span>
              </div>
            </>
          )}
        </div>

        <button
          className="mv__nav mv__nav--next"
          onClick={goNext}
          disabled={spread === totalSpreads - 1}
          aria-label="Next spread"
        >→</button>

      </div>

      {/* ── PROGRESS ────────────────────────────────────────── */}
      <div className="mv__progress-track">
        <div className="mv__progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ── BOTTOM NAV ──────────────────────────────────────── */}
      <div className="mv__bottom">
        <button className="mv__bottom-btn" onClick={goPrev} disabled={spread === 0}>← Prev</button>
        <button className="mv__bottom-btn mv__bottom-btn--mid" onClick={() => setThumbs(t => !t)}>
          {thumbsOpen ? 'Hide Pages' : 'All Pages'}
        </button>
        <button className="mv__bottom-btn" onClick={goNext} disabled={spread === totalSpreads - 1}>Next →</button>
      </div>

      {/* ── THUMBNAIL STRIP ─────────────────────────────────── */}
      {thumbsOpen && (
        <div className="mv__thumbs" ref={thumbRef}>
          <div className="mv__thumbs-inner">
            {pages.map((src, i) => {
              const isActive = currentPages.includes(i)
              return (
                <button
                  key={i}
                  className={`mv__thumb ${isActive ? 'active' : ''}`}
                  onClick={() => goToPage(i)}
                  aria-label={`Page ${i + 1}`}
                >
                  <img src={src} alt={`Page ${i + 1}`} loading="lazy" />
                  <span className="mv__thumb-num">{i + 1}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )

  return createPortal(content, document.body)
}