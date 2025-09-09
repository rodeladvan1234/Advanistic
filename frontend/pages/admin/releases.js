import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ReleasesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    release_date: '',
    cover_url: '',
    thumbnail_url: '',
    description: '',
    spotify_url: '',
    apple_url: '',
    youtube_url: '',
    category: ''
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/releases`).then(r => r.json()).then(data => {
      if (data.success) setItems(data.data || []);
    }).catch(() => {});
  }, []);


  const [editId, setEditId] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (editId) {
      // Edit mode
      const res = await fetch(`${API_BASE}/admin/releases/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.map(i => i.id === editId ? data.data : i));
        setEditId(null);
        setForm({ title: '', summary: '', release_date: '', link: '', category: '' });
      }
    } else {
      // Create mode
      const res = await fetch(`${API_BASE}/admin/releases`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) setItems([data.data, ...items]);
    }
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
      <h2>Releases</h2>
  <form onSubmit={submit} style={{ display: 'grid', gap: '.5rem', maxWidth: 600 }}>
    <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
    <input type="date" placeholder="Release Date" value={form.release_date} onChange={e => setForm({ ...form, release_date: e.target.value })} />
    <input placeholder="Cover Image URL" value={form.cover_url} onChange={e => setForm({ ...form, cover_url: e.target.value })} />
    <input placeholder="Thumbnail Image URL" value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })} />
    <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
    <input placeholder="Spotify URL" value={form.spotify_url} onChange={e => setForm({ ...form, spotify_url: e.target.value })} />
    <input placeholder="Apple Music URL" value={form.apple_url} onChange={e => setForm({ ...form, apple_url: e.target.value })} />
    <input placeholder="YouTube URL" value={form.youtube_url} onChange={e => setForm({ ...form, youtube_url: e.target.value })} />
    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
      <option value="">Select Category</option>
      <option value="vt">VT</option>
      <option value="rodel">Rodel</option>
      <option value="collabs">Collabs</option>
    </select>
    <button type="submit">{editId ? 'Update Release' : 'Create Release'}</button>
    {editId && <button type="button" onClick={() => { setEditId(null); setForm({
      title: '',
      release_date: '',
      cover_url: '',
      thumbnail_url: '',
      description: '',
      spotify_url: '',
      apple_url: '',
      youtube_url: '',
      category: ''
    }); }}>Cancel</button>}
  </form>

      <div style={{ marginTop: '1rem' }}>
        {items.map(i => (
          <div key={i.id} style={{ padding: '.5rem 0', borderBottom: '1px solid #eee' }}>
            <strong>{i.title}</strong> <em style={{ color: '#666' }}>{i.release_date}</em> <span style={{ color: '#00af66', fontWeight: 600 }}>{i.category}</span>
            <div>{i.summary}</div>
            <button type="button" style={{ marginTop: 4, fontSize: 12 }} onClick={() => { setEditId(i.id); setForm({
              title: i.title || '',
              release_date: i.release_date || '',
              cover_url: i.cover_url || '',
              thumbnail_url: i.thumbnail_url || '',
              description: i.description || '',
              spotify_url: i.spotify_url || '',
              apple_url: i.apple_url || '',
              youtube_url: i.youtube_url || '',
              category: i.category || ''
            }); }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
