import { useState, useCallback } from 'react'
import Lightbox from './Lightbox'
import './Gallery.css'

// ─── Homepage preview images (8 shown initially) ────────────────────────────
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

// ─── ALL images pooled from every carousel + new gallery images ─────────────
const ALL_IMAGES = [
  // Additional gallery images (all 10)
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
  // Main Carousel 1 — Japan ASEAN
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/1.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/2.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/3.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/4.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/5.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/6.png',
  // Sub Carousel 2 — Boss Goes Global
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/1.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/2.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/3.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/4.png',
  // Sub Carousel 3 — Expos
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/MALAYSIA%20CONSTRUCTION%20EXPO%202026.jpg',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/MALAYSIA%20ELECTRICITY%20EXPO%202026.jpg',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/PH%20CONSTRUCTION%20EXPO%202026.jpg',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/PH%20PHARMA%20EXPO%202026.jpg',
  // Sub Carousel 4 — Events
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/1.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/2.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/3.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/4.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/5.png',
  'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/6.png',
]

// YouTube video IDs to embed in "See All" modal
const VIDEO_IDS = ['pLx5EIT0jzY', 'iYBtU81QlCQ', '9jKHgBnvlsw']

// Assign spanning classes in a repeating pattern for the masonry-like grid
const SPAN_PATTERN = ['wide', 'tall', 'normal', 'normal', 'wide', 'tall', 'normal', 'normal']

export default function Gallery() {
  const [lightbox, setLightbox]   = useState(null)
  const [showAll, setShowAll]     = useState(false)
  const [allLightbox, setAllLightbox] = useState(null)

  const lbNext = useCallback((i) => {
    if (typeof i === 'number') setLightbox(i)
    else setLightbox(p => (p + 1) % GALLERY_PREVIEW.length)
  }, [])
  const lbPrev = useCallback(() => setLightbox(p => (p - 1 + GALLERY_PREVIEW.length) % GALLERY_PREVIEW.length), [])

  const allLbNext = useCallback((i) => {
    if (typeof i === 'number') setAllLightbox(i)
    else setAllLightbox(p => (p + 1) % ALL_IMAGES.length)
  }, [])
  const allLbPrev = useCallback(() => setAllLightbox(p => (p - 1 + ALL_IMAGES.length) % ALL_IMAGES.length), [])

  return (
    <>
      <section className="gallery">
        {/* Header */}
        <div className="gallery__header">
          <div className="gallery__header-left">
            <p className="section-label">Gallery</p>
            <h2 className="gallery__title">Behind the Lens</h2>
            <p className="gallery__sub">Exclusive coverage, events, and moments captured by Boss Magazine PH.</p>
          </div>
          <button className="gallery__see-more" onClick={() => setShowAll(true)}>
            See All <span className="gallery__see-more-count">({ALL_IMAGES.length} photos + {VIDEO_IDS.length} videos)</span>
          </button>
        </div>

        {/* Masonry-style grid */}
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

          {/* Last tile — "See All" CTA */}
          <div className="gallery__item gallery__item--normal gallery__item--cta" onClick={() => setShowAll(true)}>
            <div className="gallery__cta-inner">
              <span className="gallery__cta-count">+{ALL_IMAGES.length - GALLERY_PREVIEW.length}</span>
              <span className="gallery__cta-label">more photos</span>
              <span className="gallery__cta-link">See All →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Preview lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={GALLERY_PREVIEW}
          current={lightbox}
          onClose={() => setLightbox(null)}
          onNext={lbNext}
          onPrev={lbPrev}
        />
      )}

      {/* ── SEE ALL MODAL ─────────────────────────────────────── */}
      {showAll && (
        <div className="gallery-modal" onClick={() => setShowAll(false)}>
          <div className="gallery-modal__box" onClick={e => e.stopPropagation()}>
            <div className="gallery-modal__header">
              <span className="gallery-modal__title">Full Gallery</span>
              <span className="gallery-modal__meta">{ALL_IMAGES.length} photos · {VIDEO_IDS.length} videos</span>
              <button className="gallery-modal__close" onClick={() => setShowAll(false)} aria-label="Close">&#10005;</button>
            </div>

            <div className="gallery-modal__body">
              {/* Videos section */}
              <p className="gallery-modal__section-label">Videos</p>
              <div className="gallery-modal__videos">
                {VIDEO_IDS.map((id, i) => (
                  <div key={i} className="gallery-modal__video">
                    <iframe
                      src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                      title={`Video ${i + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="gallery-modal__iframe"
                    />
                  </div>
                ))}
              </div>

              {/* All photos */}
              <p className="gallery-modal__section-label">Photos</p>
              <div className="gallery-modal__photos">
                {ALL_IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className="gallery-modal__photo"
                    onClick={() => setAllLightbox(i)}
                  >
                    <img src={src} alt={`Photo ${i + 1}`} loading="lazy" className="gallery-modal__photo-img" />
                    <div className="gallery-modal__photo-overlay"><span>&#128269;</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All-images lightbox */}
      {allLightbox !== null && (
        <Lightbox
          images={ALL_IMAGES}
          current={allLightbox}
          onClose={() => setAllLightbox(null)}
          onNext={allLbNext}
          onPrev={allLbPrev}
        />
      )}
    </>
  )
}