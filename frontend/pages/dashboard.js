import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Attempt to fetch the logged-in user's session. In a real app you would
    // protect this route and fetch from your backend. For now, we'll call
    // a placeholder that returns the authenticated user if the session exists.
    axios.get('http://localhost:5000/api/me', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);
  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/auth/logout';
  };
  if (!user) return <div className="container" style={{ padding: '2rem 0' }}><p>Loading...</p></div>;
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name} ({user.email})!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}