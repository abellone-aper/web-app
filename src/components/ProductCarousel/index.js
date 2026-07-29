import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import ProductCard from '../ProductCard';
import LinkButton from '../Buttons/LinkButton';

// Below this width the carousel switches to native touch scrolling
// (see the max-width: 1024px rules in HomePage.css) and cards are
// free to peek at the edge, same as any mobile carousel.
const DESKTOP_MIN_WIDTH = 1025;

export default function ProductCarousel({ title, subtitle, badge, products, showAllHref = '#' }) {
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [trackWidth, setTrackWidth] = useState(null);

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
  }, [trackWidth]);

  // Desktop carousels are windowed (overflow: hidden + arrows), so the
  // number of cards per view must land exactly on the available width —
  // a fixed card count/width can't guarantee that at every viewport, and
  // any leftover space shows up as a cropped card at the edge. Instead,
  // measure the real card width + gap and size the track to fit a whole
  // number of them, so it's always a clean cut, never a partial card.
  useLayoutEffect(() => {
    function recompute() {
      const viewport = viewportRef.current;
      if (!viewport) return;
      if (window.innerWidth < DESKTOP_MIN_WIDTH) {
        setTrackWidth(null);
        return;
      }
      const row = viewport.querySelector('.product-row');
      const card = row && row.querySelector('.product-card');
      if (!row || !card) return;
      const available = viewport.clientWidth;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      if (!available || !cardWidth) return;
      const count = Math.max(1, Math.floor((available + gap) / (cardWidth + gap)));
      setTrackWidth(count * cardWidth + (count - 1) * gap);
    }

    recompute();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(recompute);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [products]);

  function scroll(dir) {
    const track = trackRef.current;
    if (!track) return;
    const row = track.querySelector('.product-row');
    const card = row && row.querySelector('.product-card');
    if (!card) { track.scrollBy({ left: dir * 300, behavior: 'smooth' }); return; }
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const amount = (card.getBoundingClientRect().width + gap) * 2;
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
        <div className="carousel-viewport" ref={viewportRef}>
          {/* .carousel-track is sized to fit a whole number of cards (see
              the effect above) and is the positioning frame for the arrows,
              so they always hug the last visible card instead of the
              section's outer edge. */}
          <div className="carousel-track" style={trackWidth ? { width: trackWidth } : undefined}>
            <button className={`carousel-arrow${!canLeft ? ' carousel-arrow--hidden' : ''}`} aria-label="Anterior" onClick={() => scroll(-1)}><i className="ph ph-caret-left"></i></button>
            <div className="carousel-track-scroll" ref={trackRef}>
              <div className="product-row">
                {products.map((p, i) => <ProductCard key={p.id ?? p.title ?? i} product={p} />)}
              </div>
            </div>
            <button className={`carousel-arrow${!canRight ? ' carousel-arrow--hidden' : ''}`} aria-label="Siguiente" onClick={() => scroll(1)}><i className="ph ph-caret-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
}
