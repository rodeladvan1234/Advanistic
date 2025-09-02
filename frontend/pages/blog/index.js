import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data.data || []))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Blog</h2>
      <p>Read articles about music production, editing, behind the scenes and tech write‑ups.</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '1rem', background: '#fff', padding: '1rem', borderRadius: '8px' }}>
            <h3>{post.title}</h3>
            <p>{post.content?.substring(0, 120)}...</p>
            <Link href={`/blog/${post.slug}`}>Read more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}