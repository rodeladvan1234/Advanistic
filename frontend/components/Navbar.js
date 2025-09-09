import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check login status from localStorage or cookie (simple demo)
    const checkLogin = () => setLoggedIn(!!localStorage.getItem('advanistic_logged_in'));
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('advanistic_logged_in');
    setLoggedIn(false);
    router.push('/');
  };

  // Listen for login event and redirect to home
  useEffect(() => {
    const handleLogin = (e) => {
      if (e.key === 'advanistic_logged_in' && e.newValue) {
        setLoggedIn(true);
        router.push('/');
      }
    };
    window.addEventListener('storage', handleLogin);
    return () => window.removeEventListener('storage', handleLogin);
  }, [router]);

  return (
    <header>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, style: { color: '#ffffff' } }}><Link href="/">Advanistic</Link></h1>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            {/* <li><Link href="/courses">Courses</Link></li> */}
            {/* <li><Link href="/store">Store</Link></li> */}
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/releases">Releases</Link></li>
            <li>
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  style={{ cursor: 'pointer', color: '#fff', backgroundColor: '#d32f2f', fontWeight: 700 }}
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button style={{ cursor: 'pointer', color: '#fff', backgroundColor: '#00af66', fontWeight: 700 }}>
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
