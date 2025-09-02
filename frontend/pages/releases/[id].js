import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReleaseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [release, setRelease] = useState(null);
  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:5000/api/releases/${id}`)
      .then(res => setRelease(res.data.data))
      .catch(err => console.error(err));
  }, [id]);
  if (!release) return <div className="container" style={{ padding: '2rem 0' }}><p>Loading...</p></div>;
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>{release.title}</h2>
      {release.release_date && <p>Release date: {new Date(release.release_date).toLocaleDateString()}</p>}
      <p>{release.description}</p>
      {release.cover_url && <img src={release.cover_url} alt={release.title} style={{ maxWidth: '300px', borderRadius: '8px' }} />}
      <div style={{ marginTop: '1rem' }}>
        {release.spotify_url && <p><a href={release.spotify_url} target="_blank" rel="noopener noreferrer">Listen on Spotify</a></p>}
        {release.apple_url && <p><a href={release.apple_url} target="_blank" rel="noopener noreferrer">Listen on Apple Music</a></p>}
        {release.youtube_url && <p><a href={release.youtube_url} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>}
      </div>
    </div>
  );
}