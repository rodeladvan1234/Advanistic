import { useState } from "react";
import NewsletterSignup from '../components/NewsletterSignup';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Login() {
  const handleGoogleLogin = () => {
    // Redirect to the backend Google OAuth endpoint
    window.location.href = `${API_BASE}/auth/google`;
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Redirect to dashboard or set auth state
        window.location.href = "/dashboard";
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: 900, margin: "4rem auto", padding: "2rem", display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1, border: '1px solid #eee', padding: '1.5rem', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: "0.75rem", fontSize: "1rem", borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: "0.75rem", fontSize: "1rem", borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "0.75rem", fontSize: "1rem", borderRadius: 4, background: "#0070f3", color: "#fff", border: "none" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>}
      </form>
      <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
        <button onClick={() => (window.location.href = "/register")} style={{ flex: 1, padding: "0.75rem", fontSize: "1rem", borderRadius: 4, background: "#34a853", color: "#fff", border: "none" }}>
          Register
        </button>
        <button onClick={() => (window.location.href = `${API_BASE}/auth/google`)} style={{ flex: 1, padding: "0.75rem", fontSize: "1rem", borderRadius: 4, background: "#4285F4", color: "#fff", border: "none" }}>
          Continue with Google
        </button>
      </div>
      </div>
      <aside style={{ width: 320 }}>
        <NewsletterSignup />
      </aside>
    </div>
  );
}