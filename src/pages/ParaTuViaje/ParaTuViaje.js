import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ParaTuViaje.css';
import { getPublicUrl } from '../../lib/storage';
import { CURRENT_USER } from '../../lib/currentUser';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import ProductCarousel from '../../components/ProductCarousel';
import { useBrand } from '../../brands/BrandContext';

const FILTERS = ['todo','alojamiento','moda','transporte','actividades','seguros'];
const FILTER_LABELS = { todo:'Todo', alojamiento:'Alojamiento', moda:'Moda', transporte:'Transporte', actividades:'Experiencias', seguros:'Seguros' };
const FILTER_ICONS = { alojamiento:'ph-bed', moda:'ph-t-shirt', transporte:'ph-bus', actividades:'ph-mountains', seguros:'ph-shield-check' };

const POPULARES = [
  { img: getPublicUrl('Imagenes', 'Hospedaje/1.jpg'), title: 'Design Suites Bariloche', seller: 'Booking.com', rating: { score: '5.0', reviews: '47 reseñas' }, price: '$346.999', install: '2 noches, 1 adulto', badge: 'Excepcional', favActive: true, to: '/hospedaje', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Mochila/1.png'), title: 'Mochila Tomtoc, equipaje de mano', seller: 'Tomtoc Oficial', rating: { score: '4.8', reviews: '47 evaluaciones' }, price: '$74.500', install: '3 cuotas sin interés', badge: 'Envío gratis', to: '/mochila' },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Las Marias Del Nahuel.png'), title: 'Cabañas Las Marías Del Nahuel', seller: 'Booking.com', rating: { score: '8.7', reviews: '151 comentarios' }, price: '$783.201', install: '6 cuotas sin interés', badge: 'Fantástico', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Nido del Condor Hotel Spa.png'), title: 'Nido del Cóndor Hotel & Spa', seller: 'Booking.com', rating: { score: '8.5', reviews: '801 comentarios' }, price: '$2.587.467', install: '6 cuotas sin interés', badge: 'Muy bueno', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Postal del Nahuel.png'), title: 'Postal del Nahuel', seller: 'Booking.com', rating: { score: '9.6', reviews: '62 comentarios' }, price: '$1.179.999', install: '8 noches, 1 adulto', badge: 'Excepcional', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Hotel Sol Bariloche.png'), title: 'Hotel Sol Bariloche', seller: 'Booking.com', rating: { score: '9.1', reviews: '1.069 comentarios' }, price: '$2.959.819', install: '8 noches, 1 adulto', badge: 'Fantástico', imgFilled: true },
];

const PROMO_BANNERS = [
  { alt: 'Ofertas para tu próximo viaje: descuentos en hoteles, excursiones y más, pensados para vos' },
  { alt: 'Hasta 40% OFF en hoteles soñados, 12 cuotas sin interés' },
  { alt: 'Hasta 15% OFF en meriendas con estilo: casas de té y salones de meriendas' },
  { alt: '2x1 en aventuras: excursiones y experiencias' },
  { alt: '20% OFF en moda para viajar, 6 cuotas sin interés' },
];

const TRANSPORTE = [
  { icon: 'ph-car', badge: 'Alquiler de autos', title: 'Explorá Bariloche a tu ritmo', sub: 'Desde $104.999 / día' },
  { icon: 'ph-bus', badge: 'Traslados del aeropuerto', title: 'Llegá sin complicaciones', subPrefix: 'Aeropuerto → Hotel desde ', subPrice: '$20.999', subSuffix: ' / por pasajero' },
  { icon: 'ph-mountains', badge: 'Transfer', title: 'Subí al Cerro Catedral', subPrefix: 'Aeropuerto → Hotel desde ', subPrice: '$20.999', subSuffix: ' / por pasajero' },
];

const ACTIVIDADES = [
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Catamaran Isla Victoria y Bosque de Arrayanes.png'), title: 'Catamarán Isla Victoria y Bosque de Arrayanes', seller: 'Bariloche Turismo', rating: { score: '8.3', reviews: '225 comentarios' }, price: '$127.400', install: 'Duración: 7 h', badge: 'Cancelación gratis', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Cerro Tronador - Glaciar Ventisquero Negro.png'), title: 'Cerro Tronador - Glaciar Ventisquero Negro', seller: 'Bariloche Turismo', rating: { score: '8.8', reviews: '937 comentarios' }, price: '$71.500', install: 'Duración: 9 h', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Descubre la magia del Cerro Catedral.png'), title: 'Descubre la magia del Cerro Catedral', seller: 'Bariloche Turismo', rating: { score: '7.7', reviews: '90 comentarios' }, price: '$39.739', install: 'Duración: 4 h', badge: 'Muy bueno', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Dia de nieve en Cerro Perito Moreno.png'), title: 'Día de nieve en Cerro Perito Moreno', seller: 'Bariloche Turismo', rating: { score: '8.0', reviews: '18 comentarios' }, price: '$78.000', install: 'Duración: 9 h 30 min', badge: 'Incluye traslado', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Clases Colectivas Ski Snowboard.png'), title: 'Clases Colectivas Ski / Snowboard', seller: 'Bariloche Turismo', rating: { score: '9.1', reviews: '11 comentarios' }, price: '$91.000', install: 'Duración: 2 h', badge: 'Fabuloso', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Experiencia en TRE Degustacion Patagonica.png'), title: 'Experiencia en TRE Degustación Patagónica', seller: 'Bariloche Turismo', rating: { score: '8.5', reviews: '45 comentarios' }, price: '$102.700', install: 'Duración: 1 h 30 min', badge: 'Incluye comida', imgFilled: true },
];

const EQUIPAMIENTO_NIEVE = [
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Patagonia Chaqueta Unisex Antiviento Upf50.png'), title: 'Patagonia Chaqueta Unisex Antiviento Upf50+', seller: 'PATAGONIA', rating: { score: '4.9', reviews: '+50 vendidos' }, price: '$92.873', shipping: 'Envío gratis', badge: '25% OFF', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Mochila The North Face Borealis Commuter.png'), title: 'Mochila The North Face Borealis Commuter', seller: 'THE NORTH FACE', rating: { score: '4.7', reviews: '+200 vendidos' }, price: '$284.262', shipping: 'Envío gratis' },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Guante Primera Piel Antideslizante Naturehike.png'), title: 'Guante Primera Piel Antideslizante Naturehike', seller: 'NATUREHIKE', rating: { score: '4.8', reviews: '+100 vendidos' }, price: '$24.653', shipping: 'Envío gratis', badge: '25% OFF' },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Bolsa de Dormir Termica Waggs Camping.png'), title: 'Bolsa de Dormir Térmica Waggs Camping', seller: 'Interseller', rating: { score: '4.8', reviews: '+100 vendidos' }, price: '$29.990', shipping: 'Envío gratis', badge: '25% OFF', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Botas The North Face Hedgehog 3 Mid Wp.png'), title: 'Botas The North Face Hedgehog 3 Mid Wp', seller: 'THE NORTH FACE', rating: { score: '4.6', reviews: '+80 vendidos' }, price: '$340.000', shipping: '6 cuotas de $76.494', badge: 'Envío gratis', imgFilled: true },
  { img: getPublicUrl('Imagenes', 'Para-tu-viaje/Pantalon Vast Canyon Trekking Nieve Softshell.png'), title: 'Pantalon Vast Canyon Trekking Nieve Softshell', seller: 'My Tennis Gear', rating: { score: '4.5', reviews: '+60 vendidos' }, price: '$319.616', shipping: '6 cuotas de $53.269', badge: 'Envío gratis', imgFilled: true },
];

const GALICIA_PLANS = [
  { title: 'Assistance Viajero', subtitle: 'Cobertura USD 600.000', features: ['Asistencia 24/7', 'Práctica recreativa de deportes', 'Cobertura de equipaje'], price: '$422.711', installments: 'Mismo precio en 12 cuotas de $35.226' },
  { title: 'Assistance Universal', subtitle: 'Cobertura USD 100.000', features: ['Asistencia 24/7', 'Repatriación sanitaria', 'Práctica recreativa de deportes', 'Cobertura de equipaje, documentos, traslados y acompañamiento'], price: '$455.470', installments: 'Mismo precio en 12 cuotas de $38.123' },
  { title: 'Assistance Total', subtitle: 'Reintegro 100%', features: ['Asistencia 24/7', 'Repatriación sanitaria', 'Práctica recreativa de deportes', 'Cobertura de equipaje, documentos, traslados y acompañamiento', 'SIM con 35% off: incluido'], price: '$493.350', installments: 'Mismo precio en 12 cuotas de $41.113' },
];

export default function ParaTuViajePage({ onOpenAssistant }) {
  const brand = useBrand();
  const populares = POPULARES.map(c => c.to ? { ...c, to: brand.path(c.to) } : c);
  const [filter] = useState('todo');
  const [barHidden, setBarHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (y > lastY && y > 56) setBarHidden(true);
      else if (y < lastY) setBarHidden(false);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className={`ptv-mobile-bar${barHidden ? ' ptv-mobile-bar--hidden' : ''}`}>
        <Link to={brand.path('/')} className="ptv-back-btn" aria-label="Volver">
          <i className="ph ph-arrow-left"></i>
        </Link>
        <span className="ptv-bar-title">Para tu viaje</span>
        <div className="ptv-bar-actions"></div>
      </div>

      <div className="ptv-main">
        <Header variant="page" title="Para tu viaje" user={CURRENT_USER} onOpenAssistant={onOpenAssistant} />

        <Breadcrumb items={[
          { label: 'Inicio', to: brand.path('/') },
          { label: 'Para tu viaje' },
        ]} />

        <div className="ptv-page">
          <div className="ptv-page-top">
            <div className="ptv-page-top-left">
              <div className="ptv-page-header">
                <h1 className="ptv-page-title">Para tu viaje</h1>
                <p className="ptv-page-subtitle">Seleccionamos lo mejor para que disfrutes Bariloche al máximo</p>
              </div>

              <div className={`ptv-filters-wrap${barHidden ? ' ptv-filters-wrap--bar-hidden' : ''}`}>
                <div className="ptv-filters">
                  {FILTERS.map(f => (
                    <button key={f} className={`ptv-filter${filter === f ? ' active' : ''}`}>
                      {FILTER_ICONS[f] && <i className={`ph ${FILTER_ICONS[f]} ptv-filter-icon`}></i>}
                      {FILTER_LABELS[f]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="ptv-benefit-banner">
              <img className="ptv-benefit-img" src={getPublicUrl('Imagenes', 'banner-reintegro.png')} alt="" />
              <div className="ptv-benefit-text">
                <p className="ptv-benefit-title">Hasta 12 cuotas sin interés + 30% de reintegro</p>
                <p className="ptv-benefit-sub">Pagá con tu {brand.cardName} en todo lo que reserves para tu viaje.</p>
              </div>
              <button className="ptv-benefit-btn">Ver condiciones</button>
            </div>
          </div>

          <div className="ptv-package-card">
            <div className="ptv-package-left">
              <span className="ptv-package-badge">Ahorrá armando tu paquete</span>
              <div className="ptv-package-text">
                <h2 className="ptv-package-title">Alojamiento + traslado + experiencias en un solo pago</h2>
                <p className="ptv-package-sub">Ya tenés el vuelo. Sumá alojamiento, traslado y ahorrá hasta un 18% frente a comprarlos por separado.</p>
              </div>
              <div className="ptv-package-tags">
                <span className="ptv-package-tag"><i className="ph ph-bed"></i>Alojamiento</span>
                <span className="ptv-package-tag"><i className="ph ph-bus"></i>Transporte</span>
                <span className="ptv-package-tag"><i className="ph ph-mountains"></i>Experiencias</span>
              </div>
            </div>
            <div className="ptv-package-right">
              <div className="ptv-package-price-group">
                <span className="ptv-package-price-old">$182.998</span>
                <span className="ptv-package-price-new">$148.999</span>
                <span className="ptv-package-savings">Ahorrás $34.999 (18%)</span>
              </div>
              <button className="ptv-package-btn">Armar mi paquete</button>
            </div>
          </div>

          {filter === 'todo' && (
            <ProductCarousel title="Porque compraste tu avión a Bariloche" subtitle="Seleccionamos los mejores hoteles para tu estadía en Bariloche" products={populares} />
          )}

          {filter === 'todo' && (
            <ProductCarousel title="Actividades para tu estadía" subtitle="Excursiones y experiencias imperdibles en Bariloche." products={ACTIVIDADES} />
          )}

          <div className="ptv-promos">
            <div className="ptv-promos-track">
              {PROMO_BANNERS.map((banner, i) => (
                <div key={i} className="ptv-promo-banner">
                  <img
                    className="ptv-promo-banner-img"
                    src={getPublicUrl('Imagenes', `Para-tu-viaje/Banners/${brand.faviconDir}/${i + 1}.png`)}
                    alt={banner.alt}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="ptv-section ptv-transport">
            <div className="ptv-section-header">
              <h2 className="ptv-section-title">Moverte por Bariloche</h2>
            </div>
            <div className="ptv-transport-track">
              {TRANSPORTE.map((item, i) => (
                <div key={i} className="ptv-transport-card">
                  <div className="ptv-transport-icon"><i className={`ph ${item.icon}`}></i></div>
                  <div className="ptv-transport-body">
                    <span className="ptv-transport-badge">{item.badge}</span>
                    <div className="ptv-transport-text">
                      <p className="ptv-transport-title">{item.title}</p>
                      <p className="ptv-transport-sub">
                        {item.sub ? item.sub : (<>{item.subPrefix}<strong>{item.subPrice}</strong>{item.subSuffix}</>)}
                      </p>
                    </div>
                    <button className="ptv-transport-link">Ver opciones</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filter === 'todo' && (
            <ProductCarousel title="Equipate para la nieve" subtitle="Ropa y equipamiento para el frío de la Patagonia." products={EQUIPAMIENTO_NIEVE} />
          )}

          <div className="ptv-section ptv-galicia">
            <div className="ptv-galicia-header">
              <h2 className="ptv-galicia-title">Sugeridos premium {brand.bankName}</h2>
              <p className="ptv-galicia-subtitle">Seleccionamos lo mejor para que disfrutes Bariloche al máximo</p>
            </div>
            <div className="ptv-galicia-track">
              <div className="ptv-galicia-promo">
                <p className="ptv-galicia-promo-title">Viajá con todo cubierto</p>
                <img className="ptv-galicia-promo-img" src={getPublicUrl('Imagenes', 'Para-tu-viaje/Premium.png')} alt="" />
              </div>
              {GALICIA_PLANS.map((plan, i) => (
                <div key={i} className="ptv-galicia-plan">
                  <div className="ptv-galicia-plan-top">
                    <div className="ptv-galicia-plan-head">
                      <p className="ptv-galicia-plan-title">{plan.title}</p>
                      <p className="ptv-galicia-plan-sub">{plan.subtitle}</p>
                    </div>
                    <ul className="ptv-galicia-plan-features">
                      {plan.features.map((f, j) => (
                        <li key={j}><i className="ph-fill ph-check-circle"></i><span>{f}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="ptv-galicia-plan-bottom">
                    <p className="ptv-galicia-plan-price">{plan.price}<span> / persona</span></p>
                    <p className="ptv-galicia-plan-installments">{plan.installments}</p>
                    <button className="ptv-galicia-plan-cta">Ver detalles</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
