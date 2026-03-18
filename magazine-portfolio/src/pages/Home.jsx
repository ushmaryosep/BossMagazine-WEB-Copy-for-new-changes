import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ArticleCard from '../components/ArticleCard'
import './Home.css'

const MARQUEE = ['Boss Magazine Ph', 'Cover Stories', 'Feature Articles', 'Exclusive Interviews', 'Filipino Excellence']

export default function Home() {
  const [featured, setFeatured]   = useState(null)
  const [recent, setRecent]       = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, excerpt, cover_image, category, author, published_at')
      .order('published_at', { ascending: false })
      .limit(4)
      .then(({ data }) => {
        const list = data || []
        setFeatured(list[0] || null)
        setRecent(list.slice(1))
        setLoading(false)
      })
  }, [])

  return (
    <main className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content">
          <p className="hero__eyebrow">The Philippines' Premier Magazine</p>
          <h1 className="hero__headline">
            Where Power<br />Meets <em>Prestige</em>
          </h1>
          <p className="hero__sub">
            Stories, features, and interviews that define Filipino excellence — in print and beyond.
          </p>
          <div className="hero__actions">
            <Link to="/articles" className="btn-primary">Browse Articles</Link>
            <Link to="/about" className="hero__link">About Us <span>→</span></Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__cover">
            <img src="/logo.png" alt="Boss Magazine Ph" />
          </div>
          <div className="hero__cover-shadow" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee" aria-hidden>
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="marquee__item">
              {item}<span className="marquee__sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED ARTICLE ── */}
      <section className="home__section">
        <div className="home__section-header">
          <span className="section-label">Featured</span>
          <Link to="/articles" className="home__view-all">View all articles →</Link>
        </div>

        {loading ? (
          <div className="loading">
            <span className="loading__dot"/><span className="loading__dot"/><span className="loading__dot"/>
          </div>
        ) : featured ? (
          <div className="home__featured">
            <ArticleCard article={featured} featured />
          </div>
        ) : (
          <p className="empty-state">No articles yet.</p>
        )}
      </section>

      {/* ── RECENT ARTICLES ── */}
      {!loading && recent.length > 0 && (
        <section className="home__section home__section--dark">
          <div className="home__section-header">
            <span className="section-label">Recent</span>
          </div>
          <div className="home__grid">
            {recent.map(a => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="home__cta">
        <h2 className="home__cta-title">Explore the Full Archive</h2>
        <p className="home__cta-sub">Hundreds of stories. Decades of Filipino excellence.</p>
        <Link to="/articles" className="btn-primary">Browse All Articles</Link>
      </section>

    </main>
  )
}
