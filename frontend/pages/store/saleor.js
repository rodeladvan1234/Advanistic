"use client";
import { gql, useQuery } from '@apollo/client';
import client from '../../lib/apolloClient';

const PRODUCTS_QUERY = gql`
  query Products($first: Int) {
    products(first: $first) {
      edges {
        node {
          id
          name
          slug
          thumbnail {
            url
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function SaleorStore() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, { client, variables: { first: 20 } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error querying Saleor</p>;
  const items = data.products.edges.map(e => e.node);
  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto' }}>
      <h2>Saleor Store</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {items.map(p => (
          <div key={p.id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: 6 }}>
            {p.thumbnail?.url && <img src={p.thumbnail.url} alt={p.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />}
            <h3>{p.name}</h3>
            <p>{p.pricing?.priceRange?.start?.gross?.amount} {p.pricing?.priceRange?.start?.gross?.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
