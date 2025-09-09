import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function NewslettersPage() {
  const [newsletters, setNewsletters] = useState([]);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    thumbnail_url: '',
    author_id: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/posts`).then(r => r.json()).then(data => {
      if (data.success) setNewsletters(data.data || []);
    }).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/admin/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.success) setNewsletters([data.data, ...newsletters]);
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
      <h2>Newsletters</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: '.5rem', maxWidth: 600 }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
        <input placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })} />
        <textarea placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
        <input placeholder="Author ID" value={form.author_id} onChange={e => setForm({ ...form, author_id: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
        <button type="submit">Create Newsletter</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        {newsletters.map(n => (
          <div key={n.id} style={{ padding: '.5rem 0', borderBottom: '1px solid #eee' }}>
            <strong>{n.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
