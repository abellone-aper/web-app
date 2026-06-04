import FavButton from '../Buttons/FavButton';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.img} alt={product.title} style={{width:'100%',height:'100%',objectFit: product.imgFilled ? 'cover' : 'contain'}} />
        <FavButton active={product.favActive} />
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
