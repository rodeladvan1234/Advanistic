import { useEffect, useState } from 'react';

export default function LoginPanel({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  // Open on mount (plays slide-in)
  useEffect(() => {
    // next tick to ensure CSS applies
    const t = setTimeout(() => setIsOpen(true), 0);
    return () => clearTimeout(t);
  }, []);

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

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter email" required />
          <label>Password</label>
          <input type="password" placeholder="Enter password" required />
          <button type="submit" style={{ marginTop: 12 }}>Login</button>
        </form>

        <hr style={{ margin: '16px 0' }} />

        <button
          onClick={() => (window.location.href = 'http://localhost:5000/auth/google')}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
