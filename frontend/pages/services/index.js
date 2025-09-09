import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import NewsletterSignup from '../../components/NewsletterSignup';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function Box({ children, style }) {
  return (
    <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.06)', marginBottom: '1.25rem', ...style }}>
      {children}
    </div>
  );
} 

export default function Services() {
  const [services, setServices] = useState([]);
  const [booking, setBooking] = useState({ open: false, service: null });

  useEffect(() => {
    axios.get(`${API_BASE}/api/services`)
      .then(res => setServices(res.data.data || []))
      .catch(err => console.error(err));
  }, []);

  const openBooking = (service) => setBooking({ open: true, service });
  const closeBooking = () => setBooking({ open: false, service: null });

  const startBooking = async () => {
    // For demo: create a booking and redirect to sandbox payment
    const payload = {
      user_id: 1, // dummy user; in real app use logged in user id
      service_id: booking.service.id,
      date: new Date().toISOString(),
      amount: booking.service.base_price
    };
    try {
      const res = await axios.post('http://localhost:5000/api/book', payload);
      if (res.data.success && res.data.redirect) {
        window.location.href = res.data.redirect;
      }
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Services</h2>
      <p>Browse our offerings in design, development, consulting and more. Each service can be customised with packages and add‑ons.</p>
      <div className="twoCol" style={{ marginTop: '1rem' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {services.map(service => (
              <div key={service.id} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', paddingTop: '100%', position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#f6f6f6' }}>
                  {service.thumbnail_url ? (
                    <img
                      src={service.thumbnail_url.startsWith('/images/') ? `${API_BASE}${service.thumbnail_url}` : service.thumbnail_url}
                      alt="thumb"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : null}
                </div>
                <h3 style={{ marginTop: '.75rem' }}>{service.name}</h3>
                <p style={{ color: '#555', flex: 1 }}>{service.description?.substring(0, 120)}...</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.5rem' }}>
                  <strong>BDT {service.base_price}</strong>
                  <div style={{ display: 'flex', gap: '.5rem' }}>
                    <Link href={`/services/${service.id}`} style={{ padding: '.4rem .6rem', background: '#00af66', color: '#fff', borderRadius: 6, fontWeight: 600 }}>View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <Box style={{ textAlign: 'center' }}>
            <h3 style={{ marginTop: 0 }}>Book a Consultation</h3>
            <p style={{ margin: '.25rem 0 1rem', color: '#555' }}>Schedule a one-on-one consultation to discuss your project.</p>
            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3JySB3zTDIo49FF11stsqBEBwX-jfWIrnXLnAa8Oc4PUCieEYrzUxhAkl3QVO5hmDo32bfM0ls" target="_blank" rel="noopener noreferrer">
              <button style={{ background: '#00af66', color: '#fff', border: 'none', padding: '.6rem 1rem', borderRadius: 6 }}>Book A Consultation</button>
            </a>
          </Box>
        </aside>
      </div>

      {booking.open && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
          <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 8, width: 420, maxWidth: '95%' }}>
            <h3>Book: {booking.service.name}</h3>
            <p>50% advance payment will be required. You will be redirected to the payment gateway sandbox.</p>
            <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button onClick={closeBooking} style={{ padding: '.5rem .8rem', borderRadius: 6 }}>Cancel</button>
              <button onClick={startBooking} style={{ padding: '.5rem .8rem', borderRadius: 6, background: '#0070f3', color: '#fff', border: 'none' }}>Proceed to Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}