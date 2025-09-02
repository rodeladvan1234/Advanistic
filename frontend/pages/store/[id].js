import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data.data))
      .catch(err => console.error(err));
  }, [id]);
  if (!product) return <div className="container" style={{ padding: '2rem 0' }}><p>Loading...</p></div>;
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Price:</strong> BDT {product.price}</p>
      <p><strong>Available Stock:</strong> {product.inventory}</p>
      {product.type === 'digital' && product.download_url && (
        <p><a href={product.download_url}>Download Link</a></p>
      )}
      <button onClick={() => alert('Checkout coming soon')}>Add to Cart</button>
    </div>
  );
}