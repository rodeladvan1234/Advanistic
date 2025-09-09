import Link from 'next/link';

export default function AdminIndex() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Admin Panel</h2>
      <ul>
        <li><Link href="/admin/subscribers">Subscribers</Link></li>
        <li><Link href="/admin/users">Users</Link></li>
        <li><Link href="/admin/services">Services</Link></li>
        <li><Link href="/admin/products">Products</Link></li>
        <li><Link href="/admin/posts">Posts</Link></li>
        <li><Link href="/admin/releases">Releases</Link></li>
      </ul>
    </div>
  );
}
