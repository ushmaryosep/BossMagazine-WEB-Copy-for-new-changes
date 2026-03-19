import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">

      {/* ── Editorial strip ────────────────────────────────────────────── */}
      <div className="footer__editorial">
        <span className="footer__editorial-title">Editorial Board</span>
        <div className="footer__editorial-list">
          <span><em>Publisher</em> BOSS Media Philippines, Co. LTD.</span>
          <span><em>Editor-in-Chief</em> Remie Degoma</span>
          <span><em>Executive Editor</em> Johnny Chotrani</span>
          <span><em>Managing Editor</em> Sofyan Alawi</span>
          <span><em>Feature Editor</em> Lugille L. Roberto</span>
          <span><em>Sr. Graphics Designer &amp; Webmaster</em> JM Clavero</span>
          <span><em>Sr. Marketing Specialist</em> Francisca N. Dimayuga</span>
          <span><em>Digital Team</em> Boss TechSolutions PH</span>
          <span><em>PR Team</em> Blue Oak Strategies</span>
        </div>
      </div>

      {/* ── Main footer body ───────────────────────────────────────────── */}
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/logo.png" alt="Boss Magazine Ph" className="footer__logo" />
          <p className="footer__tagline">
            Showcasing Filipino excellence —<br />in print and beyond.
          </p>
          <p className="footer__address">
            Arthaland Century Pacific Tower<br />
            5th Avenue, 30th St., Bonifacio Global City<br />
            Taguig City, Philippines
          </p>
          <a href="mailto:remie.bossmagph@gmail.com" className="footer__email">
            remie.bossmagph@gmail.com
          </a>
        </div>

        <div className="footer__nav">
          <div className="footer__col">
            <span className="footer__col-title">Explore</span>
            <Link to="/magazines">Magazines</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="footer__col">
            <span className="footer__col-title">Connect</span>
            <a href="https://www.facebook.com/BossMagazinePH" target="_blank" rel="noreferrer">FB: Boss Magazine PH</a>
            <a href="https://www.tiktok.com/@bossmediaphilippines" target="_blank" rel="noreferrer">TikTok: Boss Media Philippines</a>
            <a href="mailto:remie.bossmagph@gmail.com">Email Us</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">© {new Date().getFullYear()} BOSS Media Philippines, Co. LTD. All rights reserved.</span>
        <div className="footer__bottom-links">
          <Link to="/about">About</Link>
          <Link to="/articles">Articles</Link>
        </div>
      </div>

    </footer>
  )
}