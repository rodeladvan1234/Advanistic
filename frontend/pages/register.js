import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscribe, setSubscribe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, subscribe })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: 480, margin: '3rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} style={{ padding: '.75rem' }} />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '.75rem' }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '.75rem' }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <input type="checkbox" checked={subscribe} onChange={e => setSubscribe(e.target.checked)} /> Subscribe to newsletter
        </label>
        <button disabled={loading} style={{ padding: '.75rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4 }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <hr style={{ margin: '1.5rem 0' }} />
      <button onClick={() => (window.location.href = `${API_BASE}/auth/google`)} style={{ width: '100%', padding: '.75rem', background: '#4285F4', color: '#fff', border: 'none', borderRadius: 4 }}>Continue with Google</button>
    </div>
  );
}
