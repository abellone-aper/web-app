import { useEffect, useRef } from 'react';
import './BannerCarousel.css';
import { getPublicUrl } from '../../lib/storage';
import { useBrand } from '../../brands/BrandContext';

const UNIQUE = [1, 2, 3, 4, 5];
const N = UNIQUE.length;

export default function BannerCarousel() {
  const brand = useBrand();
  const trackRef = useRef(null);
  const metricsRef = useRef({ itemWidth: 0, blockWidth: 0, step: 0 });

  const banners = [...UNIQUE, ...UNIQUE, ...UNIQUE].map(n => getPublicUrl('Imagenes', `Carrusel-${brand.faviconDir}/${n}.png`));

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const items = t.querySelectorAll('.banner-carousel-item');
    const itemWidth = items[0].offsetWidth;
    const step = items[1].offsetLeft - items[0].offsetLeft;
    const blockWidth = items[N].offsetLeft;
    metricsRef.current = { itemWidth, blockWidth, step };

    // Arranca en medio del bloque central, con la primera imagen visible cortada a la mitad.
    t.scrollLeft = blockWidth - itemWidth / 2;

    let settleTimer;
    function normalize() {
      const { blockWidth } = metricsRef.current;
      if (t.scrollLeft < blockWidth * 0.5) {
        t.scrollLeft += blockWidth;
      } else if (t.scrollLeft > blockWidth * 1.5) {
        t.scrollLeft -= blockWidth;
      }
    }
    function onScroll() {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(normalize, 120);
    }
    t.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(settleTimer);
      t.removeEventListener('scroll', onScroll);
    };
  }, []);

  function scroll(dir) {
    const t = trackRef.current;
    if (!t) return;
    const { step } = metricsRef.current;
    t.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  }

  return (
    <section className="banner-carousel">
      <div className="banner-carousel-scroll" ref={trackRef}>
        {banners.map((src, i) => (
          <div className="banner-carousel-item" key={i}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
      <button className="banner-carousel-arrow banner-carousel-arrow--left" aria-label="Anterior" onClick={() => scroll(-1)}>
        <i className="ph ph-caret-left"></i>
      </button>
      <button className="banner-carousel-arrow banner-carousel-arrow--right" aria-label="Siguiente" onClick={() => scroll(1)}>
        <i className="ph ph-caret-right"></i>
      </button>
    </section>
  );
}
