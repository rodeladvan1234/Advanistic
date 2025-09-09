import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Register() {
  const router = useRouter();
  const { name: qname, email: qemail, avatar, google_new } = router.query;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscribe, setSubscribe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (qname) setName(qname);
    if (qemail) setEmail(qemail);
  }, [qname, qemail]);

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

  const completeGoogle = async () => {
    setError('');
    if (!email || !password) return setError('Email and password required');
    try {
      const res = await fetch(`${API_BASE}/auth/set-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = '/dashboard';
      } else setError(data.message || 'Failed');
    } catch (err) { setError('Server error'); }
  };

  return (
    <div className="container" style={{ maxWidth: 480, margin: '3rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {avatar && <img src={avatar} alt="avatar" style={{ width: 80, height: 80, borderRadius: 40 }} />}
        <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} style={{ padding: '.75rem' }} />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '.75rem' }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '.75rem' }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <input type="checkbox" checked={subscribe} onChange={e => setSubscribe(e.target.checked)} /> Subscribe to newsletter
        </label>
        {!google_new && <button disabled={loading} style={{ padding: '.75rem', background: '##00af66', color: '#fff', border: 'none', borderRadius: 4 }}>{loading ? 'Registering...' : 'Register'}</button>}
        {google_new && <button type="button" onClick={completeGoogle} style={{ padding: '.75rem', background: '#00af66', color: '#fff', border: 'none', borderRadius: 4 }}>Set password and continue</button>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <hr style={{ margin: '1.5rem 0' }} />
      {/* <button onClick={() => (window.location.href = `${API_BASE}/auth/google`)} style={{ width: '100%', padding: '.75rem', background: '#4285F4', color: '#fff', border: 'none', borderRadius: 4 }}>Continue with Google</button> */}
    </div>
  );
}
