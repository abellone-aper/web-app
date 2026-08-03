import { useRef, useState, useLayoutEffect } from 'react';
import ProductCard from '../ProductCard';
import LinkButton from '../Buttons/LinkButton';
import useCarouselNav from '../../hooks/useCarouselNav';

// Below this width the carousel switches to native touch scrolling
// (see the max-width: 1024px rules in HomePage.css) and cards are
// free to peek at the edge, same as any mobile carousel.
const DESKTOP_MIN_WIDTH = 1025;

export default function ProductCarousel({ title, subtitle, badge, products, showAllHref = '#' }) {
  const { trackRef, canLeft, canRight, edgeHover, scroll, handleCardHover, handleRowLeave } = useCarouselNav('.product-card');
  const viewportRef = useRef(null);
  const [repeatList, setRepeatList] = useState(false);

  // .carousel-track fills the section's full width by itself (see its
  // CSS) — the last card lands wherever it lands, cropped by
  // .carousel-track-scroll's overflow:hidden, same as "Mostrar todo"
  // above it. We only need to know whether every product already fits
  // without cropping: if so there'd be nothing left to scroll to, so we
  // repeat the list instead of leaving the arrow permanently dead.
  useLayoutEffect(() => {
    function recompute() {
      const viewport = viewportRef.current;
      if (!viewport || window.innerWidth < DESKTOP_MIN_WIDTH) {
        setRepeatList(false);
        return;
      }
      const row = viewport.querySelector('.product-row');
      const card = row && row.querySelector('.product-card');
      if (!row || !card) return;
      const available = viewport.clientWidth;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      if (!available || !cardWidth) return;
      // Repeat unless there's at least one full extra card's worth of
      // content left to scroll to — anything less (e.g. the last card
      // barely cropped by a few px) makes the arrow feel dead rather
      // than like a real "next page", so we repeat instead of leaving it.
      const rowWidth = products.length * cardWidth + (products.length - 1) * gap;
      const overflow = rowWidth - available;
      setRepeatList(overflow < cardWidth && products.length > 1);
    }

    recompute();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(recompute);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [products]);

  const displayProducts = repeatList ? [...products, ...products] : products;

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
        <div className="carousel-viewport" ref={viewportRef}>
          <div className="carousel-track carousel-track--product">
            <button className={`carousel-arrow${!canLeft ? ' carousel-arrow--hidden' : ''}${edgeHover === 'left' ? ' carousel-arrow--edge-hover' : ''}`} aria-label="Anterior" onClick={() => scroll(-1)}><i className="ph ph-caret-left"></i></button>
            <div className="carousel-track-scroll" ref={trackRef} onMouseOver={handleCardHover} onMouseLeave={handleRowLeave}>
              <div className="product-row">
                {displayProducts.map((p, i) => <ProductCard key={i < products.length ? (p.id ?? p.title ?? i) : `repeat-${i}-${p.id ?? p.title ?? i}`} product={p} />)}
              </div>
            </div>
            <button className={`carousel-arrow${!canRight ? ' carousel-arrow--hidden' : ''}${edgeHover === 'right' ? ' carousel-arrow--edge-hover' : ''}`} aria-label="Siguiente" onClick={() => scroll(1)}><i className="ph ph-caret-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
}
