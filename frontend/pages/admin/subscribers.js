import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

import Link from 'next/link';
export default function SubscribersPage() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/admin/subscribers`).then(r => r.json()).then(data => {
      if (data.success) setSubs(data.data || []);
    }).catch(() => {});
  }, []);

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
      <h2>Subscribers</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {subs.map(s => (
            <tr key={s.id}>
                <td style={{ padding: '.5rem 0' }}>{s.id}</td>
                <td style={{ padding: '.5rem 0' }}>{s.email}</td>
                <td style={{ padding: '.5rem 0' }}>{s.name}</td>
                <td style={{ padding: '.5rem 0' }}>{s.subscribed_at || s.created_at || ''}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
