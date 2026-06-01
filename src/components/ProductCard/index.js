import { useState } from 'react';
import './ProductCard.css';

function FavBtn({ active: initialActive }) {
  const [active, setActive] = useState(initialActive || false);
  return (
    <button className={`fav-btn${active ? ' active' : ''}`} aria-label="Favorito" onClick={e => { e.preventDefault(); setActive(v => !v); }}>
      <i className={active ? 'ph-fill ph-heart' : 'ph ph-heart'}></i>
    </button>
  );
}

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.img} alt={product.title} style={{width:'100%',height:'100%',objectFit:'contain'}} />
        <FavBtn active={product.favActive} />
      </div>
      <div className="product-body">
        <div className="product-info">
          <span className="badge-disc">{product.disc}</span>
          <p className="price-old">{product.oldPrice}</p>
          <div className="price-row"><p className="price-now">{product.price}</p></div>
          <p className="installments">{product.install}</p>
          <p className="shipping">{product.shipping || 'Envío Gratis'}</p>
          <p className="product-title">{product.title}</p>
        </div>
        <p className="product-seller">Vendido por <a href="#">{product.seller}</a></p>
        <p className="product-notax">Precio sin impuestos nacionales $94.700</p>
      </div>
    </article>
  );
}
