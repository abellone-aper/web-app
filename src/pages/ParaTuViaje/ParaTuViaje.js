import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ParaTuViaje.css';
import { getPublicUrl } from '../../lib/storage';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import TripCard from '../../components/TripCard';
import ContextBanner from '../../components/ContextBanner';
import InsuranceCard from '../../components/InsuranceCard';

const FILTERS = ['todo','alojamiento','moda','actividades','seguros'];
const FILTER_LABELS = { todo:'Todo', alojamiento:'Alojamiento', moda:'Moda', actividades:'Actividades', seguros:'Seguros' };

const ALOJAMIENTOS = [
  { img: 'https://www.designsuites.com/images/bariloche/foto_33.jpg', cat:'Hospedaje', name:'Design Suites Bariloche', price:'Desde $49.999 por 2 noches', rating:'5.0', favActive:true, badge:null, to:'/hospedaje' },
  { img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/809139678.jpg?k=9add8787963a1ef0f56b77484ab35cd8c598aa580f8d668a0a49b6246859bc65&o=', cat:'Hospedaje', name:'Radisson Blu Bariloche', price:'Desde $62.000 por 2 noches', rating:'4.8' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Llao_llao.jpg', cat:'Hospedaje', name:'Llao Llao Hotel & Resort', price:'Desde $195.000 por 2 noches', rating:'4.9', badge:'Premium' },
  { img: 'https://nh-bariloche-edelweiss.hotelesenpatagonia.com/data/Images/OriginalPhoto/16561/1656178/1656178889/image-san-carlos-de-bariloche-nh-bariloche-edelweiss-53.JPEG', cat:'Hospedaje', name:'Hotel Edelweiss Bariloche', price:'Desde $38.500 por 2 noches', rating:'4.6' },
  { img: 'https://images.pexels.com/photos/7060819/pexels-photo-7060819.jpeg?auto=compress&cs=tinysrgb&w=800', cat:'Hospedaje', name:'Patagonia Plaza Apart Hotel', price:'Desde $29.800 por 2 noches', rating:'4.5', badge:'Relación precio-calidad' },
  { img: 'https://www.designsuites.com/images/bariloche/foto_4.jpg', cat:'Hospedaje', name:'Alto Bariloche Hostería', price:'Desde $22.000 por 2 noches', rating:'4.4' },
];

const SEGUROS = [
  { img: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg', cat:'Seguro de viaje', name:'Assist Card Viajero', price:'Desde $4.900 por persona', rating:'4.7' },
  { img: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg', cat:'Seguro de viaje', name:'Assist Card Total Plus', price:'Desde $9.200 por persona', rating:'4.8', badge:'Más elegido' },
  { img: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg', cat:'Seguro de viaje', name:'Galicia Viajero', price:'Desde $6.800 por persona', rating:'4.9', badge:'Exclusivo Galicia' },
  { img: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg', cat:'Seguro de viaje', name:'Allianz Travel Care', price:'Desde $14.500 por persona', rating:'4.6' },
  { img: 'https://images.pexels.com/photos/8730281/pexels-photo-8730281.jpeg?auto=compress&cs=tinysrgb&w=800', cat:'Seguro de viaje', name:'Mapfre Travel Asistencia', price:'Desde $5.800 por persona', rating:'4.5' },
  { img: 'https://images.pexels.com/photos/7009489/pexels-photo-7009489.jpeg?auto=compress&cs=tinysrgb&w=800', cat:'Seguro de viaje', name:'Wenance Travel Integral', price:'Desde $7.200 por persona', rating:'4.4', badge:'Nuevo' },
];

const MODA = [
  { img: 'https://www.switchbacktravel.com/sites/default/files/image_fields/In-Depth%20Gear%20Reviews/Patagonia%20Tres%203-in-1%20Parka/Patagonia%20Tres%203-in-1%20Parka%20%28adjusting%20hood%29.jpg', cat:'Indumentaria', name:'Campera Patagonia Tres-in-One', price:'$239.000 en 6 cuotas sin interés', rating:'4.9', favActive:true },
  { img: 'https://http2.mlstatic.com/D_NQ_NP_708648-MLA109086872908_042026-O.webp', cat:'Calzado', name:'Botas Columbia Waterproof', price:'$89.900 en 3 cuotas', rating:'4.7' },
  { img: 'https://www.deuter.com/media/f8/2d/fa/1770654012/hiking-futurapro-sideshot-19-lukaskusstatscher.webp', cat:'Accesorios', name:'Mochila Deuter Futura 60L', price:'$74.500 en 3 cuotas', rating:'4.8' },
  { img: 'https://www.underarmour.com.ar/on/demandware.static/-/Sites-underarmour_staging/default/dwe44c34b4/new_images/1365459/1365459-1.jpeg', cat:'Indumentaria', name:'Set Térmico Under Armour', price:'$45.800', rating:'4.5' },
  { img: 'https://images.pexels.com/photos/6263508/pexels-photo-6263508.jpeg?auto=compress&cs=tinysrgb&w=800', cat:'Accesorios', name:'Guantes Columbia Omni-Heat', price:'$28.500 en 3 cuotas', rating:'4.7' },
  { img: 'https://images.pexels.com/photos/20372474/pexels-photo-20372474.jpeg?auto=compress&cs=tinysrgb&w=800', cat:'Accesorios', name:'Gorro y Braga Patagonia', price:'$19.900', rating:'4.6' },
];

const ACTIVIDADES = [
  { img: 'https://islavictoriayarrayanes.com/wp-content/uploads/2024/04/5.jpg', cat:'Actividad', name:'Catamarán Isla Victoria y Bosque de Arrayanes', price:'Desde $18.500 por persona', rating:'4.9' },
  { img: 'https://barilochetrekking.com/wp-content/uploads/2019/08/63-Refugio-Frey.jpg', cat:'Actividad', name:'Trekking Cerro Catedral guiado', price:'Desde $12.000 por persona', rating:'4.8' },
  { img: 'https://buck.getjasper.digital/2025/04/Cabalgatas-lopez-9-1.jpg', cat:'Actividad', name:'Cabalgata Circuito Chico', price:'Desde $15.500 por persona', rating:'4.7' },
  { img: 'https://denomades.imgix.net/destinos/bariloche/1030/rafting-rio-manso.jpg', cat:'Actividad', name:'Rafting Río Manso Medio', price:'Desde $22.000 por persona', rating:'4.9' },
  { img: 'https://images.pexels.com/photos/12178581/pexels-photo-12178581.jpeg?auto=compress&cs=tinysrgb&w=800', cat:'Actividad', name:'Ski en Cerro Catedral – día completo', price:'Desde $35.000 por persona', rating:'4.8', badge:'Temporada' },
  { img: 'https://images.pexels.com/photos/1267361/pexels-photo-1267361.jpeg?auto=compress&cs=tinysrgb&w=800', cat:'Actividad', name:'Tour chocolaterías y cervecerías artesanales', price:'Desde $8.500 por persona', rating:'4.7' },
];

function PtvSection({ title, items, category, visible }) {
  if (!visible) return null;
  return (
    <section className="ptv-section" data-category={category}>
      <div className="ptv-section-header">
        <h2 className="ptv-section-title">{title}</h2>
      </div>
      <div className="ptv-cards-track">
        {items.map(card => <TripCard key={card.name} card={card} variant="page" />)}
      </div>
    </section>
  );
}

export default function ParaTuViajePage() {
  const [filter, setFilter] = useState('todo');
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

  const show = (cat) => filter === 'todo' || filter === cat;

  return (
    <>
      <div className={`ptv-mobile-bar${barHidden ? ' ptv-mobile-bar--hidden' : ''}`}>
        <Link to="/" className="ptv-back-btn" aria-label="Volver">
          <i className="ph ph-arrow-left"></i>
        </Link>
        <span className="ptv-bar-title">Para tu viaje</span>
        <div className="ptv-bar-actions"></div>
      </div>

      <div className="ptv-main">
        <Header variant="page" title="Para tu viaje" />

        <Breadcrumb items={[
          { label: 'Inicio', to: '/' },
          { label: 'Para tu viaje' },
        ]} />

        <div className="ptv-page">
          <div className="ptv-page-top">
            <div className="ptv-page-header">
              <h1 className="ptv-page-title">Para tu viaje</h1>
              <p className="ptv-page-subtitle">Seleccionamos lo mejor para que disfrutes Bariloche al máximo</p>
            </div>
            <ContextBanner
              icon="/icons/vehículo.svg"
              sub="El viaje se acerca"
              title="Reservá un transfer o alquilá un auto y evitá sorpresas al llegar."
              linkText="Ver opciones de transporte"
            />
          </div>

          <div className={`ptv-filters-wrap${barHidden ? ' ptv-filters-wrap--bar-hidden' : ''}`}>
            <div className="ptv-filters">
              {FILTERS.map(f => (
                <button key={f} className={`ptv-filter${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                  {FILTER_LABELS[f]}
                </button>
              ))}
            </div>
          </div>

          <PtvSection title="Alojamiento en Bariloche" items={ALOJAMIENTOS} category="alojamiento" visible={show('alojamiento')} />

          {filter === 'todo' && (
            <InsuranceCard
              imgSrc={getPublicUrl('Imagenes', 'cobertura.png')}
              features={[
                'Asistencia médica internacional',
                'Cancelación de vuelos y paquetes',
                'Cobertura por pérdida de equipaje',
              ]}
            />
          )}

          <PtvSection title="Seguros de viaje" items={SEGUROS} category="seguros" visible={show('seguros')} />
          <PtvSection title="Moda para el frío" items={MODA} category="moda" visible={show('moda')} />
          <PtvSection title="Actividades en Bariloche" items={ACTIVIDADES} category="actividades" visible={show('actividades')} />
        </div>
      </div>

    </>
  );
}
