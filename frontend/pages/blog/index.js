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

  if (!posts.length) {
    return <div className="container" style={{ padding: '2rem 0' }}><h2>Blog</h2><p>No articles found.</p></div>;
  }

  // Featured article is the most recent
  const [featured, ...rest] = posts;

  return (
    <div className="newspaper-blog-container">
  <h1 className="newspaper-title">Advanistic News</h1>
      <div className="newspaper-featured">
        <div className="featured-article">
          {featured.thumbnail_url && (
            <img
              src={featured.thumbnail_url.startsWith('http') ? featured.thumbnail_url : `/images/${featured.thumbnail_url}`}
              alt={featured.title}
              className="featured-thumbnail"
            />
          )}
          <h2>{featured.title}</h2>
          <p className="featured-snippet">{featured.content?.substring(0, 300)}...</p>
          <Link className="featured-link" href={`/blog/${featured.slug}`}>Read full article</Link>
        </div>
      </div>
      <div className="newspaper-grid">
        {rest.map(post => (
          <div className="newspaper-article-card" key={post.id}>
            {post.thumbnail_url && (
              <img
                src={post.thumbnail_url.startsWith('http') ? post.thumbnail_url : `/images/${post.thumbnail_url}`}
                alt={post.title}
                className="article-thumbnail"
              />
            )}
            <h3>{post.title}</h3>
            <p>{post.content?.substring(0, 120)}...</p>
            <Link className="article-link" href={`/blog/${post.slug}`}>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
}