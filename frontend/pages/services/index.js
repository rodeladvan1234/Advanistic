import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data.data || []))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Services</h2>
      <p>Browse our offerings in design, development, consulting and more. Each service can be customised with packages and add‑ons.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {services.map(service => (
          <div key={service.id} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <h3>{service.name}</h3>
            <p>{service.description?.substring(0, 100)}...</p>
            <p><strong>From BDT {service.base_price}</strong></p>
            <Link href={`/services/${service.id}`}>View Packages</Link>
          </div>
        ))}
      </div>
    </div>
  );
}