import magazines from '../data/magazines'
import MagazineCard from '../components/MagazineCard'
import './Magazines.css'

export default function Magazines() {
  return (
    <main className="magazines-page">
      <div className="magazines-page__hero">
        <p className="section-label">Portfolio</p>
        <h1 className="magazines-page__title">Past Issues</h1>
        <p className="magazines-page__sub">Every issue of Boss Magazine Ph, from our first print to today.</p>
      </div>

      <div className="magazines-page__grid">
        {magazines.map(mag => (
          <MagazineCard key={mag.id} magazine={mag} />
        ))}
      </div>
    </main>
  )
}
