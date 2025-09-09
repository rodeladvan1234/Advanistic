import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const categoryTitles = {
  vt: "Vintage Theory's Releases",
  rodel: "Rodel's Releases",
  collabs: "Collabs Releases"
};

export default function ReleaseCategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`http://localhost:5000/api/releases/category/${id}`)
      .then(res => {
        setReleases(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setReleases([]);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '2rem 0' }}><p>Loading...</p></div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
        {categoryTitles[id] || 'Releases'}
      </h2>
      {releases.length === 0 ? (
        <p>No releases found for this category.</p>
      ) : (
        <div className="release-grid-row">
          {releases.map(release => (
            <div key={release.id} className="release-grid-card" style={{ marginBottom: '2rem', padding: 20, border: '1px solid #eee', borderRadius: 8, background: '#fafafa' }}>
              <h3 style={{ marginBottom: 8 }}>{release.title}</h3>
              {release.release_date && <p style={{ fontSize: 14, color: '#888' }}>Release date: {new Date(release.release_date).toLocaleDateString()}</p>}
              <p>{release.description}</p>
              {release.cover_url && <img src={release.cover_url} alt={release.title} style={{ maxWidth: '200px', borderRadius: '8px', marginBottom: 10 }} />}
              <div style={{ marginTop: '1rem' }}>
                {(() => {
                  const validUrl = [release.spotify_url, release.apple_url, release.youtube_url].find(
                    url => typeof url === 'string' && url.trim().length > 0
                  );
                  return validUrl ? (
                    <a
                      href={validUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="listen-btn"
                      style={{
                        display: 'inline-block',
                        padding: '8px 18px',
                        background: '#1db954',
                        color: '#fff',
                        borderRadius: 5,
                        textDecoration: 'none',
                        fontWeight: 600
                      }}
                    >
                      Listen Now
                    </a>
                  ) : (
                    <button disabled style={{
                      padding: '8px 18px',
                      background: '#ccc',
                      color: '#fff',
                      borderRadius: 5,
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'not-allowed',
                      opacity: 0.7
                    }}>Listen Now</button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}