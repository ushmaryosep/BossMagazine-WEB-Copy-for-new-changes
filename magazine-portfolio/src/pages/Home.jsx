import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import magazines from '../data/magazines'
import ArticleCard from '../components/ArticleCard'
import MagazineCard from '../components/MagazineCard'
import './Home.css'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, excerpt, cover_image, category, author, created_at')
      .order('published_at', { ascending: false })
      .limit(4)
      .then(({ data }) => {
        setArticles(data || [])
        setLoading(false)
      })
  }, [])

  const marqueeItems = ['Boss Magazine Ph', 'Cover Stories', 'Feature Articles', 'Exclusive Interviews', 'Filipino Excellence', 'Since 2014']

  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content">
          <p className="hero__eyebrow">The Philippines' Premier Magazine</p>
          <h1 className="hero__headline">
            Where Power<br />Meets <em>Prestige</em>
          </h1>
          <p className="hero__sub">
            Showcasing the stories, faces, and voices that define Filipino excellence — in print and beyond.
          </p>
          <div className="hero__actions">
            <Link to="/articles" className="btn-primary">Browse Articles</Link>
            <Link to="/magazines" className="btn-ghost">View Issues <span>→</span></Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__cover-stack">
            <div className="hero__cover hero__cover--back" />
            <div className="hero__cover hero__cover--front">
              <img src="/logo.png" alt="Boss Magazine Ph" className="hero__cover-logo" />
            </div>
          </div>
        </div>
      </section>

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

      {/* STATS */}
      <section className="stats">
        {[
          { num: '10+', label: 'Years of Excellence' },
          { num: '48+', label: 'Issues Published' },
          { num: '200+', label: 'Articles Written' },
        ].map(({ num, label }) => (
          <div key={label} className="stats__item">
            <span className="stats__num">{num}</span>
            <span className="stats__label">{label}</span>
          </div>
        ))}
      </section>

      {/* LATEST ARTICLES */}
      <section className="section articles-section">
        <div className="section__header">
          <p className="section-label">Latest Articles</p>
          <Link to="/articles" className="section__more">View All →</Link>
        </div>

        {loading ? (
          <div className="loading">
            <span className="loading__dot" />
            <span className="loading__dot" />
            <span className="loading__dot" />
          </div>
        ) : articles.length > 0 ? (
          <div className="articles-grid">
            {articles[0] && (
              <div className="articles-grid__featured">
                <ArticleCard article={articles[0]} featured />
              </div>
            )}
            <div className="articles-grid__side">
              {articles.slice(1).map(a => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        ) : (
          <p className="empty-state">Articles coming soon.</p>
        )}
      </section>

      {/* PAST ISSUES */}
      <section className="section magazines-section">
        <div className="section__header">
          <p className="section-label">Past Issues</p>
          <Link to="/magazines" className="section__more">View All →</Link>
        </div>
        <div className="magazines-row">
          {magazines.map(mag => (
            <MagazineCard key={mag.id} magazine={mag} />
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">Explore the Full Archive</h2>
          <p className="cta-banner__sub">Hundreds of stories. Decades of Filipino excellence.</p>
          <Link to="/articles" className="btn-primary">Browse All Articles</Link>
        </div>
      </section>

    </main>
  )
}
