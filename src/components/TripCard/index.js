import { useState } from 'react';
import { Link } from 'react-router-dom';
import './TripCard.css';

const CLASSES = {
  mobile: {
    root: 'nmh-trip-card',
    img: 'nmh-trip-card-img',
    badge: 'nmh-trip-card-badge',
    fav: 'nmh-fav-btn',
    body: 'nmh-trip-card-body',
    cat: 'nmh-card-category',
    name: 'nmh-card-name',
    price: 'nmh-card-price',
  },
  desktop: {
    root: 'dh-trip-card',
    img: 'dh-trip-card-img',
    badge: 'dh-trip-badge',
    fav: 'dh-fav-btn',
    body: 'dh-trip-card-body',
    cat: 'dh-card-cat',
    name: 'dh-card-name',
    price: 'dh-card-price',
  },
  page: {
    root: 'ptv-card',
    rootLink: 'ptv-card ptv-card--link',
    img: 'ptv-card-img',
    badge: 'ptv-card-badge',
    fav: 'ptv-fav-btn',
    body: 'ptv-card-body',
    cat: 'ptv-card-cat',
    name: 'ptv-card-name',
    price: 'ptv-card-price',
    rating: 'ptv-card-rating',
  },
};

export default function TripCard({ card, variant = 'mobile' }) {
  const [fav, setFav] = useState(card.favActive || false);
  const cls = CLASSES[variant];

  const inner = (
    <>
      <div className={cls.img}>
        <img src={card.img} alt={card.name} />
        {card.badge && <span className={cls.badge}>{card.badge}</span>}
        <button
          className={`${cls.fav}${fav ? ' active' : ''}`}
          aria-label="Favorito"
          onClick={e => { e.preventDefault(); e.stopPropagation(); setFav(v => !v); }}
        >
          <i className={fav ? 'ph-fill ph-heart' : 'ph ph-heart'}></i>
        </button>
      </div>
      <div className={cls.body}>
        <span className={cls.cat}>{card.cat}</span>
        <span className={cls.name}>{card.name}</span>
        <span className={cls.price}>{card.price}</span>
        {card.rating && cls.rating && (
          <div className={cls.rating}>
            <i className="ph-fill ph-star"></i>
            <span>{card.rating}</span>
          </div>
        )}
      </div>
    </>
  );

  if (card.to) {
    const rootClass = cls.rootLink ?? cls.root;
    return <Link to={card.to} className={rootClass}>{inner}</Link>;
  }
  return <div className={cls.root}>{inner}</div>;
}
