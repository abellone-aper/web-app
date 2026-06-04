import { useState } from 'react';
import './FavButton.css';

export default function FavButton({ active: initialActive = false, className = '', onToggle }) {
  const [active, setActive] = useState(initialActive);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const next = !active;
    setActive(next);
    onToggle?.(next);
  }

  return (
    <button
      className={`fav-btn${active ? ' active' : ''}${className ? ` ${className}` : ''}`}
      aria-label="Favorito"
      onClick={handleClick}
    >
      <i className={active ? 'ph-fill ph-heart' : 'ph ph-heart'}></i>
    </button>
  );
}
