import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const IMG_BALLROOM = 'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/BELMONT%20HOTEL/Northern%20Islands%20Ballroom%20-%20Banquet.jpg?raw=true'
const IMG_FACADE = 'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/BELMONT%20HOTEL/BHI_FACADE.jpg?raw=true'
const IMG_EVENT = 'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/BELMONT%20HOTEL/viber_image_2026-11-09_13-14-47-257.jpg?raw=true'

const GOLD = '#C9A227'
const CREAM = '#F5F0E8'
const SERIF = "'Cormorant Garamond', Georgia, serif"

const TITLE = "WHAT'S NEXT FOR BELMONT HOTEL ILOILO: NEW EXPERIENCES, BIGGER POSSIBILITIES"
const DECK = 'Belmont Hotel Iloilo looks ahead to bigger gatherings, fresh dining experiences, and more reasons to Come Find Your Iloilo.'
const INTRO = 'With its doors now open and operations in full swing, Belmont Hotel Iloilo enters a new chapter centered on bringing people together. Beyond offering contemporary accommodation, the hotel is expanding opportunities for corporate events, social celebrations, and experiences that showcase Iloilo’s flavors and culture, inviting travelers and locals alike to savor every moment in the City of Love.'

const GATHERINGS = [
  'Belmont Hotel Iloilo is strengthening its presence in the MICE sector. Located in Iloilo Business Park, the hotel brings together flexible event venues, contemporary guest rooms, and dining outlets to accommodate business and social occasions.',
  'Its Northern Islands Grand Ballroom welcomes up to 300 guests and can be divided into four function spaces: Pan de Azucar, Bantigue, Gigantes, and Agho. From corporate meetings and product launches to milestone celebrations, these venues support Iloilo’s growing appeal as a destination for business and events.',
]
const SPACES = ['Pan de Azucar', 'Bantigue', 'Gigantes', 'Agho']

const VISION_INTRO = 'For General Manager Joy Alonte, this next chapter means creating experiences that reflect the warmth and character of Iloilo while contributing to the city’s growth.'
const VISION_QUOTE = '“We want people to come find their Iloilo with us. Whether through a memorable stay, a meaningful gathering, or an experience that brings them closer to the city, we hope every visit offers something worth remembering. As we grow, we look forward to connecting with more people, celebrating local culture, and contributing to Iloilo’s development as a business and leisure destination,” says Ms. Alonte.'

const FLAVORS = [
  'This vision also takes shape through the hotel’s dining offerings. At Belmont Café, the hotel’s Modern Ilonggo Diner, guests can enjoy local favorites reimagined with contemporary touches alongside international selections. Zabana Bar and Float Bar provide inviting spaces to unwind and gather over drinks and bites.',
  'With Executive Chef Daryl Vance “Dale” Yulo Sy bringing his expertise to the team, guests can look forward to creative dishes and seasonal menus that celebrate Filipino flavors.',
]
const OUTLETS = [
  { name: 'Belmont Café', note: 'Modern Ilonggo Diner' },
  { name: 'Zabana Bar', note: 'Drinks and bites' },
  { name: 'Float Bar', note: 'Drinks and bites' },
]

const MOMENTS = [
  'Looking ahead, Belmont Hotel Iloilo will continue developing stay experiences, cultural collaborations, and seasonal celebrations that give guests more ways to experience the destination. Guided by the Sampaguita Brand of Service, the hotel brings its promise to Savor the Moment to life through warm Filipino hospitality and thoughtful service.',
  'Whether visiting for business, leisure, or a special occasion, guests are invited to Come Find Your Iloilo, one memorable moment at a time.',
]

// ── small helpers ──────────────────────────────────────────────
const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }

function Eyebrow({ children }) {
  return (
    <span style={{ display: 'block', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}>
      {children}
    </span>
  )
}

function Heading({ children }) {
  return (
    <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.25, letterSpacing: '0.02em', color: CREAM, margin: '0 0 18px' }}>
      {children}
    </h2>
  )
}

function Para({ children }) {
  return (
    <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(245,240,232,0.82)', margin: '0 0 16px' }}>
      {children}
    </p>
  )
}

function Photo({ src, alt, ratio = '3 / 2' }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ display: 'block', width: '100%', aspectRatio: ratio, objectFit: 'cover', boxShadow: '0 10px 40px rgba(0,0,0,0.55)' }}
    />
  )
}

function Split({ children, gap = 48 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap, alignItems: 'center' }}>
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(201,162,39,0.25)', margin: 'clamp(40px, 6vw, 72px) 0' }} />
}

export default function BelmontHotelIloilo() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main style={{ background: '#0d0d0d', color: CREAM, paddingBottom: 80 }}>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <header style={{ ...wrap, paddingTop: 32, paddingBottom: 36 }}>
        <Link to="/" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.55)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>

        <div style={{ maxWidth: 860, marginTop: 36 }}>
          <Eyebrow>Feature · Hospitality · Iloilo</Eyebrow>
          <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(28px, 4.2vw, 50px)', lineHeight: 1.15, color: CREAM, margin: '0 0 22px' }}>
            {TITLE}
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', lineHeight: 1.65, fontStyle: 'italic', color: 'rgba(245,240,232,0.7)', margin: 0 }}>
            {DECK}
          </p>
        </div>
      </header>

      {/* ── HERO PHOTO ───────────────────────────────────────── */}
      <div style={{ ...wrap }}>
        <img
          src={IMG_FACADE}
          alt="Belmont Hotel Iloilo facade at dusk"
          style={{ display: 'block', width: '100%', height: 'clamp(300px, 62vh, 680px)', objectFit: 'cover', objectPosition: 'center 35%', boxShadow: '0 10px 50px rgba(0,0,0,0.6)' }}
        />
      </div>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section style={{ ...wrap, marginTop: 'clamp(36px, 5vw, 60px)' }}>
        <p style={{ maxWidth: 820, margin: '0 auto', padding: '4px 0 4px 24px', borderLeft: `2px solid ${GOLD}`, fontFamily: SERIF, fontSize: 'clamp(19px, 2.2vw, 25px)', lineHeight: 1.6, color: CREAM }}>
          {INTRO}
        </p>
      </section>

      <div style={wrap}>
        <Divider />

        {/* ── GATHERINGS ─────────────────────────────────────── */}
        <section>
          <Split>
            <div>
              <Eyebrow>Events</Eyebrow>
              <Heading>SETTING THE STAGE FOR BIGGER GATHERINGS</Heading>
              {GATHERINGS.map((t, i) => <Para key={i}>{t}</Para>)}
            </div>
            <Photo src={IMG_BALLROOM} alt="Northern Islands Grand Ballroom set for a banquet" />
          </Split>

          {/* stat + function spaces */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 36 }}>
            <div style={{ flex: '1 1 180px', border: '1px solid rgba(201,162,39,0.35)', padding: '22px 24px' }}>
              <span style={{ display: 'block', fontFamily: SERIF, fontSize: 44, lineHeight: 1, color: GOLD }}>300</span>
              <span style={{ display: 'block', marginTop: 8, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>
                Guests, Northern Islands Grand Ballroom
              </span>
            </div>
            <div style={{ flex: '1 1 180px', border: '1px solid rgba(201,162,39,0.35)', padding: '22px 24px' }}>
              <span style={{ display: 'block', fontFamily: SERIF, fontSize: 44, lineHeight: 1, color: GOLD }}>4</span>
              <span style={{ display: 'block', marginTop: 8, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>
                Function spaces
              </span>
            </div>
            <div style={{ flex: '2 1 320px', border: '1px solid rgba(201,162,39,0.35)', padding: '22px 24px', display: 'flex', flexWrap: 'wrap', gap: 10, alignContent: 'center' }}>
              {SPACES.map(s => (
                <span key={s} style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: CREAM, background: 'rgba(201,162,39,0.14)', padding: '8px 14px' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── VISION ─────────────────────────────────────────── */}
        <section style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>The Vision</Eyebrow>
          <Heading>A VISION FOR WHAT’S AHEAD</Heading>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(245,240,232,0.82)', margin: '0 0 28px' }}>
            {VISION_INTRO}
          </p>
          <blockquote style={{ margin: 0, padding: '28px clamp(16px, 4vw, 40px)', background: 'rgba(201,162,39,0.07)', borderTop: `2px solid ${GOLD}`, borderBottom: `2px solid ${GOLD}`, fontFamily: SERIF, fontSize: 'clamp(18px, 2vw, 23px)', lineHeight: 1.65, fontStyle: 'italic', color: CREAM, textAlign: 'left' }}>
            {VISION_QUOTE}
          </blockquote>
        </section>

        <Divider />

        {/* ── FLAVORS ────────────────────────────────────────── */}
        <section>
          <div style={{ maxWidth: 860 }}>
            <Eyebrow>Dining</Eyebrow>
            <Heading>MORE FLAVORS, MORE EXPERIENCES</Heading>
            {FLAVORS.map((t, i) => <Para key={i}>{t}</Para>)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 28 }}>
            {OUTLETS.map(o => (
              <div key={o.name} style={{ border: '1px solid rgba(201,162,39,0.35)', padding: '22px 24px' }}>
                <span style={{ display: 'block', fontFamily: SERIF, fontSize: 24, color: CREAM }}>{o.name}</span>
                <span style={{ display: 'block', marginTop: 6, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>{o.note}</span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── MOMENTS ────────────────────────────────────────── */}
        <section>
          <Split>
            <Photo src={IMG_EVENT} alt="Guests applauding at a Belmont Hotel Iloilo event" />
            <div>
              <Eyebrow>Looking Ahead</Eyebrow>
              <Heading>MORE MOMENTS WORTH SAVORING</Heading>
              {MOMENTS.map((t, i) => <Para key={i}>{t}</Para>)}
            </div>
          </Split>
        </section>

        <Divider />

        {/* ── CONTACT ────────────────────────────────────────── */}
        <section style={{ maxWidth: 860, margin: '0 auto', border: '1px solid rgba(201,162,39,0.4)', padding: 'clamp(24px, 4vw, 40px)' }}>
          <Eyebrow>For inquiries and reservations</Eyebrow>
          <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 28, color: CREAM, margin: '0 0 16px' }}>Belmont Hotel Iloilo</h3>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(245,240,232,0.82)', margin: 0 }}>
            Iloilo Business Park, Mandurriao, Iloilo City<br />
            Trunkline: <a href="tel:+63335000840" style={{ color: GOLD, textDecoration: 'none' }}>(033) 500 0840</a><br />
            Website: <a href="https://www.belmontiloilo.com" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: 'none' }}>www.belmontiloilo.com</a><br />
            Facebook &amp; Instagram: @belmontiloiloph
          </p>
        </section>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}