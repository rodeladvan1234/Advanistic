import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function NewsletterSignup({ compact }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const data = await res.json();
      if (res.ok && data.success) setMsg('Subscribed — check your inbox');
      else setMsg(data.message || 'Subscribe failed');
    } catch (err) {
      setMsg('Server error');
    }
    setLoading(false);
  };

  if (compact) {
    return (
      <form onSubmit={submit} style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '.5rem' }} />
        <button type="submit" disabled={loading} style={{ padding: '.5rem', background: '#0070f3', color: '#fff', border: 'none' }}>{loading ? '...' : 'Subscribe'}</button>
        {msg && <div style={{ color: 'green' }}>{msg}</div>}
      </form>
    );
  }

  return (
    <div style={{ border: '1px solid #eee', padding: '1rem', borderRadius: 6 }}>
      <h4>Subscribe to our newsletter</h4>
      <p>Get updates on new courses, releases and special offers.</p>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        <input placeholder="Full name (optional)" value={name} onChange={e => setName(e.target.value)} style={{ padding: '.5rem' }} />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '.5rem' }} />
        <button type="submit" disabled={loading} style={{ padding: '.5rem', background: '#0070f3', color: '#fff', border: 'none' }}>{loading ? 'Subscribing...' : 'Subscribe'}</button>
      </form>
      {msg && <div style={{ marginTop: '.5rem' }}>{msg}</div>}
    </div>
  );
}
