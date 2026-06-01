import './HomePage.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getPublicUrl } from '../../lib/storage';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import TripCard from '../../components/TripCard';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import LinkButton from '../../components/Buttons/LinkButton';
import StatusCard from '../../components/StatusCard';

const CTX_CAR_ICON = 'https://www.figma.com/api/mcp/asset/48f9c26d-2697-49e6-b003-4d63f509e2ad';

const CURRENT_USER = { name: 'Sol García', initial: 'S', role: 'Cuenta Galicia', avatar: 'https://images.pexels.com/photos/7679591/pexels-photo-7679591.jpeg' };

const COUPONS = [
  { icon: '/icons/descuento tecnologia.svg', title: '15% Off en Tecnología', subtitle: 'Válido en toda sección', expires: 'Vence en 3 días' },
  { icon: '/icons/cupones.svg', title: '$5.000 en tu próxima compra', subtitle: 'Válido en todas las secciones', expires: 'Vence en 3 días' },
];

const CHIPS = [
  { icon: 'https://www.figma.com/api/mcp/asset/eb96a2ee-7550-4f9c-bd25-74800e1eba00', label: 'Compras recurrentes' },
  { icon: 'https://www.figma.com/api/mcp/asset/f5afc4aa-2eed-4529-bcab-7f0648eb4d48', label: 'Ahorrar en el super' },
  { icon: 'https://www.figma.com/api/mcp/asset/5206bc37-1a67-413b-88e7-ab0792213d99', label: 'Hasta 54.000 puntos' },
  { icon: 'https://www.figma.com/api/mcp/asset/06e44271-3415-4b8a-96b9-e6e3cb9c1415', label: 'Computadoras' },
  { icon: 'https://www.figma.com/api/mcp/asset/710a73b0-af30-478e-92fa-f0fc36efd5b3', label: 'Audio' },
  { icon: 'https://www.figma.com/api/mcp/asset/32135fec-822a-4fe5-996a-e8d42073fbdf', label: 'Renovar mi Smartphone' },
  { icon: 'https://www.figma.com/api/mcp/asset/5d63f7e5-420b-4608-b9a5-dd714c2dd319', label: 'Deporte' },
  { icon: 'https://www.figma.com/api/mcp/asset/b6b8b462-ea24-415a-a053-30f405e69a52', label: 'Para tu vehículo' },
  { icon: 'https://www.figma.com/api/mcp/asset/3611a8c0-0e4a-4034-9253-08daf5a8e302', label: 'Experiencias' },
];

const TRIP_CARDS = [
  { img: 'https://www.designsuites.com/images/bariloche/foto_33.jpg', cat: 'Hospedaje', name: 'Design Suites Bariloche', price: 'Desde $49.999 por 2 noches', favActive: false, to: '/hospedaje' },
  { img: 'https://www.switchbacktravel.com/sites/default/files/image_fields/In-Depth%20Gear%20Reviews/Patagonia%20Tres%203-in-1%20Parka/Patagonia%20Tres%203-in-1%20Parka%20%28adjusting%20hood%29.jpg', cat: 'Indumentaria', name: 'Campera Patagonia', price: '$239.000 en 6 cuotas sin interés', favActive: true },
  { img: 'https://media.staticontent.com/media/pictures/8faf882d-b4cd-4306-b0d8-ac5ab26fd85b/853x380?op=NONE&enlarge=false&gravity=ce_0_0&quality=80&dpr=1', cat: 'Actividad', name: 'Catamarán Isla Victoria', price: 'Desde $18.500 por persona' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Base_del_Cerro_Catedral_en_Bariloche._%28Patagonia_Argentina%29_20.JPG', cat: 'Actividad', name: 'Ski Cerro Catedral', price: 'Desde $32.000 por día' },
  { img: 'https://images.pexels.com/photos/9292084/pexels-photo-9292084.jpeg?auto=compress&cs=tinysrgb&w=800', cat: 'Gastronomía', name: 'El Boliche de Alberto', price: 'Reservá tu mesa' },
];

const TECH_PRODUCTS = [
  { id: 'tech-1', img: 'https://media.traveler.es/photos/6712429132de56225d8bb7ff/4:3/w_1776,h_1332,c_limit/GettyImages-1752719931.jpg', price: '$1.339.208', install: 'Mismo precio en 12 cuotas de $199.560', title: 'Vuelos desde Buenos Aires a Madrid ida y vuelta', badge: 'Oferta imperdible', withPoints: true, imgFilled: true },
  { id: 'tech-2', img: 'https://www.figma.com/api/mcp/asset/f02e1145-950e-44a9-9a9c-e3fb5eba16eb', oldPrice: '$59.999', price: '$24.999', shipping: 'Envío Gratis', title: 'Escurridor Secaplatos Platos Cubiertos Acero Negro Cocina Organizador Vajilla Porta', favActive: true, withPoints: true },
  { id: 'tech-3', img: 'https://www.figma.com/api/mcp/asset/849adfbe-111f-4c22-9dfb-cf68cd35d7c0', oldPrice: '$1.392.763', price: '$1.079.763', install: 'Mismo precio en 12 cuotas de $199.560', title: 'iPhone 14 Dual SIM 256 GB amarillo', withPoints: true },
  { id: 'tech-4', img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg', oldPrice: '$2.670.000', price: '$2.124.000', install: 'Mismo precio en 12 cuotas de $199.560', title: '5 días y 4 noches en Petit Hotel Panambi', withPoints: true, imgFilled: true },
  { id: 'tech-5', img: 'https://www.figma.com/api/mcp/asset/ef6c33cb-56af-4e94-b2b3-8dc071e70aa1', oldPrice: '$2.895.226', price: '$205.000', shipping: 'Envío Gratis', title: 'Bota Trekking Timberland Maddsen Peak Waterproof Dama', withPoints: true },
  { id: 'tech-6', img: 'https://www.figma.com/api/mcp/asset/c85697e1-2aab-4b78-8d8b-c51c7f6bad44', oldPrice: '$2.895.226', price: '$2.895.226', shipping: 'Envío Gratis', title: 'Notebook Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16gb Color Graphite', withPoints: true },
];

const ELECTRO_PRODUCTS = [
  { id: 'electro-1', img: 'https://www.figma.com/api/mcp/asset/c90e0eff-6988-43a6-8ce5-d448d1f9d96e', oldPrice: '$45.999', price: '$39.999', shipping: 'Envío Gratis', title: 'Cafetera Espresso Profesional' },
  { id: 'electro-2', img: 'https://www.figma.com/api/mcp/asset/9d1b83ce-7eef-49e9-8d03-f054273be82d', oldPrice: '$18.499', price: '$16.999', shipping: 'Envío Gratis', title: 'Batidora de Mano Compacta y Potente', favActive: true },
  { id: 'electro-3', img: 'https://www.figma.com/api/mcp/asset/e4a642d2-63a8-437f-b3e8-c35f42b69e3a', oldPrice: '$22.999', price: '$19.999', shipping: 'Envío Gratis', title: 'Olla de Cocción Lenta con Temporizador' },
  { id: 'electro-4', img: 'https://www.figma.com/api/mcp/asset/be05f592-1b95-4539-9db4-eb0af9f25671', oldPrice: '$50.999', price: '$44.999', shipping: 'Envío Gratis', title: 'Freidora de Aire Saludable y Eficiente' },
  { id: 'electro-5', img: 'https://www.figma.com/api/mcp/asset/cb196128-65fa-45bf-b1e3-423160e55554', oldPrice: '$35.499', price: '$32.499', shipping: 'Envío Gratis', title: 'Extractor de Jugo de Alta Velocidad' },
  { id: 'electro-6', img: 'https://www.figma.com/api/mcp/asset/d385cf95-030f-4ea3-852d-1575f293b77f', oldPrice: '$15.999', price: '$13.999', shipping: 'Envío Gratis', title: 'Plancha de Vapor Vertical Portátil' },
];



const MAS_ACCEDIDOS = [
  { icon: '/icons/pedidos.svg', label: 'Mis pedidos' },
  { icon: '/icons/medios de pago.svg', label: 'Medios de pago' },
  { icon: '/icons/seguros.svg', label: 'Seguros' },
  { icon: '/icons/puntos2.svg', label: 'Puntos acumulados' },
  { icon: '/icons/historial de busquedas.svg', label: 'Historial de búsquedas' },
  { icon: '/icons/super2.svg', label: 'Ofertas de supermercado' },
];

const STATUS_CARDS = [
  {
    label: 'Puntos por vencer · 17 días',
    title: 'Llevate los AirPods Pro que miraste con 2.000 puntos hasta el 31/05 por $130.000',
    img: getPublicUrl('Imagenes', 'airpods.png'),
    href: '#',
  },
  {
    label: 'Pedido en camino',
    title: 'Tu Termo Stanley llega mañana entre 10 y 14hs a tu casa en Palermo.',
    img: getPublicUrl('Imagenes', 'termo.png'),
    href: '#',
  },
  {
    label: 'Cuota próxima · 5 días',
    title: 'El 20/05 vence tu cuota de $18.400 correspondiente a 3 compras activas.',
    img: getPublicUrl('Imagenes', 'cuota.png'),
    href: '#',
  },
];

const HERO_SLIDES = [
  { cls: 'hero-slide--tecno', eyebrow: 'Hasta 24 cuotas sin interés', title: 'Tecnología\nal mejor precio', cta: 'Ver ofertas' },
  { cls: 'hero-slide--moda', eyebrow: 'Nueva temporada', title: 'Moda y\ntendencias', cta: 'Ver colección' },
  { cls: 'hero-slide--electro', eyebrow: 'Hasta 35% de descuento', title: 'Electrodomésticos\npara tu hogar', cta: 'Ver descuentos' },
];


function ProductCarousel({ title, badge, products }) {
  const trackRef = useRef(null);

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
        <div className="section-title-group">
          <h2 className="section-title">{title}</h2>
          {badge && <span className="section-title-badge">{badge}</span>}
        </div>
        <LinkButton as="a" href="#">Mostrar todo</LinkButton>
      </div>
      <div className="carousel-wrap">
        <button className="carousel-arrow" aria-label="Anterior" onClick={() => scroll(-1)}><i className="ph ph-caret-left"></i></button>
        <div className="carousel-track" ref={trackRef}>
          <div className="product-row">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
        <button className="carousel-arrow" aria-label="Siguiente" onClick={() => scroll(1)}><i className="ph ph-caret-right"></i></button>
      </div>
    </section>
  );
}

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const DELAY = 5000;

  function goTo(idx) {
    setCurrent(((idx % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }

  function startAutoplay() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % HERO_SLIDES.length), DELAY);
  }

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="hero-wrap" onMouseEnter={() => clearInterval(timerRef.current)} onMouseLeave={startAutoplay}>
      <section className="hero">
        <div className="hero-slider" style={{transform:`translateX(-${current * 100}%)`}}>
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`hero-slide ${s.cls}`}>
              <div className="hero-slide-inner">
                <p className="hero-slide-eyebrow">{s.eyebrow}</p>
                <h2 className="hero-slide-title">{s.title.split('\n').map((l, j) => <span key={j}>{l}{j === 0 && <br />}</span>)}</h2>
                <a href="#" className="btn-primary">{s.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <button className="hero-arrow left" aria-label="Anterior" onClick={() => { goTo(current - 1); startAutoplay(); }}>
        <i className="ph ph-caret-left"></i>
      </button>
      <button className="hero-arrow right" aria-label="Siguiente" onClick={() => { goTo(current + 1); startAutoplay(); }}>
        <i className="ph ph-caret-right"></i>
      </button>
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <span key={i} className={`hero-dot${i === current ? ' active' : ''}`} onClick={() => { goTo(i); startAutoplay(); }}></span>
        ))}
      </div>
    </div>
  );
}


export default function HomePage() {
  const [couponToggles, setCouponToggles] = useState(COUPONS.map((_, i) => i === 0));
  function toggleCoupon(i) {
    setCouponToggles(prev => prev.map((v, j) => j === i ? !v : v));
  }

  return (
    <>
      <aside className="tienda-sidebar">
        <div className="ts-logo">
          <img src="/img/logo.png" alt="Tienda Galicia" />
        </div>
        <nav className="ts-nav">
          <a href="#" className="ts-nav-item active"><i className="ph ph-house"></i><span>Inicio</span></a>
          <span className="ts-nav-label">Explorar</span>
          <a href="#" className="ts-nav-item"><i className="ph ph-tag"></i><span>Ofertas del día</span></a>
          <a href="#" className="ts-nav-item"><i className="ph ph-airplane-takeoff"></i><span>Viajes</span></a>
          <a href="#" className="ts-nav-item"><i className="ph ph-shield-check"></i><span>Seguros</span></a>
          <a href="#" className="ts-nav-item"><i className="ph ph-grid-four"></i><span>Categorías</span></a>
          <span className="ts-nav-label">Mi cuenta</span>
          <a href="#" className="ts-nav-item"><i className="ph ph-heart"></i><span>Favoritos</span></a>
          <a href="#" className="ts-nav-item"><i className="ph ph-package"></i><span>Mis pedidos</span></a>
          <a href="#" className="ts-nav-item"><i className="ph ph-storefront"></i><span>Tiendas Oficiales</span></a>
        </nav>
        <div className="ts-user">
          <div className="ts-user-avatar">{CURRENT_USER.initial}</div>
          <div className="ts-user-info">
            <span className="ts-user-name">{CURRENT_USER.name}</span>
            <span className="ts-user-role">{CURRENT_USER.role}</span>
          </div>
        </div>
      </aside>

      <div className="tienda-main">
        <Header variant="home" user={CURRENT_USER} />

        <div className="desktop-greeting">
          <div className="desktop-greeting-left">
            <div className="desktop-greeting-avatar">
            {CURRENT_USER.avatar
              ? <img src={CURRENT_USER.avatar} alt={CURRENT_USER.name} />
              : CURRENT_USER.initial}
          </div>
            <span className="desktop-greeting-name">Hola, {CURRENT_USER.name.split(' ')[0]}</span>
          </div>
        </div>

        {/* ── Mobile home ── */}
        <div className="new-mobile-home">
          <div className="nmh-ctx-card">
            <div className="nmh-ctx-icon">
              <img src={CTX_CAR_ICON} alt="" width={24} height={24} />
            </div>
            <div className="nmh-ctx-body">
              <p className="nmh-ctx-sub">El viaje se acerca</p>
              <p className="nmh-ctx-title">Ya tenés el vuelo. Armamos todo lo que necesitas para el viaje.</p>
              <a href="#" className="nmh-ctx-link">Ver opciones de transporte</a>
            </div>
          </div>

          <section className="nmh-trip-section">
            <div className="nmh-section-header">
              <h2 className="nmh-section-title">Para tu viaje</h2>
              <LinkButton as={Link} to="/para-tu-viaje">Mostrar todo</LinkButton>
            </div>
            <div className="nmh-trip-cards-wrap">
              <div className="nmh-trip-cards" id="nmh-trip-cards-scroll">
                {TRIP_CARDS.map(c => <TripCard key={c.name} card={c} />)}
              </div>
            </div>
          </section>

          <section className="nmh-explore-section">
            <div className="nmh-section-header">
              <h2 className="nmh-explore-title">Explorá</h2>
              <LinkButton as="a" href="#">Conocer todas</LinkButton>
            </div>
            <div className="nmh-chips-row">
              {CHIPS.map(c => (
                <div key={c.label} className="nmh-chip">
                  <img src={c.icon} alt="" className="nmh-chip-icon" />
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="nmh-insurance-card">
            <div className="nmh-insurance-img">
              <img src="https://images.pexels.com/photos/8869247/pexels-photo-8869247.jpeg" alt="Seguro de viaje" />
            </div>
            <div className="nmh-insurance-body">
              <p className="nmh-insurance-sub">Recomendado para el viaje</p>
              <p className="nmh-insurance-title">Agregá un seguro de viaje y viajá más tranquila</p>
              <PrimaryButton style={{alignSelf:'flex-start'}}>Contratar cobertura</PrimaryButton>
            </div>
          </div>

          <div className="nmh-credit-card">
            <div className="nmh-credit-info">
              <p className="nmh-credit-label">Crédito disponible</p>
              <p className="nmh-credit-amount">$450.000</p>
              <p className="nmh-credit-sub">Podés solicitarlo ahora sin trámites</p>
            </div>
            <button className="nmh-credit-btn">Solicitar crédito</button>
          </div>

          <div className="nmh-coupons-card">
            <div className="nmh-coupons-header">
              <span className="nmh-coupons-title">Cupones a vencer</span>
              <a href="#" className="nmh-coupons-link">Ver todos</a>
            </div>
            <div className="nmh-coupons-list">
              {COUPONS.map((c, i) => (
                <div key={c.title} className="nmh-coupon-item">
                  <div className="nmh-coupon-icon"><img src={c.icon} alt="" style={{width:'20px',height:'20px'}} /></div>
                  <div className="nmh-coupon-info">
                    <p className="nmh-coupon-name">{c.title}</p>
                    <p className="nmh-coupon-sub">{c.subtitle}</p>
                    <span className="nmh-coupon-badge">{c.expires}</span>
                  </div>
                  <button className={`coupon-toggle${couponToggles[i] ? '' : ' off'}`} onClick={() => toggleCoupon(i)} aria-label="Activar cupón" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <HeroSlider />

        <main className="container">
          {/* ── Desktop home grid ── */}
          <div className="desktop-home">
            <div className="dh-trip-panel">
              <div className="dh-ctx-text">
                <p className="dh-ctx-sub">El viaje se acerca</p>
                <p className="dh-ctx-title">Ya tenés el vuelo. Armamos todo lo que necesitas para el viaje.</p>
              </div>
              <div className="dh-trip-cards">
                {TRIP_CARDS.slice(0, 3).map(c => <TripCard key={c.name} card={c} variant="desktop" />)}
              </div>
              <div className="dh-ctx-card">
                <div className="dh-ctx-icon"><img src={CTX_CAR_ICON} alt="" width={24} height={24} /></div>
                <div className="dh-ctx-body">
                  <p className="dh-ctx-sub">El viaje se acerca</p>
                  <p className="dh-ctx-title">Ya tenés el vuelo. Armamos todo lo que necesitas para el viaje.</p>
                  <a href="#" className="dh-ctx-link">Ver opciones de transporte</a>
                </div>
              </div>
              <SecondaryButton as={Link} to="/para-tu-viaje" style={{width:'100%'}}>Ver todo</SecondaryButton>
            </div>

            <div className="dh-explore-chips-card">
              <div className="dh-explore-header">
                <span className="dh-explore-title">Explorá</span>
                <LinkButton as="a" href="#">Conocer todas</LinkButton>
              </div>
              <div className="dh-chips-row">
                {CHIPS.map(c => (
                  <div key={c.label} className="dh-chip">
                    <img src={c.icon} alt={c.label} />
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dh-credit-card">
              <div className="dh-credit-info">
                <p className="dh-credit-label">Crédito disponible</p>
                <p className="dh-credit-amount">$450.000</p>
                <p className="dh-credit-sub">Podés solicitarlo ahora sin trámites</p>
              </div>
              <button className="dh-credit-btn">Solicitar crédito</button>
            </div>

            <div className="dh-coupons-card">
              <div className="dh-coupons-header">
                <span className="dh-coupons-title">Cupones a vencer</span>
                <a href="#" className="dh-coupons-link">Ver todos</a>
              </div>
              <div className="dh-coupons-list">
                {COUPONS.map((c, i) => (
                  <div key={c.title} className="dh-coupon-item">
                    <div className="dh-coupon-icon"><img src={c.icon} alt="" style={{width:'18px',height:'18px'}} /></div>
                    <div className="dh-coupon-info">
                      <p className="dh-coupon-name">{c.title}</p>
                      <p className="dh-coupon-sub">{c.subtitle}</p>
                      <span className="dh-coupon-badge">{c.expires}</span>
                    </div>
                    <button className={`coupon-toggle${couponToggles[i] ? '' : ' off'}`} onClick={() => toggleCoupon(i)} aria-label="Activar cupón" />
                  </div>
                ))}
              </div>
            </div>

            <div className="dh-insurance-card">
              <img src="https://images.pexels.com/photos/8869247/pexels-photo-8869247.jpeg" alt="Seguro de viaje" className="dh-insurance-bg" />
              <div className="dh-insurance-overlay">
                <p className="dh-insurance-sub">Recomendado para el viaje</p>
                <p className="dh-insurance-title">Agregá un seguro de viaje y viajá más tranquila</p>
                <PrimaryButton style={{alignSelf:'flex-start'}}>Contratar cobertura</PrimaryButton>
              </div>
            </div>
          </div>

          <div className="feature-strip">
            {[
              { iconUrl: '/icons/medios de pago.svg', label: 'Cuotas', sub: 'Hasta 24 sin interés' },
              { iconUrl: '/icons/descuento tecnologia.svg', label: 'Promos', sub: 'Hasta 50% descuento' },
              { iconUrl: '/icons/seguimiento de envios.svg', label: 'Envíos', sub: 'A todo el país' },
              { iconPh: 'ph-storefront', label: 'Entregas', sub: 'En tiendas sin costo' },
            ].map(({ iconUrl, iconPh, label, sub }) => (
              <div key={label} className="feature-card">
                <div className="feature-icon">
                  {iconUrl ? <img src={iconUrl} alt="" style={{width:'28px',height:'28px'}} /> : <i className={`ph ${iconPh}`}></i>}
                </div>
                <div className="feature-text"><strong>{label}</strong><span>{sub}</span></div>
              </div>
            ))}
          </div>

          <div className="desktop-ctx-banner">
            <div className="desktop-ctx-icon"><img src={CTX_CAR_ICON} alt="" width={22} height={22} /></div>
            <div className="desktop-ctx-body">
              <p className="desktop-ctx-sub">El viaje se acerca</p>
              <p className="desktop-ctx-title">Ya tenés el vuelo. Armamos todo lo que necesitas para el viaje.</p>
            </div>
            <a href="#" className="desktop-ctx-link">Ver opciones de transporte <i className="ph ph-arrow-right" style={{fontSize:'14px',verticalAlign:'middle'}}></i></a>
          </div>

          <section className="status-section">
            {STATUS_CARDS.map(card => (
              <StatusCard key={card.label} card={card} />
            ))}
          </section>

          <section className="mas-accedidos-section">
            <h2 className="mas-accedidos-title">Más accedidos</h2>
            <div className="mas-accedidos-grid">
              {MAS_ACCEDIDOS.map(item => (
                <a href="#" key={item.label} className="mas-accedidos-card">
                  <div className="mas-accedidos-icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <span className="mas-accedidos-label">{item.label}</span>
                </a>
              ))}
            </div>
          </section>

          <div className="dashboard-grid">
            <div className="dashboard-main">
              <ProductCarousel title="Para comprar con tus puntos" badge="54.000 puntos disponibles - Vence el 31/05" products={TECH_PRODUCTS} />
              <ProductCarousel title="Relacionados con tu última compra" products={ELECTRO_PRODUCTS} />

            </div>

            <div className="dashboard-aside">
              <section className="section">
                <div className="section-header">
                  <h2 className="section-title">Tiendas Oficiales</h2>
                  <LinkButton as="a" href="#">Mostrar todo</LinkButton>
                </div>
                <div className="carousel-wrap">
                  <button className="carousel-arrow"><i className="ph ph-caret-left"></i></button>
                  <div className="carousel-track">
                    <div className="stores-row">
                      {['Samsung','Apple','LG','Sony','Motorola','Xiaomi'].map(s => <div key={s} className="store-card">{s}</div>)}
                    </div>
                  </div>
                  <button className="carousel-arrow"><i className="ph ph-caret-right"></i></button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

    </>
  );
}
