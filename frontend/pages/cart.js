import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const total = items.reduce((s, i) => s + (i.price || 0) * i.quantity, 0);
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>Your cart</h2>
      {items.length === 0 && <p>Cart is empty</p>}
      {items.map(it => (
        <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 0' }}>
          <div>
            <strong>{it.name}</strong>
            <div>Qty: {it.quantity}</div>
          </div>
          <div>
            <div>{it.price} BDT</div>
            <button onClick={() => remove(it.id)}>Remove</button>
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <div>
          <h3>Total: {total} BDT</h3>
          <button onClick={clear}>Clear cart</button>
        </div>
      )}
    </div>
  );
}
