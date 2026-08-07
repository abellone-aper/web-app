import { useState } from 'react';
import './FavButton.css';

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
      <i className={active ? 'ph-fill ph-heart' : 'ph ph-heart'}></i>
    </button>
  );
}
