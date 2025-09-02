import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ServiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:5000/api/services/${id}`)
      .then(res => {
        setService(res.data.data);
        setPackages(res.data.data.packages || []);
      })
      .catch(err => console.error(err));
  }, [id]);
  if (!service) return <div className="container" style={{ padding: '2rem 0' }}><p>Loading...</p></div>;
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <h3>Packages</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {packages.map(pkg => (
          <li key={pkg.id} style={{ marginBottom: '1rem', background: '#fff', padding: '1rem', borderRadius: '8px' }}>
            <h4>{pkg.name}</h4>
            <p>{pkg.features}</p>
            <p><strong>BDT {pkg.price}</strong></p>
            {/* In a real app, clicking Book would open a calendar/checkout flow */}
            <button onClick={() => alert(`Package ${pkg.name} booking coming soon`)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}