import { useState } from 'react'
import magazines from '../data/magazines'
import MagazineCard from '../components/MagazineCard'
import MagazineViewer from '../components/MagazineViewer'
import './Magazines.css'

export default function Magazines() {
  const [viewing, setViewing] = useState(null)

  return (
    <>
      <main className="magazines-page">
        <div className="magazines-page__hero">
          <p className="section-label">Portfolio</p>
          <h1 className="magazines-page__title">All Issues</h1>
          <p className="magazines-page__sub">Every issue of Boss Magazine Ph — click any cover to read.</p>
        </div>

        <div className="magazines-page__grid">
          {magazines.map(mag => (
            <MagazineCard
              key={mag.id}
              magazine={mag}
              onOpen={setViewing}
            />
          ))}
        </div>
      </main>

      {viewing && (
        <MagazineViewer
          magazine={viewing}
          onClose={() => setViewing(null)}
        />
      )}
    </>
  )
}