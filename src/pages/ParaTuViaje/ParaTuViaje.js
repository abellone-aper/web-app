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
  { img: 'https://www.figma.com/api/mcp/asset/332c246e-7281-4b9e-b596-f6a1cbd74d57', title: 'Cabañas Las Marías Del Nahuel', seller: 'Booking.com', rating: { score: '8.7', reviews: '151 comentarios' }, price: '$783.201', install: '6 cuotas sin interés', badge: 'Fantástico', imgFilled: true },
  { img: 'https://www.figma.com/api/mcp/asset/1d786401-86d2-4a18-a288-1f3c4af1b85b', title: 'Nido del Cóndor Hotel & Spa', seller: 'Booking.com', rating: { score: '8.5', reviews: '801 comentarios' }, price: '$2.587.467', install: '6 cuotas sin interés', badge: 'Muy bueno', imgFilled: true },
  { img: 'https://www.figma.com/api/mcp/asset/262e4563-9249-45b5-b6a9-d1b3983b54ff', title: 'Postal del Nahuel', seller: 'Booking.com', rating: { score: '9.6', reviews: '62 comentarios' }, price: '$1.179.999', install: '8 noches, 1 adulto', badge: 'Excepcional', imgFilled: true },
  { img: 'https://www.figma.com/api/mcp/asset/ee29d1cb-56c2-4c1d-8793-14a78420db50', title: 'Design Suites Bariloche', seller: 'Booking.com', rating: { score: '9.1', reviews: '1.069 comentarios' }, price: '$2.959.819', install: '8 noches, 1 adulto', badge: 'Fantástico', imgFilled: true },
];

const ACTIVIDADES = [
  { img: 'https://www.figma.com/api/mcp/asset/a32c87c3-3553-4aa3-967d-24afd72640dc', title: 'Catamarán Isla Victoria y Bosque de Arrayanes', seller: 'Bariloche Turismo', rating: { score: '8.3', reviews: '225 comentarios' }, price: '$127.400', install: 'Duración: 7 h', badge: 'Cancelación gratis', imgFilled: true },
  { img: 'https://www.figma.com/api/mcp/asset/e25f7e76-7240-43ff-9ef2-8127f528db78', title: 'Cerro Tronador - Glaciar Ventisquero Negro', seller: 'Bariloche Turismo', rating: { score: '8.8', reviews: '937 comentarios' }, price: '$71.500', install: 'Duración: 9 h', imgFilled: true },
  { img: 'https://www.figma.com/api/mcp/asset/0e704a9a-0f46-4478-bcc0-5d4d0b260b1b', title: 'Descubre la magia del Cerro Catedral', seller: 'Bariloche Turismo', rating: { score: '7.7', reviews: '90 comentarios' }, price: '$39.739', install: 'Duración: 4 h', badge: 'Muy bueno', imgFilled: true },
  { img: 'https://www.figma.com/api/mcp/asset/ae24bc67-5537-4d43-8f88-8496583406bc', title: 'Día de nieve en Cerro Perito Moreno', seller: 'Bariloche Turismo', rating: { score: '8.0', reviews: '18 comentarios' }, price: '$78.000', install: 'Duración: 9 h 30 min', badge: 'Incluye traslado', imgFilled: true },
  { img: 'https://www.figma.com/api/mcp/asset/e5127afe-28ea-482c-a38d-a6996cbab676', title: 'Clases Colectivas Ski / Snowboard', seller: 'Bariloche Turismo', rating: { score: '9.1', reviews: '11 comentarios' }, price: '$91.000', install: 'Duración: 2 h', badge: 'Fabuloso', imgFilled: true },
  { img: 'https://www.figma.com/api/mcp/asset/f80b2ecd-46f1-481d-a749-1ea813eee778', title: 'Experiencia en TRE Degustación Patagónica', seller: 'Bariloche Turismo', rating: { score: '8.5', reviews: '45 comentarios' }, price: '$102.700', install: 'Duración: 1 h 30 min', badge: 'Incluye comida', imgFilled: true },
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
        </div>
      </div>

    </>
  );
}
