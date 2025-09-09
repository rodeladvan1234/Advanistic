import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (!slug) return;
    axios.get(`http://localhost:5000/api/posts/${slug}`)
      .then(res => setPost(res.data.data))
      .catch(err => console.error(err));
  }, [slug]);
  if (!post) return <div className="container" style={{ padding: '2rem 0' }}><p>Loading...</p></div>;
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>{post.title}</h2>
      {post.thumbnail_url && (
        <img
          src={post.thumbnail_url.startsWith('http') ? post.thumbnail_url : `/images/${post.thumbnail_url}`}
          alt={post.title}
          className="detail-thumbnail"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}