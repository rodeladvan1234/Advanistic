import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', inventory: '' });

  useEffect(() => {
    fetch(`${API_BASE}/api/products`).then(r => r.json()).then(data => {
      if (data.success) setProducts(data.data || []);
    }).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/admin/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.success) setProducts([data.data, ...products]);
  };

  return (
    <div className="container" style={{ padding: '2rem 0', position: 'relative' }}>
      <Link href="/admin">
        <button
          style={{
            position: 'absolute', left: 10, top: 10, width: 44, height: 44, borderRadius: '50%', background: '#222', color: '#fff', border: 'none', fontSize: 22, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
          title="Back to Admin Panel"
        >
          ⬅
        </button>
      </Link>
      <h2>Products</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: '.5rem', maxWidth: 600 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Inventory" value={form.inventory} onChange={e => setForm({ ...form, inventory: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Create Product</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        {products.map(p => (
          <div key={p.id} style={{ padding: '.5rem 0', borderBottom: '1px solid #eee' }}>
            <strong>{p.name}</strong> — BDT {p.price} — stock: {p.inventory}
          </div>
        ))}
      </div>
    </div>
  );
}
