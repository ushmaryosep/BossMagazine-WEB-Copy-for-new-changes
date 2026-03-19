import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import magazines from '../data/magazines'
import ArticleCard from '../components/ArticleCard'
import MainCarousel from '../components/MainCarousel'
import './Home.css'

// ─── Replace these with your actual YouTube video IDs ───────────────────────
// e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ → 'dQw4w9WgXcQ'
const YOUTUBE_IDS = ['', '', '']
// ─────────────────────────────────────────────────────────────────────────────

function AdBanner() {
  return (
    <div className="home-banner-ad">
      <span className="home-banner-ad__text">Advertisement</span>
    </div>
  )
}

function SideAd({ label = 'AD' }) {
  return (
    <div className="side-ad">
      <span className="side-ad__text">{label}</span>
    </div>
  )
}

function VideoEmbed({ videoId, label }) {
  return (
    <div className="video-embed">
      {videoId ? (
        <iframe
          className="video-embed__frame"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={label}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="video-embed__placeholder">
          <div className="video-embed__play-icon">&#9654;</div>
          <span className="video-embed__label">{label}</span>
        </div>
      )}
    </div>
  )
}

function IssueCover({ magazine }) {
  return (
    <div className="issue-cover">
      <span className="issue-cover__eyebrow">Current Issue</span>
      <div className="issue-cover__mag">
        {magazine.cover_image
          ? <img src={magazine.cover_image} alt={magazine.title} className="issue-cover__img" />
          : (
            <div className="issue-cover__placeholder">
              <span className="issue-cover__placeholder-name">Boss</span>
              <span className="issue-cover__placeholder-date">January 2026</span>
            </div>
          )
        }
      </div>
      <p className="issue-cover__title">January 2026 Issue</p>
      <Link to="/magazines" className="issue-cover__link">View Issue →</Link>
    </div>
  )
}

function ArticlePreviewEmpty({ num }) {
  return (
    <div className="article-preview-empty">
      <span>Article Preview {num}</span>
    </div>
  )
}

const marqueeItems = ['Boss Magazine Ph', 'Cover Stories', 'Feature Articles', 'Exclusive Interviews', 'Filipino Excellence', 'Since 2014']

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, excerpt, cover_image, category, author, published_at')
      .order('published_at', { ascending: false })
      .limit(12)
      .then(({ data }) => {
        setArticles(data || [])
        setLoading(false)
      })
  }, [])

  // Distribute articles across sections
  const carouselSlides = articles.slice(0, 5)
  const subCards      = articles.slice(5, 8)
  const previews      = articles.slice(8, 12)

  // Use the most recent magazine entry
  const latestMag = [...magazines].reverse()[0] || magazines[0]

  return (
    <main className="home">

      {/* ── 3-COLUMN LAYOUT: Left Ad | Center | Right Ad ────────────────── */}
      <div className="home-layout">

        {/* LEFT AD */}
        <aside className="home-side home-side--left">
          <SideAd label="AD" />
        </aside>

        {/* CENTER CONTENT */}
        <div className="home-center">

          {/* BANNER ADS 1 */}
          <AdBanner />

          {/* MAIN CAROUSEL 1 */}
          <MainCarousel slides={carouselSlides} loading={loading} />

          {/* SUB CAROUSELS 2 / 3 / 4 */}
          <div className="home-sub-row">
            {loading
              ? Array(3).fill(null).map((_, i) => <div key={i} className="sub-card sub-card--skeleton" />)
              : subCards.length > 0
                ? subCards.map(a => (
                    <Link key={a.id} to={`/articles/${a.id}`} className="sub-card">
                      {a.cover_image && <img src={a.cover_image} alt={a.title} className="sub-card__img" />}
                      <div className="sub-card__overlay" />
                      <div className="sub-card__info">
                        {a.category && <span className="sub-card__tag">{a.category}</span>}
                        <h3 className="sub-card__title">{a.title}</h3>
                      </div>
                    </Link>
                  ))
                : Array(3).fill(null).map((_, i) => (
                    <div key={i} className="sub-card sub-card--empty">
                      <div className="sub-card__info">
                        <span className="sub-card__tag">Feature</span>
                        <h3 className="sub-card__title">Coming Soon</h3>
                      </div>
                    </div>
                  ))
            }
          </div>

          {/* VIDEO + SIDEBAR GRID */}
          <div className="home-mid">
            {/* Col 1 Row 1 — Video 1 */}
            <div className="home-mid__v1">
              <VideoEmbed videoId={YOUTUBE_IDS[0]} label="Video Feature 1" />
            </div>

            {/* Col 2 Rows 1–2 — January 2026 Issue Cover */}
            <div className="home-mid__cover">
              <IssueCover magazine={latestMag} />
            </div>

            {/* Col 1 Row 2 — Video 2 */}
            <div className="home-mid__v2">
              <VideoEmbed videoId={YOUTUBE_IDS[1]} label="Video Feature 2" />
            </div>

            {/* Col 1 Row 3 — Video 3 */}
            <div className="home-mid__v3">
              <VideoEmbed videoId={YOUTUBE_IDS[2]} label="Video Feature 3" />
            </div>

            {/* Col 2 Row 3 — Article Preview 1 */}
            <div className="home-mid__a1">
              {previews[0]
                ? <ArticleCard article={previews[0]} />
                : <ArticlePreviewEmpty num={1} />
              }
            </div>
          </div>

          {/* BOTTOM ARTICLE PREVIEWS 2 / 3 / 4 */}
          <div className="home-bottom-articles">
            {loading
              ? Array(3).fill(null).map((_, i) => <div key={i} className="article-skeleton" />)
              : previews.slice(1, 4).length > 0
                ? previews.slice(1, 4).map(a => <ArticleCard key={a.id} article={a} />)
                : Array(3).fill(null).map((_, i) => <ArticlePreviewEmpty key={i} num={i + 2} />)
            }
          </div>

        </div>
        {/* END CENTER */}

        {/* RIGHT AD */}
        <aside className="home-side home-side--right">
          <SideAd label="AD" />
        </aside>

      </div>
      {/* END 3-COLUMN LAYOUT */}

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
            <Link key={mag.id} to="/magazines" className="mag-thumb">
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
              </div>
              <span className="mag-thumb__title">{mag.title}</span>
              <span className="mag-thumb__date">{mag.date}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <h2 className="cta-banner__title">Explore the Full Archive</h2>
        <p className="cta-banner__sub">Hundreds of stories. Decades of Filipino excellence.</p>
        <Link to="/articles" className="btn-primary">Browse All Articles</Link>
      </section>

    </main>
  )
}
