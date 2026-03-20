import { Link } from 'react-router-dom'
import './About.css'

const EDITORIAL_BOARD = [
  { role: 'Publisher',                              name: 'BOSS Media Philippines, Co. LTD.' },
  { role: 'Editor-in-Chief',                        name: 'Remie Degoma' },
  { role: 'Executive Editor',                       name: 'Johnny Chotrani' },
  { role: 'Managing Editor',                        name: 'Sofyan Alawi' },
  { role: 'Feature Editor',                         name: 'Lugille L. Roberto' },
  { role: 'Senior Graphics Designer & Webmaster',   name: 'JM Clavero' },
  { role: 'Senior Marketing Specialist',            name: 'Francisca N. Dimayuga' },
  { role: 'Digital Team',                           name: 'Boss TechSolutions PH' },
  { role: 'PR Team',                                name: 'Blue Oak Strategies' },
]

export default function About() {
  return (
    <main className="about-page">

      <div className="about-page__hero">
        <p className="section-label">Our Story</p>
        <h1 className="about-page__title">About<br /><em>Boss Magazine Ph</em></h1>
      </div>

      <div className="about-page__content">
        <div className="about-page__main">
          <p className="about-page__lead">
            Boss Magazine Ph is the Philippines' premier lifestyle and business publication — dedicated to celebrating Filipino excellence across entrepreneurship, culture, and society.
          </p>
          <p>
            Founded with a vision to give Filipino achievers a platform they deserve, Boss Magazine Ph has grown into a trusted voice for those who lead, inspire, and innovate. Each issue is a carefully curated collection of stories that reflect the power and prestige of the Filipino spirit.
          </p>
          <p>
            From cover stories featuring the country's most influential names to deep-dive features on emerging industries, Boss Magazine Ph is where ambition meets artistry.
          </p>

          <div className="about-page__actions">
            <Link to="/magazines" className="btn-primary">Browse Issues</Link>
            <Link to="/articles" className="btn-ghost">Read Articles <span>→</span></Link>
          </div>
        </div>

        <div className="about-page__sidebar">
          <div className="about-page__logo-block">
            <img src="/logo.png" alt="Boss Magazine Ph" />
          </div>
        </div>
      </div>

      {/* ── BOSS TV ─────────────────────────────────────────────────────── */}
      <section className="about-bosstv">
        <div className="about-bosstv__inner">
          <div className="about-bosstv__header">
            <p className="section-label">Boss TV</p>
          </div>
          <div className="about-bosstv__grid">
            <div className="about-bosstv__block">
              <span className="about-bosstv__block-label">Address</span>
              <p className="about-bosstv__block-text">
                UP College of Law<br />
                Bonifacio Global City<br />
                Taguig City, 1604
              </p>
            </div>
            <div className="about-bosstv__block">
              <span className="about-bosstv__block-label">Contact</span>
              <div className="about-bosstv__contacts">
                {[
                  { type: 'Viber',     val: '+63 915.928.0721', href: 'viber://chat?number=%2B639159280721' },
                  { type: 'WhatsApp',  val: '+63 977.423.0751', href: 'https://wa.me/639774230751' },
                  { type: 'Signal',    val: '+63 915.928.0721', href: 'https://signal.me/#p/+639159280721' },
                  { type: 'Email',     val: 'remie.bossmagph@gmail.com', href: 'mailto:remie.bossmagph@gmail.com' },
                  { type: 'Email',     val: 'bosstvofficial.ph@gmail.com', href: 'mailto:bosstvofficial.ph@gmail.com' },
                ].map(({ type, val, href }) => (
                  <a key={val} href={href} className="about-bosstv__contact" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <span className="about-bosstv__contact-type">{type}</span>
                    <span className="about-bosstv__contact-val">{val}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BOARD ─────────────────────────────────────────────── */}
      <section className="about-editorial">
        <div className="about-editorial__inner">
          <div className="about-editorial__header">
            <p className="section-label">Editorial Board</p>
          </div>

          <div className="about-editorial__grid">
            {EDITORIAL_BOARD.map(({ role, name }) => (
              <div key={role} className="about-editorial__item">
                <span className="about-editorial__role">{role}</span>
                <span className="about-editorial__name">{name}</span>
              </div>
            ))}
          </div>

          <div className="about-editorial__office">
            <div className="about-editorial__office-block">
              <span className="about-editorial__office-label">Office Address</span>
              <p className="about-editorial__office-text">
                Arthaland Century Pacific Tower<br />
                5th Avenue, 30th St., Bonifacio Global City<br />
                Taguig City, Philippines
              </p>
            </div>

            <div className="about-editorial__office-block">
              <span className="about-editorial__office-label">Get in Touch</span>
              <div className="about-editorial__contacts">
                <a href="mailto:remie.bossmagph@gmail.com" className="about-editorial__contact">
                  <span className="about-editorial__contact-type">Email</span>
                  <span className="about-editorial__contact-val">remie.bossmagph@gmail.com</span>
                </a>
                <a href="https://facebook.com/BossMagazinePH" target="_blank" rel="noreferrer" className="about-editorial__contact">
                  <span className="about-editorial__contact-type">Facebook</span>
                  <span className="about-editorial__contact-val">Boss Magazine PH</span>
                </a>
                <a href="https://tiktok.com/@bossmediaphilippines" target="_blank" rel="noreferrer" className="about-editorial__contact">
                  <span className="about-editorial__contact-type">TikTok</span>
                  <span className="about-editorial__contact-val">Boss Media Philippines</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}