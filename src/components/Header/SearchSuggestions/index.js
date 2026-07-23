import './SearchSuggestions.css';
import { useEffect, useRef, useState } from 'react';
import { CHIPS, TECH_PRODUCTS, ELECTRO_PRODUCTS } from '../../../data/homeProducts';

const SUGGESTED_CHIPS = CHIPS.map(c => c.label);
const CONTINUE_SHOPPING = [...TECH_PRODUCTS, ...ELECTRO_PRODUCTS].slice(0, 5);

const CARD_WIDTH = 123;
const CARD_GAP = 16;

export default function SearchSuggestions({ onChipClick }) {
  const wrapRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(CONTINUE_SHOPPING.length);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    function updateVisibleCount() {
      const width = el.clientWidth;
      const count = Math.floor((width + CARD_GAP) / (CARD_WIDTH + CARD_GAP));
      setVisibleCount(Math.max(1, Math.min(count, CONTINUE_SHOPPING.length)));
    }
    updateVisibleCount();
    const observer = new ResizeObserver(updateVisibleCount);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="search-suggestions" onMouseDown={e => e.preventDefault()}>
      <div className="search-suggestions__chips">
        {SUGGESTED_CHIPS.map(label => (
          <button
            key={label}
            type="button"
            className="search-suggestions__chip"
            onClick={() => onChipClick?.(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="search-suggestions__section">
        <p className="search-suggestions__section-title">Continuar comprando</p>
        <div className="search-suggestions__cards-wrap" ref={wrapRef}>
          <div className="search-suggestions__cards">
            {CONTINUE_SHOPPING.slice(0, visibleCount).map(p => (
              <a href="#" key={p.id} className="search-suggestions__card">
                <div className="search-suggestions__card-image">
                  <img src={p.img} alt={p.title} style={{ objectFit: p.imgFilled ? 'cover' : 'contain' }} />
                </div>
                <p className="search-suggestions__card-title">{p.title}</p>
                <p className="search-suggestions__card-price">{p.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
