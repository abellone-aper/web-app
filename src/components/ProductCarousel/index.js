import { useRef, useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import LinkButton from '../Buttons/LinkButton';

export default function ProductCarousel({ title, subtitle, badge, products, showAllHref = '#' }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  function checkScroll() {
    const t = trackRef.current;
    if (!t) return;
    setCanLeft(t.scrollLeft > 0);
    setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 1);
  }

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    checkScroll();
    t.addEventListener('scroll', checkScroll, { passive: true });
    return () => t.removeEventListener('scroll', checkScroll);
  }, []);

  function scroll(dir) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.product-card');
    const amount = card ? (card.offsetWidth + 24) * 2 : 300;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  return (
    <section className="section">
      <div className="section-header">
        <div className="section-header-text">
          <div className="section-title-group">
            <h2 className="section-title">{title}</h2>
            {badge && <span className="section-title-badge">{badge}</span>}
          </div>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <LinkButton as="a" href={showAllHref}>Mostrar todo</LinkButton>
      </div>
      <div className="carousel-wrap">
        <button className={`carousel-arrow${!canLeft ? ' carousel-arrow--hidden' : ''}`} aria-label="Anterior" onClick={() => scroll(-1)}><i className="ph ph-caret-left"></i></button>
        <div className="carousel-track" ref={trackRef}>
          <div className="product-row">
            {products.map((p, i) => <ProductCard key={p.id ?? p.title ?? i} product={p} />)}
          </div>
        </div>
        <button className={`carousel-arrow${!canRight ? ' carousel-arrow--hidden' : ''}`} aria-label="Siguiente" onClick={() => scroll(1)}><i className="ph ph-caret-right"></i></button>
      </div>
    </section>
  );
}
