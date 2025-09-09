import { useEffect, useState } from 'react';
import Link from 'next/link';
import Register from '../pages/register';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function LoginPanel({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  // Open on mount (plays slide-in)
  useEffect(() => {
    // next tick to ensure CSS applies
    const t = setTimeout(() => setIsOpen(true), 0);
    return () => clearTimeout(t);
  }, []);

  // fetch current user session
  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/api/me`, { credentials: 'include' }).then(r => r.json()).then(data => {
      if (!mounted) return;
      if (data && data.success && data.user) setUser(data.user);
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    // play slide-out, then unmount after animation
    setIsOpen(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // match CSS transition duration
  };

  return (
    <div className="loginOverlay" role="dialog" aria-modal="true" onClick={handleClose}>
      {/* stop click-through inside the panel */}
      <div
        className={`loginPanel ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="loginCloseBtn" onClick={handleClose} aria-label="Close login">✖</button>

        <h2 style={{ marginTop: 0 }}>Login</h2>

        {!user ? (
          <>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true); setError('');
              try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
                  body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                  setUser(data.user);
                } else {
                  setError(data.message || 'Login failed');
                }
              } catch (err) { setError('Server error'); }
              setLoading(false);
            }}>
              <label>Email</label>
              <input type="email" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)} required />
              <label>Password</label>
              <input type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} required />
              <button type="submit" style={{ marginTop: 12 }}>{loading ? 'Logging in...' : 'Login'}</button>
              {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            </form>
            <div><Register /></div>

            <hr style={{ margin: '16px 0' }} />

            <button onClick={() => (window.location.href = `${API_BASE}/auth/google`)}>Continue with Google</button>
            <div style={{ marginTop: 8 }}><Link href="/register">Create an account</Link></div>
          </>
        ) : (
          <div>
            <div style={{ marginBottom: 8 }}>Signed in as <strong>{user.name || user.email}</strong></div>
            <button onClick={async () => {
              try {
                await fetch(`${API_BASE}/auth/logout`, { credentials: 'include' });
              } catch (e) {}
              setUser(null);
              // refresh to update UI across app
              window.location.reload();
            }} style={{ background: 'red', color: '#fff', padding: '.5rem 1rem', border: 'none', borderRadius: 4 }}>Logout</button>
          </div>
        )}
      </div>
      
    </div>
  );
}
