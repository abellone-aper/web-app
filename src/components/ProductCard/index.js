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
        <img src={product.img} alt={product.title} style={{width:'100%',height:'100%',objectFit: product.imgFilled ? 'cover' : 'contain'}} />
        <FavBtn active={product.favActive} />
      </div>
      <div className="product-body">
        <div className="product-info">
          <p className="product-title">{product.title}</p>
          <div className="price-and-discounts">
            <p className="price-old">{product.oldPrice}</p>
            <p className="price-now">{product.price}{product.withPoints && <span className="price-points-label"> con puntos</span>}</p>
          </div>
          {product.install && <p className="installments">{product.install}</p>}
          {product.shipping && <p className="shipping">{product.shipping}</p>}
          {product.badge && <span className="product-card-badge">{product.badge}</span>}
        </div>
      </div>
    </article>
  );
}
