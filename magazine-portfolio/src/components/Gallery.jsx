import { useState, useCallback } from 'react'
import Lightbox from './Lightbox'
import './Gallery.css'

// ─── Homepage image preview (8 shown) ───────────────────────────────────────
const GALLERY_PREVIEW = [
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-27-09-401.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-27-10-202.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-27-10-224.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-34-59-170.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-34-59-257.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-34-59-405.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-53-38-394.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-53-39-112.jpg?raw=true',
]

// ─── Additional homepage videos (shown in video strip) ───────────────────────
const HOME_VIDEOS = [
  { id: 'Bu-KmA8z2ro', short: false },
  { id: 'kWf286bz-hg', short: false },
  { id: 'qds6ER6hzT4', short: false },
  { id: 'T4NLEFtq564', short: false },
  { id: 'mKmQx87NkvQ', short: false },
  { id: 'pSIvE_8cfZQ', short: true  },
]

// ─── ALL videos in overall gallery (homepage videos + original 3) ─────────────
const ALL_VIDEO_IDS = [
  { id: 'pLx5EIT0jzY', short: false },
  { id: 'iYBtU81QlCQ', short: false },
  { id: '9jKHgBnvlsw', short: false },
  { id: 'Bu-KmA8z2ro', short: false },
  { id: 'kWf286bz-hg', short: false },
  { id: 'qds6ER6hzT4', short: false },
  { id: 'T4NLEFtq564', short: false },
  { id: 'mKmQx87NkvQ', short: false },
  { id: 'pSIvE_8cfZQ', short: true  },
]

// ─── ALL photos in overall gallery ───────────────────────────────────────────
const ALL_IMAGES = [
  // Additional gallery images set 1
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-27-09-401.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-27-10-202.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-27-10-224.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-34-59-170.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-34-59-257.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-34-59-405.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-53-38-394.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-53-39-112.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-53-39-657.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%20FOR%20GALLERY/viber_image_2026-01-27_21-53-39-807.jpg?raw=true',
  // Additional images set 2
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-03_09-23-56-369.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-03_09-23-57-407.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-03_09-24-15-347.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-12-433.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-12-536.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-12-627.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-26-906.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-26-975.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-27-027.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-27-067.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-27-227.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-27-339.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/ADDITIONAL%20IMAGES%202/viber_image_2024-12-19_21-47-27-446.jpg?raw=true',
  // Main Carousel 1
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/1.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/2.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/3.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/4.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/5.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/6.png',
  // Sub Carousel 2
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/1.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/2.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/3.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/4.png',
  // Sub Carousel 3 — Expos
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/MALAYSIA%20CONSTRUCTION%20EXPO%202026.jpg',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/MALAYSIA%20ELECTRICITY%20EXPO%202026.jpg',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/PH%20CONSTRUCTION%20EXPO%202026.jpg',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/PH%20PHARMA%20EXPO%202026.jpg',
  // Sub Carousel 4
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/1.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/2.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/3.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/4.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/5.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/6.png',
  // Lugaw 101 Feature
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-47-331.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-47-545.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-47-750.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-47-846.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-47-936.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-48-055.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-48-216.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-48-346.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-48-436.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-48-535.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-48-627.jpg?raw=true',
  'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/LUGAW%20101%20FEATURE/viber_image_2026-03-20_14-54-48-728.jpg?raw=true',
]

const SPAN_PATTERN = ['wide', 'tall', 'normal', 'normal', 'wide', 'tall', 'normal', 'normal']

function embedUrl({ id, short }) {
  return short
    ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
    : `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
}

export default function Gallery() {
  const [lightbox,    setLightbox]    = useState(null)
  const [showAll,     setShowAll]     = useState(false)
  const [allLightbox, setAllLightbox] = useState(null)

  const lbNext    = useCallback((i) => { if (typeof i === 'number') setLightbox(i); else setLightbox(p => (p + 1) % GALLERY_PREVIEW.length) }, [])
  const lbPrev    = useCallback(() => setLightbox(p => (p - 1 + GALLERY_PREVIEW.length) % GALLERY_PREVIEW.length), [])
  const allLbNext = useCallback((i) => { if (typeof i === 'number') setAllLightbox(i); else setAllLightbox(p => (p + 1) % ALL_IMAGES.length) }, [])
  const allLbPrev = useCallback(() => setAllLightbox(p => (p - 1 + ALL_IMAGES.length) % ALL_IMAGES.length), [])

  return (
    <>
      <section className="gallery">

        {/* ── IMAGE GALLERY HEADER ─────────────────────────── */}
        <div className="gallery__header">
          <div className="gallery__header-left">
            <p className="section-label">Gallery</p>
            <h2 className="gallery__title">Behind the Lens</h2>
            <p className="gallery__sub">Exclusive coverage, events, and moments captured by Boss Magazine PH.</p>
          </div>
          <button className="gallery__see-more" onClick={() => setShowAll(true)}>
            See All&nbsp;
            <span className="gallery__see-more-count">
              ({ALL_IMAGES.length} photos · {ALL_VIDEO_IDS.length} videos)
            </span>
          </button>
        </div>

        {/* ── IMAGE GRID ───────────────────────────────────── */}
        <div className="gallery__grid">
          {GALLERY_PREVIEW.map((src, i) => (
            <div
              key={i}
              className={`gallery__item gallery__item--${SPAN_PATTERN[i % SPAN_PATTERN.length]}`}
              onClick={() => setLightbox(i)}
            >
              <img src={src} alt={`Gallery ${i + 1}`} className="gallery__img" loading="lazy" />
              <div className="gallery__item-overlay">
                <span className="gallery__item-zoom">&#128269;</span>
              </div>
            </div>
          ))}
          {/* +N CTA tile */}
          <div className="gallery__item gallery__item--normal gallery__item--cta" onClick={() => setShowAll(true)}>
            <div className="gallery__cta-inner">
              <span className="gallery__cta-count">+{ALL_IMAGES.length - GALLERY_PREVIEW.length}</span>
              <span className="gallery__cta-label">more photos</span>
              <span className="gallery__cta-link">See All →</span>
            </div>
          </div>
        </div>

        {/* ── VIDEO STRIP ──────────────────────────────────── */}
        <div className="gallery__video-section">
          <div className="gallery__video-header">
            <span className="gallery__video-label">Videos</span>
            <button className="gallery__see-more gallery__see-more--sm" onClick={() => setShowAll(true)}>
              See All Videos →
            </button>
          </div>
          <div className="gallery__video-grid">
            {HOME_VIDEOS.map((v, i) => (
              <div key={i} className={`gallery__video-item${v.short ? ' gallery__video-item--short' : ''}`}>
                <iframe
                  src={embedUrl(v)}
                  title={`Video ${i + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="gallery__video-frame"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Preview lightbox */}
      {lightbox !== null && (
        <Lightbox images={GALLERY_PREVIEW} current={lightbox} onClose={() => setLightbox(null)} onNext={lbNext} onPrev={lbPrev} />
      )}

      {/* ── SEE ALL MODAL ─────────────────────────────────── */}
      {showAll && (
        <div className="gallery-modal" onClick={() => setShowAll(false)}>
          <div className="gallery-modal__box" onClick={e => e.stopPropagation()}>

            <div className="gallery-modal__header">
              <span className="gallery-modal__title">Full Gallery</span>
              <span className="gallery-modal__meta">{ALL_IMAGES.length} photos · {ALL_VIDEO_IDS.length} videos</span>
              <button className="gallery-modal__close" onClick={() => setShowAll(false)} aria-label="Close">&#10005;</button>
            </div>

            <div className="gallery-modal__body">

              {/* All videos */}
              <p className="gallery-modal__section-label">Videos ({ALL_VIDEO_IDS.length})</p>
              <div className="gallery-modal__videos">
                {ALL_VIDEO_IDS.map((v, i) => (
                  <div key={i} className={`gallery-modal__video${v.short ? ' gallery-modal__video--short' : ''}`}>
                    <iframe
                      src={embedUrl(v)}
                      title={`Video ${i + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="gallery-modal__iframe"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* All photos */}
              <p className="gallery-modal__section-label">Photos ({ALL_IMAGES.length})</p>
              <div className="gallery-modal__photos">
                {ALL_IMAGES.map((src, i) => (
                  <div key={i} className="gallery-modal__photo" onClick={() => setAllLightbox(i)}>
                    <img src={src} alt={`Photo ${i + 1}`} loading="lazy" className="gallery-modal__photo-img" />
                    <div className="gallery-modal__photo-overlay"><span>&#128269;</span></div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {allLightbox !== null && (
        <Lightbox images={ALL_IMAGES} current={allLightbox} onClose={() => setAllLightbox(null)} onNext={allLbNext} onPrev={allLbPrev} />
      )}
    </>
  )
}