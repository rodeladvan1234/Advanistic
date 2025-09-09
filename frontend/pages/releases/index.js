
import Link from 'next/link';

const releaseGrids = [
  {
    key: 'vt',
    title: 'VT Release',
    image: '/images/vt-releases.png',
    link: '/releases/vt',
  },
  {
    key: 'rodel',
    title: 'Rodel Release',
    image: '/images/rodel-releases.png',
    link: '/releases/rodel',
  },
  {
    key: 'collabs',
    title: 'Collabs',
    image: '/images/collabs-releases.png',
    link: '/releases/collabs',
  },
];

export default function Releases() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
  <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Music Releases</h2>
      <div className="release-grid-row">
        {releaseGrids.map((rel) => (
          <Link href={rel.link} key={rel.key} legacyBehavior>
            <a className="release-grid-card no-bottom-gap" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="release-img-wrap" style={{ position: 'relative', height: '100%' }}>
                <img src={rel.image} alt={rel.title} className="release-img" />
                <span className="explore-btn-onimg">Explore</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}