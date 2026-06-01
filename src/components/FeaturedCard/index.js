import './FeaturedCard.css';

export default function FeaturedCard({ card }) {
  const { label, img, title, price, priceNote, oldPrice, badge, shipping, href, imgFit } = card;

  return (
    <a href={href || '#'} className="featured-card">
      <p className="featured-card-label">{label}</p>
      <div className={`featured-card-image${imgFit === 'cover' ? ' featured-card-image--cover' : ''}`}>
        <img src={img} alt={title} />
      </div>
      <div className="featured-card-body">
        <p className="featured-card-title">{title}</p>
        {oldPrice && <p className="featured-card-old-price">{oldPrice}</p>}
        <p className="featured-card-price">
          {price}
          {priceNote && <span className="featured-card-price-note"> {priceNote}</span>}
        </p>
        {badge && <span className="featured-card-badge">{badge}</span>}
        {shipping && <p className="featured-card-shipping">{shipping}</p>}
      </div>
    </a>
  );
}
