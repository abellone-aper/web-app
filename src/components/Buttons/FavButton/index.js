import { useState } from 'react';
import './FavButton.css';

function CardHeart({ active }) {
  return (
    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.6658 17.6884C10.6658 17.6884 0.520508 12.2256 0.520508 5.78727C0.520508 4.39018 1.0755 3.05031 2.06339 2.06242C3.05128 1.07452 4.39115 0.519531 5.78824 0.519531C7.99191 0.519531 9.87952 1.72038 10.6658 3.64115C11.452 1.72038 13.3396 0.519531 15.5433 0.519531C16.9404 0.519531 18.2803 1.07452 19.2682 2.06242C20.2561 3.05031 20.811 4.39018 20.811 5.78727C20.811 12.2256 10.6658 17.6884 10.6658 17.6884Z"
        fill={active ? 'var(--action-primary)' : 'black'}
        fillOpacity={active ? 1 : 0.25}
        stroke="white"
        strokeWidth="1.04054"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FavButton({ active: initialActive = false, className = '', variant = 'default', onToggle }) {
  const [active, setActive] = useState(initialActive);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const next = !active;
    setActive(next);
    onToggle?.(next);
  }

  const variantClass = variant === 'card' ? ' fav-btn--card' : '';

  return (
    <button
      className={`fav-btn${variantClass}${active ? ' active' : ''}${className ? ` ${className}` : ''}`}
      aria-label="Favorito"
      onClick={handleClick}
    >
      {variant === 'card'
        ? <CardHeart active={active} />
        : <i className={active ? 'ph-fill ph-heart' : 'ph ph-heart'}></i>
      }
    </button>
  );
}
