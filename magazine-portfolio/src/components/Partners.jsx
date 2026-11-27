import './Partners.css'

const LOGOS = [
  '/images/PARTNER%20COMPANIES/1.png',
  '/images/PARTNER%20COMPANIES/2.png',
  '/images/PARTNER%20COMPANIES/3.png',
  '/images/PARTNER%20COMPANIES/4.png',
  '/images/PARTNER%20COMPANIES/5.png',
  '/images/PARTNER%20COMPANIES/6.png',
  '/images/PARTNER%20COMPANIES/7.png',
  '/images/PARTNER%20COMPANIES/8.png',
  '/images/PARTNER%20COMPANIES/9.png',
  '/images/PARTNER%20COMPANIES/10.png',
  '/images/PARTNER%20COMPANIES/11.png',
  '/images/PARTNER%20COMPANIES/12.png',
  '/images/PARTNER%20COMPANIES/13.png',
  '/images/PARTNER%20COMPANIES/14.png',
  '/images/PARTNER%20COMPANIES/15.png',
  '/images/PARTNER%20COMPANIES/16.png',
  '/images/PARTNER%20COMPANIES/17.png',
]

export default function Partners() {
  // Duplicate for seamless infinite loop
  const track = [...LOGOS, ...LOGOS]

  return (
    <section className="partners">
      <div className="partners__header">
        <p className="section-label">Our Partners</p>
        <p className="partners__sub">Proudly partnered with leading organizations across the Philippines and beyond.</p>
      </div>

      <div className="partners__marquee-wrap">
        {/* Fade edges */}
        <div className="partners__fade partners__fade--left" />
        <div className="partners__fade partners__fade--right" />

        <div className="partners__track">
          {track.map((src, i) => (
            <div key={i} className="partners__logo-wrap">
              <img
                src={src}
                alt={`Partner ${(i % LOGOS.length) + 1}`}
                className="partners__logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}