import './RecommendationsCarousel.css';
import { getPublicUrl } from '../../lib/storage';

const RECOMMENDATIONS = [
  {
    label: 'Comprar de nuevo',
    img: getPublicUrl('Imagenes', 'cafe.png'),
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
    badge: '$30.000 cashback con VISA',
  },
];

export default function RecommendationsCarousel() {
  return (
    <section className="section reco-section">
      <div className="reco-row">
        {RECOMMENDATIONS.map(item => (
          <article key={item.label} className="reco-card">
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
              {item.badge && <span className="reco-card-badge">{item.badge}</span>}
              {item.shipping && <p className="reco-card-shipping">{item.shipping}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
