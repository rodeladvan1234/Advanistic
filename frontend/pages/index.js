import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [caseStudies, setCaseStudies] = useState([]);
  useEffect(() => {
    // Fetch the latest case studies to display on the homepage
    axios.get('http://localhost:5000/api/case-studies')
      .then(res => setCaseStudies(res.data.data || []))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="container">
      <section style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h2>Welcome to RodelAdvan</h2>
        <p>A hybrid portfolio & micro‑agency for multi‑disciplinary creation. Explore computer science projects, design & video work, music releases, services, courses and more.</p>
        <div style={{ marginTop: '2rem' }}>
          <Link href="/services"><button>Explore Services</button></Link>
          <Link href="/courses"><button style={{ marginLeft: '1rem' }}>Browse Courses</button></Link>
        </div>
      </section>
      <section>
        <h3>Latest Case Studies</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {caseStudies.slice(0, 3).map(cs => (
            <div key={cs.id} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
              <h4>{cs.title}</h4>
              <p>{cs.description?.substring(0, 100)}...</p>
              <Link href={`/case-studies/${cs.slug}`}>Read more</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}