import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Releases() {
  const [releases, setReleases] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/releases')
      .then(res => setReleases(res.data.data || []))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Music Releases</h2>
      <p>Explore our latest singles, EPs and albums.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {releases.map(rel => (
          <div key={rel.id} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <h3>{rel.title}</h3>
            {rel.release_date && <p>Released on {new Date(rel.release_date).toLocaleDateString()}</p>}
            <Link href={`/releases/${rel.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}