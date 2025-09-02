import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Store() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data.data || []))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Store</h2>
      <p>Support us by purchasing merch or digital downloads.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {products.map(prod => (
          <div key={prod.id} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <h3>{prod.name}</h3>
            <p>{prod.description?.substring(0, 80)}...</p>
            <p><strong>BDT {prod.price}</strong></p>
            <p>Stock: {prod.inventory}</p>
            <Link href={`/store/${prod.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}