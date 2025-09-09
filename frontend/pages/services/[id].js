
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ServiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/services/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setService(data.data);
        else setError('Service not found');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load service');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;
  if (!service) return null;

  return (
    <div className="container" style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <Link href="/services" style={{ color: '#00af66', fontWeight: 700, marginBottom: 16, display: 'inline-block' }}>&larr; Back to Services</Link>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {service.thumbnail_url && (
          <img src={service.thumbnail_url} alt="thumbnail" style={{ width: 220, height: 220, objectFit: 'cover', borderRadius: 8, background: '#f6f6f6' }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0 }}>{service.name}</h1>
          <p style={{ color: '#555', fontSize: '1.1rem' }}>{service.description}</p>
          <div style={{ margin: '1rem 0', fontWeight: 700 }}>BDT {service.base_price}</div>
          <button
            onClick={() => setShowBooking(true)}
            style={{
              padding: '.7rem 1.2rem',
              background: '#00af66',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: '1rem',
              marginBottom: '2.5rem', // Add extra space below the button
              marginTop: '.5rem'
            }}
          >
            Book a Consultation
          </button>
        </div>
      </div>
      {showBooking && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f9f9f9', borderRadius: 8 }}>
          <h2>Book a Consultation</h2>
          <p>Booking form coming soon!</p>
          <button onClick={() => setShowBooking(false)} style={{ marginTop: 12, background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '.5rem 1rem' }}>Cancel</button>
        </div>
      )}
    </div>
  );
}