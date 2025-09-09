// needs newsletter signup component on about page
import Link from 'next/link';
import NewsletterSignup from '../components/NewsletterSignup';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Box({ children, style }) {
  return (
    <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.06)', marginBottom: '1.25rem', ...style }}>
      {children}
    </div>
  );
}

export default function About() {
  const [caseStudies, setCaseStudies] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/case-studies')
      .then(res => setCaseStudies(res.data.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Box style={{
        textAlign: 'center',
        color: '#fff',
        backgroundImage: 'url(/images/grungebg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
      }}>
        <h1 style={{ margin: 0, color: '#fff', textShadow: '0 2px 12px #0008' }}>Advanistic Designs</h1>
        <p style={{ marginTop: '.5rem', color: '#fff', textShadow: '0 1px 8px #0007' }}>A hybrid portfolio & micro‑agency for multi‑disciplinary creation — projects, courses, merch and more.</p>
  <div style={{ marginTop: '0.5rem' }}>
          <Link href="/services"><button className="explore-btn">Explore Services</button></Link>
          <Link href="/courses"><button className="explore-btn" style={{ marginLeft: '1rem' }}>Browse Courses</button></Link>
        </div>
      </Box>

      {/* Two-column area: About (left) and Newsletter (right) */}
      <div className="twoCol">
        <div>
          <Box>
            <h2>About</h2>
            <p>Advanistic Design is a multi‑disciplinary creator with a passion for technology and the arts. This platform centralises his work across computer science, design, motion graphics, video production and music releases.</p>
            <h3>Mission</h3>
            <p>To merge creativity and technology, empower clients and students, and foster a community of fans through meaningful digital experiences.</p>
          </Box>
        </div>
        <div>
          <Box>
            <NewsletterSignup />
          </Box>
        </div>
      </div>

      <style jsx>{`
        .twoCol { display: grid; gap: 1rem; margin-top: 1rem; }
        @media (min-width: 880px) {
          .twoCol { grid-template-columns: 1fr 320px; align-items: start; }
        }
      `}</style>
    </div>
  );
}

