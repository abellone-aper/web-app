import { Link } from 'react-router-dom';
import FavButton from '../Buttons/FavButton';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const content = (
    <>
      <div className="product-image">
        <img src={product.img} alt={product.title} style={{width:'100%',height:'100%',objectFit: product.imgFilled ? 'cover' : 'contain'}} />
        <FavButton active={product.favActive} />
      </div>
      <div className="product-body">
        <div className="product-info">
          <div className="product-info-text">
            <p className="product-title">{product.title}</p>
            {product.seller && (
              <div className="product-seller">
                <span className="product-seller-name">{product.seller}</span>
                <i className="ph-fill ph-seal-check product-seller-verified"></i>
              </div>
            )}
            {product.rating && (
              <div className="product-rating">
                <i className="ph-fill ph-star product-rating-star"></i>
                <span className="product-rating-score">{product.rating.score}</span>
                <span className="product-rating-sep">|</span>
                <span className="product-rating-reviews">{product.rating.reviews}</span>
              </div>
            )}
          </div>
          <div className="price-and-discounts">
            <p className="price-old">{product.oldPrice}</p>
            <p className="price-now">{product.price}{product.withPoints && <span className="price-points-label"> con puntos</span>}</p>
          </div>
          {product.install && <p className="installments">{product.install}</p>}
          {product.shipping && <p className="shipping">{product.shipping}</p>}
          {product.badge && <span className="product-card-badge">{product.badge}</span>}
        </div>
      </div>
    </>
  );

  if (product.to) {
    return <Link to={product.to} className="product-card product-card--link">{content}</Link>;
  }
  return <article className="product-card">{content}</article>;
}
