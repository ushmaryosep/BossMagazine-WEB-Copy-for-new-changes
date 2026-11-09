import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase, supabaseOwn } from '../lib/supabase'
import magazines from '../data/magazines'
import ArticleCard from '../components/ArticleCard'
import SubCarousel from '../components/SubCarousel'
import MagazineViewer from '../components/MagazineViewer'
import './Home.css'

// New spotlight posters (2 x A4)
const SPOTLIGHT_POSTERS = [
  {
    src: 'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/YTC%20NOVEMBER%202026/2ND%20NATIONAL%20YOUTH%20TECH%20CONGRESS%20ILOILO%202026%20OFFICIAL%20POSTER.png',
    alt: '2nd National Youth Tech Congress Iloilo 2026 Official Poster',
  },
  {
    src: 'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/YTC%20NOVEMBER%202026/NEW%20YTC%20POSTER%20(1).png',
    alt: 'Youth Tech Congress November 2026 Poster',
  },
]

// New top highlight: BCDA feature
const BCDA_PHOTO = 'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/BCDA%20FEATURE/bcda.png'
const BCDA_TITLE = 'POWERING THE FUTURE OF NEW CLARK CITY: JAPANESE TECHNOLOGY MEETS SUSTAINABLE DEVELOPMENT'
const BCDA_PARAGRAPHS = [
  'A new chapter in innovation and sustainable urban development is taking shape in New Clark City as Japanese investors and technology leaders explore opportunities to bring advanced Japanese technologies to the Philippines.',
  'Leading the initiative is Mr. Makoto Koura, Chairman of M-Ironman Consultancy Co. Ltd., together with the Bases Conversion and Development Authority (BCDA) Vice President for Investment, Promotions and Marketing Development. Joining them are Mr. Yoshiteru Takamatsu, CEO of Luminous Creative Planning Ltd., and Mr. Hidenori Asada, CEO of RA1Z Japan.',
  'Through the collaboration of M-Ironman Consultancy Co. Ltd. and its Japanese partners, the initiative aims to introduce innovative Japanese technologies and expertise to the proposed BCDA housing project in New Clark City.',
  'Beyond providing homes, the project envisions opportunities to integrate modern technology, promote sustainable living, and support the development of smarter, more future-ready communities.',
  'As New Clark City continues to emerge as a major hub for investment and innovation, this partnership reflects the growing potential of Philippine-Japanese collaboration in shaping a more sustainable and technologically advanced future.',
]
const BCDA_TAGLINE = 'Building more than homes. Powering communities. Shaping the future.'
const BCDA_TAGS = '#BossMagazinePH #NewClarkCity #BCDA #MIronmanConsultancy #JapanPhilippinesPartnership #SmartCity #SustainableDevelopment #Innovation'

const SUB_CAROUSELS = [
  {
    title: 'Dagupan City Feature',
    description: 'In Dagupan City, a local fisherman navigates the waters in a small wooden boat, bringing his daily catch directly to nearby restaurants. With crabs selling at around ₱800 per kilo, the trade offers a modest return—but only after hours of labor under the sun and uncertain conditions at sea.',
    objectFit: 'cover',
    images: [
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/DAGUPAN%20CITY%20FEATURE/Title%20(1).png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/DAGUPAN%20CITY%20FEATURE/Title%20(2).png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/DAGUPAN%20CITY%20FEATURE/Title%20(3).png',
    ],
  },
  {
    title: 'Japan-ASEAN Collaboration',
    description: 'Japan investors visited BCDA in Clark City and the Malacañang Museum. / Boss Magazine PH',
    objectFit: 'cover',
    images: [
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/1.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/2.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/3.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/4.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/5.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/MAIN%20CARROUSEL%201/6.png',
    ],
  },
  {
    title: 'Boss Magazine PH Goes Global',
    description: 'Official international media partner — India, Africa, Malaysia, and Kenya.',
    objectFit: 'cover',
    images: [
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/1.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/2.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/3.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%202/4.png',
    ],
  },
  {
    title: 'Upcoming Expos 2026',
    description: 'Boss Magazine PH as official media partner.',
    objectFit: 'contain',
    images: [
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/FINPRO%20HEADLINE%20APRIL%202026/HEAD%20IMAGE%20FOR%20DASHBOARD.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/MALAYSIA%20CONSTRUCTION%20EXPO%202026.jpg',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/MALAYSIA%20ELECTRICITY%20EXPO%202026.jpg',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/PH%20CONSTRUCTION%20EXPO%202026.jpg',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%203%20(EXPOS)/PH%20PHARMA%20EXPO%202026.jpg',
    ],
  },
  {
    title: 'Boss Magazine PH Events',
    description: 'Highlights from premier events across the Philippines.',
    objectFit: 'cover',
    images: [
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/1.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/2.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/3.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/4.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/5.png',
      'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/SUB%20CARROUSEL%204/6.png',
    ],
  },
]

const YOUTUBE_IDS = ['pLx5EIT0jzY', 'iYBtU81QlCQ', '9jKHgBnvlsw']
const JAN_2026_COVER = 'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/Magazine%20Issues/JANUARY%202026%20ISSUE/1%20Cover%20Page.png'

// ─── Random 5-digit stats (fixed on mount) ──────────────────────────────────
function rand5() { return Math.floor(10000 + Math.random() * 90000) }

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const start = performance.now()
          const tick = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(ease * target))
            if (progress < 1) requestAnimationFrame(tick)
            else setCount(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

const STATS = [
  { label: 'Total Views',      suffix: '+', delay: 0    },
  { label: 'Reach',            suffix: '+', delay: 150  },
  { label: 'Engagement',       suffix: '+', delay: 300  },
  { label: 'Articles Written', suffix: '+', delay: 450  },
]

// Generate once on module load so numbers stay stable across re-renders
const STAT_TARGETS = STATS.map(() => rand5())

function StatItem({ label, suffix, target, delay }) {
  const [count, ref] = useCountUp(target, 2200)
  return (
    <div className="home-stat" ref={ref} style={{ animationDelay: `${delay}ms` }}>
      <span className="home-stat__num">{count.toLocaleString()}{suffix}</span>
      <span className="home-stat__label">{label}</span>
    </div>
  )
}

function StatsCounter() {
  return (
    <section className="home-stats">
      <div className="home-stats__inner">
        {STATS.map((s, i) => (
          <StatItem key={s.label} label={s.label} suffix={s.suffix} target={STAT_TARGETS[i]} delay={s.delay} />
        ))}
      </div>
    </section>
  )
}

const marqueeItems = ['Boss Magazine Ph', 'Cover Stories', 'Feature Articles', 'Exclusive Interviews', 'Filipino Excellence', 'Advertise With Us Now!']

function AdBanner() {
  return (
    <div className="home-banner-ad">
      <img
        src="https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/blueoakbannerads.png?raw=true"
        alt="Advertisement"
        className="home-banner-ad__img"
      />
    </div>
  )
}

// Two A4 posters side by side, click to zoom. Inline styles so no CSS changes needed.
function SpotlightHero() {
  const [zoomSrc, setZoomSrc] = useState(null)

  return (
    <>
      <div style={{ background: '#0d0d0d', padding: '32px 16px 24px', textAlign: 'center' }}>
        <span
          style={{
            display: 'block',
            fontSize: 11,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9A227',
            marginBottom: 20,
          }}
        >
          Spotlight · Youth Tech Congress · November 2026
        </span>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          {SPOTLIGHT_POSTERS.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt={p.alt}
              onClick={() => setZoomSrc(p.src)}
              style={{
                width: 'calc(50% - 12px)',
                maxWidth: 400,
                aspectRatio: '210 / 297',
                objectFit: 'contain',
                cursor: 'zoom-in',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                background: '#151515',
              }}
            />
          ))}
        </div>

        <span
          style={{
            display: 'block',
            marginTop: 18,
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.5)',
          }}
        >
          Click a poster to view full image
        </span>
      </div>

      {zoomSrc && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          onClick={() => setZoomSrc(null)}
        >
          <button
            onClick={() => setZoomSrc(null)}
            style={{ position: 'fixed', top: 16, right: 16, width: 40, height: 40, background: 'rgba(245,240,232,0.1)', border: '1px solid rgba(245,240,232,0.2)', color: '#F5F0E8', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close"
          >✕</button>
          <img
            src={zoomSrc}
            alt="Poster full view"
            style={{ maxWidth: '95vw', maxHeight: '92vh', objectFit: 'contain', display: 'block', boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

// Top highlight: photo first, full caption underneath (nothing sits on the photo)
function BcdaHero() {
  const [zoom, setZoom] = useState(false)

  return (
    <>
      <div style={{ background: '#0d0d0d' }}>
        <img
          src={BCDA_PHOTO}
          alt="Japanese investors and BCDA officials in New Clark City"
          onClick={() => setZoom(true)}
          style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain', background: '#000', cursor: 'zoom-in' }}
        />

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px clamp(16px, 4vw, 48px) 36px', textAlign: 'left' }}>
          <span style={{ display: 'block', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A227', marginBottom: 14 }}>
            Feature
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1.25, color: '#F5F0E8', margin: '0 0 20px' }}>
            {BCDA_TITLE}
          </h2>
          {BCDA_PARAGRAPHS.map((p, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(245,240,232,0.82)', margin: '0 0 16px' }}>
              {p}
            </p>
          ))}
          <p style={{ fontSize: 15, lineHeight: 1.75, fontStyle: 'italic', color: '#F5F0E8', margin: '24px 0 16px' }}>
            {BCDA_TAGLINE}
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: '#C9A227', margin: 0, wordBreak: 'break-word' }}>
            {BCDA_TAGS}
          </p>
        </div>
      </div>

      {zoom && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          onClick={() => setZoom(false)}
        >
          <button
            onClick={() => setZoom(false)}
            style={{ position: 'fixed', top: 16, right: 16, width: 40, height: 40, background: 'rgba(245,240,232,0.1)', border: '1px solid rgba(245,240,232,0.2)', color: '#F5F0E8', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close"
          >✕</button>
          <img
            src={BCDA_PHOTO}
            alt="BCDA feature full view"
            style={{ maxWidth: '95vw', maxHeight: '92vh', objectFit: 'contain', display: 'block', boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

// ─── Belmont Hotel Iloilo feature (top of home) ─────────────────────────────
const BEL_BASE = 'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/BELMONT%20HOTEL/'
const BEL_FACADE = BEL_BASE + 'BHI_FACADE.jpg'
const BEL_BALLROOM = BEL_BASE + 'Northern%20Islands%20Ballroom%20-%20Banquet.jpg'
const BEL_EVENT = BEL_BASE + 'viber_image_2026-11-09_13-14-47-257.jpg'

const BEL_TITLE = "WHAT'S NEXT FOR BELMONT HOTEL ILOILO: NEW EXPERIENCES, BIGGER POSSIBILITIES"
const BEL_DECK = 'Belmont Hotel Iloilo looks ahead to bigger gatherings, fresh dining experiences, and more reasons to Come Find Your Iloilo.'
const BEL_INTRO = 'With its doors now open and operations in full swing, Belmont Hotel Iloilo enters a new chapter centered on bringing people together. Beyond offering contemporary accommodation, the hotel is expanding opportunities for corporate events, social celebrations, and experiences that showcase Iloilo’s flavors and culture, inviting travelers and locals alike to savor every moment in the City of Love.'
const BEL_GATHERINGS = [
  'Belmont Hotel Iloilo is strengthening its presence in the MICE sector. Located in Iloilo Business Park, the hotel brings together flexible event venues, contemporary guest rooms, and dining outlets to accommodate business and social occasions.',
  'Its Northern Islands Grand Ballroom welcomes up to 300 guests and can be divided into four function spaces: Pan de Azucar, Bantigue, Gigantes, and Agho. From corporate meetings and product launches to milestone celebrations, these venues support Iloilo’s growing appeal as a destination for business and events.',
]
const BEL_VISION_INTRO = 'For General Manager Joy Alonte, this next chapter means creating experiences that reflect the warmth and character of Iloilo while contributing to the city’s growth.'
const BEL_VISION_QUOTE = '“We want people to come find their Iloilo with us. Whether through a memorable stay, a meaningful gathering, or an experience that brings them closer to the city, we hope every visit offers something worth remembering. As we grow, we look forward to connecting with more people, celebrating local culture, and contributing to Iloilo’s development as a business and leisure destination,” says Ms. Alonte.'
const BEL_FLAVORS = [
  'This vision also takes shape through the hotel’s dining offerings. At Belmont Café, the hotel’s Modern Ilonggo Diner, guests can enjoy local favorites reimagined with contemporary touches alongside international selections. Zabana Bar and Float Bar provide inviting spaces to unwind and gather over drinks and bites.',
  'With Executive Chef Daryl Vance “Dale” Yulo Sy bringing his expertise to the team, guests can look forward to creative dishes and seasonal menus that celebrate Filipino flavors.',
]
const BEL_MOMENTS = [
  'Looking ahead, Belmont Hotel Iloilo will continue developing stay experiences, cultural collaborations, and seasonal celebrations that give guests more ways to experience the destination. Guided by the Sampaguita Brand of Service, the hotel brings its promise to Savor the Moment to life through warm Filipino hospitality and thoughtful service.',
  'Whether visiting for business, leisure, or a special occasion, guests are invited to Come Find Your Iloilo, one memorable moment at a time.',
]

function BelmontFeature() {
  const gold = '#C9A227'
  const cream = '#F5F0E8'
  const serif = "'Cormorant Garamond', Georgia, serif"
  const eyebrow = { display: 'block', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: 14 }
  const heading = { fontFamily: serif, fontWeight: 500, fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.25, letterSpacing: '0.02em', color: cream, margin: '0 0 16px' }
  const para = { fontSize: 15, lineHeight: 1.8, color: 'rgba(245,240,232,0.82)', margin: '0 0 14px' }
  const split = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 36, alignItems: 'center' }
  const photo = { display: 'block', width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', boxShadow: '0 10px 40px rgba(0,0,0,0.55)' }
  const divider = { height: 1, background: 'rgba(201,162,39,0.25)', margin: 'clamp(32px, 5vw, 56px) 0' }
  const box = { border: '1px solid rgba(201,162,39,0.35)', padding: '20px 22px' }

  return (
    <section style={{ background: '#0d0d0d', padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 40px) 48px' }}>
      {/* header */}
      <span style={eyebrow}>Feature · Hospitality · Iloilo</span>
      <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(24px, 3.4vw, 42px)', lineHeight: 1.15, color: cream, margin: '0 0 18px' }}>
        {BEL_TITLE}
      </h2>
      <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.65, fontStyle: 'italic', color: 'rgba(245,240,232,0.7)', margin: '0 0 28px' }}>
        {BEL_DECK}
      </p>

      {/* hero photo */}
      <img
        src={BEL_FACADE}
        alt="Belmont Hotel Iloilo facade at dusk"
        style={{ display: 'block', width: '100%', height: 'clamp(240px, 52vh, 560px)', objectFit: 'cover', objectPosition: 'center 35%', boxShadow: '0 10px 50px rgba(0,0,0,0.6)' }}
      />

      {/* intro */}
      <p style={{ margin: '32px 0 0', padding: '4px 0 4px 22px', borderLeft: '2px solid ' + gold, fontFamily: serif, fontSize: 'clamp(18px, 2vw, 23px)', lineHeight: 1.6, color: cream }}>
        {BEL_INTRO}
      </p>

      <div style={divider} />

      {/* gatherings */}
      <div style={split}>
        <div>
          <span style={eyebrow}>Events</span>
          <h3 style={heading}>SETTING THE STAGE FOR BIGGER GATHERINGS</h3>
          {BEL_GATHERINGS.map((t, i) => <p key={i} style={para}>{t}</p>)}
        </div>
        <img src={BEL_BALLROOM} alt="Northern Islands Grand Ballroom set for a banquet" style={photo} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 28 }}>
        <div style={{ ...box, flex: '1 1 160px' }}>
          <span style={{ display: 'block', fontFamily: serif, fontSize: 40, lineHeight: 1, color: gold }}>300</span>
          <span style={{ display: 'block', marginTop: 8, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>Guests, Northern Islands Grand Ballroom</span>
        </div>
        <div style={{ ...box, flex: '1 1 160px' }}>
          <span style={{ display: 'block', fontFamily: serif, fontSize: 40, lineHeight: 1, color: gold }}>4</span>
          <span style={{ display: 'block', marginTop: 8, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>Function spaces</span>
        </div>
        <div style={{ ...box, flex: '2 1 280px', display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'center' }}>
          {['Pan de Azucar', 'Bantigue', 'Gigantes', 'Agho'].map(s => (
            <span key={s} style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: cream, background: 'rgba(201,162,39,0.14)', padding: '7px 12px' }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={divider} />

      {/* vision */}
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <span style={eyebrow}>The Vision</span>
        <h3 style={heading}>A VISION FOR WHAT’S AHEAD</h3>
        <p style={{ ...para, margin: '0 0 24px' }}>{BEL_VISION_INTRO}</p>
        <blockquote style={{ margin: 0, padding: '24px clamp(16px, 4vw, 36px)', background: 'rgba(201,162,39,0.07)', borderTop: '2px solid ' + gold, borderBottom: '2px solid ' + gold, fontFamily: serif, fontSize: 'clamp(17px, 1.9vw, 21px)', lineHeight: 1.65, fontStyle: 'italic', color: cream, textAlign: 'left' }}>
          {BEL_VISION_QUOTE}
        </blockquote>
      </div>

      <div style={divider} />

      {/* flavors */}
      <span style={eyebrow}>Dining</span>
      <h3 style={heading}>MORE FLAVORS, MORE EXPERIENCES</h3>
      <div style={{ maxWidth: 820 }}>
        {BEL_FLAVORS.map((t, i) => <p key={i} style={para}>{t}</p>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginTop: 20 }}>
        {[
          { name: 'Belmont Café', note: 'Modern Ilonggo Diner' },
          { name: 'Zabana Bar', note: 'Drinks and bites' },
          { name: 'Float Bar', note: 'Drinks and bites' },
        ].map(o => (
          <div key={o.name} style={box}>
            <span style={{ display: 'block', fontFamily: serif, fontSize: 22, color: cream }}>{o.name}</span>
            <span style={{ display: 'block', marginTop: 6, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold }}>{o.note}</span>
          </div>
        ))}
      </div>

      <div style={divider} />

      {/* moments */}
      <div style={split}>
        <img src={BEL_EVENT} alt="Guests applauding at a Belmont Hotel Iloilo event" style={photo} />
        <div>
          <span style={eyebrow}>Looking Ahead</span>
          <h3 style={heading}>MORE MOMENTS WORTH SAVORING</h3>
          {BEL_MOMENTS.map((t, i) => <p key={i} style={para}>{t}</p>)}
        </div>
      </div>

      <div style={divider} />

      {/* contact */}
      <div style={{ maxWidth: 820, margin: '0 auto', border: '1px solid rgba(201,162,39,0.4)', padding: 'clamp(20px, 3vw, 34px)' }}>
        <span style={eyebrow}>For inquiries and reservations</span>
        <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 26, color: cream, margin: '0 0 14px' }}>Belmont Hotel Iloilo</h3>
        <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(245,240,232,0.82)', margin: 0 }}>
          Iloilo Business Park, Mandurriao, Iloilo City<br />
          Trunkline: <a href="tel:+63335000840" style={{ color: gold, textDecoration: 'none' }}>(033) 500 0840</a><br />
          Website: <a href="https://www.belmontiloilo.com" target="_blank" rel="noopener noreferrer" style={{ color: gold, textDecoration: 'none' }}>www.belmontiloilo.com</a><br />
          Facebook &amp; Instagram: @belmontiloiloph
        </p>
      </div>
    </section>
  )
}

function SideAd() {
  return (
    <div className="side-ad">
      <span className="side-ad__text">AD</span>
    </div>
  )
}

function VideoEmbed({ videoId, label }) {
  if (!videoId) return null
  return (
    <div className="video-embed">
      <iframe
        className="video-embed__frame"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={label}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

function IssueCover() {
  return (
    <div className="issue-cover">
      <span className="issue-cover__eyebrow">Current Issue</span>
      <div className="issue-cover__mag">
        <img src={JAN_2026_COVER} alt="January 2026 Issue" className="issue-cover__img" />
        <div className="issue-cover__mag-footer">
          <p className="issue-cover__title">January 2026</p>
          <Link to="/magazines" className="issue-cover__link">View Issue →</Link>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewingMag, setViewingMag] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      // Fetch from YOUR Supabase first
      const { data: ownData } = await supabaseOwn
        .from('articles')
        .select('id, title, excerpt, cover_image, category, author, published_at')
        .order('published_at', { ascending: false })
        .limit(4)

      const own = (ownData || []).map(a => ({ ...a, _source: 'own' }))

      // If we already have 4 from your DB, use those only
      if (own.length >= 4) {
        setArticles(own.slice(0, 4))
        setLoading(false)
        return
      }

      // Fill remaining slots from original Supabase
      const remaining = 4 - own.length
      const { data: origData } = await supabase
        .from('articles')
        .select('id, title, excerpt, cover_image, category, author, published_at')
        .order('published_at', { ascending: false })
        .limit(remaining)

      const orig = (origData || []).map(a => ({ ...a, _source: 'orig' }))

      setArticles([...own, ...orig])
      setLoading(false)
    }

    fetchArticles()
  }, [])

  return (
    <>
    <main className="home">

      {/* ── 3-COLUMN LAYOUT ─────────────────────────────────── */}
      <div className="home-layout">

        <aside className="home-side home-side--left">
          <SideAd />
        </aside>

        <div className="home-center">

          <AdBanner />

          {/* BELMONT HOTEL ILOILO — new top feature */}
          <BelmontFeature />

          <BcdaHero />

          {/* YTC POSTERS — own section above the sub carousels */}
          <SpotlightHero />

          {/* SUB CAROUSELS — horizontal scroll on mobile */}
          <div className="home-sub-row">
            {SUB_CAROUSELS.map((sc, i) => (
              <div key={i} className="home-sub-item">
                <SubCarousel
                  num={i}
                  images={sc.images}
                  title={sc.title}
                  description={sc.description}
                  objectFit={sc.objectFit}
                />
              </div>
            ))}
          </div>

          {/* VIDEO + ISSUE COVER — stacks on mobile */}
          <div className="home-mid">
            <div className="home-mid__videos">
              <VideoEmbed videoId={YOUTUBE_IDS[0]} label="Video Feature 1" />
              <VideoEmbed videoId={YOUTUBE_IDS[1]} label="Video Feature 2" />
            </div>

            <div className="home-mid__cover">
              <IssueCover />
            </div>

            <div className="home-mid__video3">
              <VideoEmbed videoId={YOUTUBE_IDS[2]} label="Video Feature 3" />
            </div>

            <div className="home-mid__a1">
              {loading ? (
                <div className="article-skeleton" />
              ) : articles[0] ? (
                <ArticleCard article={articles[0]} />
              ) : (
                <div className="article-preview-empty"><span>Article Preview 1</span></div>
              )}
            </div>
          </div>

          {/* BOTTOM ARTICLES */}
          <div className="home-bottom-articles">
            {loading
              ? Array(3).fill(null).map((_, i) => <div key={i} className="article-skeleton" />)
              : articles.slice(1, 4).length > 0
                ? articles.slice(1, 4).map(a => <ArticleCard key={a.id} article={a} />)
                : Array(3).fill(null).map((_, i) => (
                    <div key={i} className="article-preview-empty">
                      <span>Article Preview {i + 2}</span>
                    </div>
                  ))
            }
          </div>

        </div>

        <aside className="home-side home-side--right">
          <SideAd />
        </aside>

      </div>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee__item">
              {item} <span className="marquee__dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* PAST ISSUES */}
      <section className="section magazines-section">
        <div className="section__header">
          <p className="section-label">Past Issues</p>
          <Link to="/magazines" className="section__more">View All →</Link>
        </div>
        <div className="magazines-row">
          {magazines.map(mag => (
            <div key={mag.id} className="mag-thumb" onClick={() => setViewingMag(mag)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setViewingMag(mag)}>
              <div className="mag-thumb__cover">
                {mag.cover_image
                  ? <img src={mag.cover_image} alt={mag.title} />
                  : (
                    <div className="mag-thumb__placeholder">
                      <span className="mag-thumb__name">Boss</span>
                      <span className="mag-thumb__issue">{mag.issue}</span>
                    </div>
                  )
                }
                <div className="mag-thumb__overlay"><span>Read →</span></div>
              </div>
              <span className="mag-thumb__title">{mag.title}</span>
              <span className="mag-thumb__date">{mag.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STATS COUNTER */}
      <StatsCounter />

      {/* CTA */}
      <section className="cta-banner">
        <h2 className="cta-banner__title">Explore the Full Archive</h2>
        <p className="cta-banner__sub">Hundreds of stories. Decades of Filipino excellence.</p>
        <Link to="/articles" className="btn-primary">Browse All Articles</Link>
      </section>

    </main>

      {viewingMag && (
        <MagazineViewer magazine={viewingMag} onClose={() => setViewingMag(null)} />
      )}
    </>
  )
}