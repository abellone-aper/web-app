import './RecommendationsCarousel.css';
import { Link } from 'react-router-dom';
import { getPublicUrl } from '../../lib/storage';
import useCarouselNav from '../../hooks/useCarouselNav';
import { useBrand } from '../../brands/BrandContext';
import useReveal from '../../hooks/useReveal';

const RECOMMENDATIONS = [
  {
    label: 'Comprar de nuevo',
    img: getPublicUrl('Imagenes', 'cafe.png'),
    imgFill: true,
    title: 'Café Tradicional Melitta 250 g',
    price: '$13.573',
    shipping: 'Envío Gratis',
  },
  {
    label: 'Experiencias',
    img: getPublicUrl('Imagenes', 'spa.png'),
    imgFill: true,
    title: 'Spa Day Palacio Duhau - Park Hyatt Buenos Aires',
    oldPrice: '$2.895.226',
    price: '$2.895.226',
    badge: '10% OFF',
  },
  {
    label: 'Retomar tu carrito',
    to: '/mochila',
    img: getPublicUrl('Imagenes', 'mochila.png'),
    title: 'Mochila Tomtoc Navigator, Capacidad 40l, Con Correa, Verde',
    price: '$238.197',
    badge: 'Llega el lunes',
    shipping: 'Envío Gratis',
  },
  {
    label: 'Tu favorito',
    img: getPublicUrl('Imagenes', 'airpods.png'),
    title: 'Auriculares Apple AirPods 4ta Generación Con Anc Color Blanco',
    price: '$130.000',
    withPoints: true,
    badge: 'Utiliza tus puntos',
    shipping: 'Envío Gratis',
  },
  {
    label: 'Para tu auto',
    img: getPublicUrl('Imagenes', 'abastecimiento.png'),
    title: 'Abastecimiento de 1 tanque de combustible',
    price: 'Desde $90.000',
    badge: ['$30.000 cashback', 'con VISA'],
  },
];

export default function RecommendationsCarousel() {
  const brand = useBrand();
  const { trackRef, canLeft, canRight, edgeHover, scroll, handleCardHover, handleRowLeave } = useCarouselNav('.reco-card');
  const [revealRef, revealVisible] = useReveal();

  return (
    <section ref={revealRef} className={`section reco-section reveal${revealVisible ? ' is-visible' : ''}`}>
      <div className="carousel-track">
        <button className={`carousel-arrow${!canLeft ? ' carousel-arrow--hidden' : ''}${edgeHover === 'left' ? ' carousel-arrow--edge-hover' : ''}`} aria-label="Anterior" onClick={() => scroll(-1)}><i className="ph ph-caret-left"></i></button>
        <div className="reco-row" ref={trackRef} onMouseOver={handleCardHover} onMouseLeave={handleRowLeave}>
          {RECOMMENDATIONS.map((item, i) => {
            const CardTag = item.to ? Link : 'article';
            const cardProps = item.to ? { to: brand.path(item.to) } : {};
            return (
            <CardTag key={item.label} className="reco-card mount-in" style={{ '--index': i }} {...cardProps}>
              <p className="reco-card-label">{item.label}</p>
              <div className={`reco-card-image${item.imgFill ? ' reco-card-image--fill' : ''}`}>
                <img src={item.img} alt={item.title} />
              </div>
              <div className="reco-card-info">
                <p className="reco-card-title">{item.title}</p>
                <div className="reco-card-price-group">
                  {item.oldPrice && <p className="reco-card-price-old">{item.oldPrice}</p>}
                  <p className="reco-card-price">
                    {item.price}
                    {item.withPoints && <span className="reco-card-points"> con puntos</span>}
                  </p>
                </div>
                {item.badge && (
                  <div className="reco-card-badges">
                    {(Array.isArray(item.badge) ? item.badge : [item.badge]).map((b, i) => (
                      <span key={i} className="reco-card-badge">{b}</span>
                    ))}
                  </div>
                )}
                {item.shipping && <p className="reco-card-shipping">{item.shipping}</p>}
              </div>
            </CardTag>
            );
          })}
        </div>
        <button className={`carousel-arrow${!canRight ? ' carousel-arrow--hidden' : ''}${edgeHover === 'right' ? ' carousel-arrow--edge-hover' : ''}`} aria-label="Siguiente" onClick={() => scroll(1)}><i className="ph ph-caret-right"></i></button>
      </div>
    </section>
  );
}
