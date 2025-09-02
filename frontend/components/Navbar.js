import Link from 'next/link';
import { useState } from 'react';
import LoginPanel from './LoginPanel';

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, style: { color: '#ffffff' } }}><Link href="/">rodeladvan.com</Link></h1>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/store">Store</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/releases">Releases</Link></li>
            <li>
              <button onClick={() => setShowLogin(true)} style={{ cursor: 'pointer', color : '#ffffff', backgroundColor: '#00a3e0' }}>
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {showLogin && <LoginPanel onClose={() => setShowLogin(false)} />}
    </header>
  );
}
