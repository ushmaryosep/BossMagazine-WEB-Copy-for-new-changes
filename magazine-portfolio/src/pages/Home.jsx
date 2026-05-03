import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase, supabaseOwn } from '../lib/supabase'
import magazines from '../data/magazines'
import ArticleCard from '../components/ArticleCard'
import SubCarousel from '../components/SubCarousel'
import MagazineViewer from '../components/MagazineViewer'
import './Home.css'

const DAGUPAN_HERO = [
  {
    image: 'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/DAGUPAN%20CITY%20FEATURE/Title%20(1).png',
    description: 'In Dagupan City, a local fisherman navigates the waters in a small wooden boat, bringing his daily catch directly to nearby restaurants. With crabs selling at around ₱800 per kilo, the trade offers a modest return—but only after hours of labor under the sun and uncertain conditions at sea.',
  },
  {
    image: 'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/DAGUPAN%20CITY%20FEATURE/Title%20(2).png',
    description: 'Seated low on his boat, he carefully sorts and ties each crab by hand, a routine shaped by years of experience.',
  },
  {
    image: 'https://raw.githubusercontent.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/refs/heads/main/magazine-portfolio/src/assets/DAGUPAN%20CITY%20FEATURE/Title%20(3).png',
    description: 'For many like him, fishing is not just a livelihood—it is a daily test of endurance, where each catch carries the quiet hope that it will be enough to sustain a family for another day.',
  },
]

const SUB_CAROUSELS = [
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

function DagupanHero() {
  const [slide, setSlide] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const total = DAGUPAN_HERO.length

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % total), 5000)
    return () => clearInterval(t)
  }, [total])

  const current = DAGUPAN_HERO[slide]

  return (
    <>
      <div className="home-finpro-hero" style={{ cursor: 'default' }}>
        {/* Image slides */}
        {DAGUPAN_HERO.map((item, i) => (
          <img
            key={i}
            src={item.image}
            alt={`Dagupan ${i + 1}`}
            className="home-finpro-hero__img"
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0, left: 0,
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 0.9s ease',
              zIndex: i === slide ? 1 : 0,
            }}
            onClick={() => setLightbox(true)}
          />
        ))}
        <div className="home-finpro-hero__overlay" style={{ zIndex: 2 }} />

        <div className="home-finpro-hero__content" style={{ zIndex: 3 }}>
          <span className="home-finpro-hero__tag">Feature</span>
          <h2 className="home-finpro-hero__title">Dagupan City</h2>
          <div className="home-finpro-hero__slide-wrap">
            {DAGUPAN_HERO.map((item, i) => (
              <p key={i} className={`home-finpro-hero__desc ${i === slide ? 'active' : ''}`}>
                {item.description}
              </p>
            ))}
          </div>
          <div className="home-finpro-hero__dots">
            {DAGUPAN_HERO.map((_, i) => (
              <button
                key={i}
                className={`home-finpro-hero__dot ${i === slide ? 'active' : ''}`}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="home-finpro-hero__zoom-hint" style={{ cursor: 'zoom-in' }} onClick={() => setLightbox(true)}>
            🔍 Click to view full image
          </span>
        </div>
      </div>

      {lightbox && (
        <div
          style={{ position:'fixed',inset:0,zIndex:9999,background:'rgba(0,0,0,0.96)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'zoom-out' }}
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            style={{ position:'fixed',top:16,right:16,width:40,height:40,background:'rgba(245,240,232,0.1)',border:'1px solid rgba(245,240,232,0.2)',color:'#F5F0E8',fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}
            aria-label="Close"
          >✕</button>
          <img
            src={current.image}
            alt={`Dagupan ${slide + 1}`}
            style={{ maxWidth:'95vw',maxHeight:'92vh',objectFit:'contain',display:'block',boxShadow:'0 0 80px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
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

          <DagupanHero />

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