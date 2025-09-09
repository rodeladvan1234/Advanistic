import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', base_price: '', category: '', thumbnail_url: '' });

  useEffect(() => {
    fetch(`${API_BASE}/api/services`).then(r => r.json()).then(data => {
      if (data.success) setServices(data.data || []);
    }).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    const res = await fetch(`${API_BASE}/admin/services`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.success) {
      setServices([data.data, ...services]);
      setForm({ name: '', description: '', base_price: '', category: '', thumbnail_url: '' });
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return;
    const res = await fetch(`${API_BASE}/admin/services/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) setServices(services.filter(s => s.id !== id));
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
      <h2>Services</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: '.5rem', maxWidth: 600 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Base price" type="number" value={form.base_price} onChange={e => setForm({ ...form, base_price: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
  <input placeholder="Thumbnail URL (e.g. /images/yourfile.jpg)" value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })} />
  <small style={{ color: '#666' }}>Paste a direct image link, e.g. /images/yourfile.jpg</small>
        <button type="submit">Create Service</button>
      </form>

      <div style={{ marginTop: '1rem', display: 'grid', gap: '.75rem' }}>
        {services.map(s => (
          <div key={s.id} style={{ padding: '.5rem', border: '1px solid #eee', display: 'flex', gap: '.75rem', alignItems: 'center' }}>
            <div style={{ width: 80, height: 80, flex: '0 0 80px', borderRadius: 6, overflow: 'hidden', background: '#f6f6f6' }}>
              {s.thumbnail_url ? <img src={s.thumbnail_url} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#999'}}>No image</div>}
            </div>
            <div style={{ flex: 1 }}>
              <strong>{s.name}</strong>
              <div style={{ color: '#666' }}>{s.category} — BDT {s.base_price}</div>
            </div>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <button onClick={() => remove(s.id)} style={{ background: '#ff6666', color: '#fff', border: 'none', padding: '.4rem .6rem', borderRadius: 4 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
