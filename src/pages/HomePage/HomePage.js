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
import ContextBanner from '../../components/ContextBanner';
import CreditCard from '../../components/CreditCard';
import CouponCard from '../../components/CouponCard';
import InsuranceCard from '../../components/InsuranceCard';
import { useBrand } from '../../brands/BrandContext';
import BrandLogo from '../../components/BrandLogo';

const CTX_CAR_ICON = '/icons/vehículo.svg';

const CURRENT_USER_BASE = { name: 'Sol Gonzalez', initial: 'S', avatar: getPublicUrl('Imagenes', 'avatar.png') };

const COUPONS = [
  { icon: '/icons/descuento tecnologia.svg', title: '15% Off en Tecnología', subtitle: 'Válido en toda sección', expires: 'Vence en 3 días' },
  { icon: '/icons/cupones.svg', title: '$5.000 en tu próxima compra', subtitle: 'Válido en todas las secciones', expires: 'Vence en 3 días' },
];

const CHIPS = [
  { icon: '/icons/compras.svg',              label: 'Compras recurrentes' },
  { icon: '/icons/super.svg',                label: 'Ahorrar en el super' },
  { icon: '/icons/puntos.svg',               label: 'Hasta 54.000 puntos' },
  { icon: '/icons/computadora.svg',          label: 'Computadoras' },
  { icon: '/icons/audio.svg',                label: 'Audio' },
  { icon: '/icons/smartphone.svg',           label: 'Renovar mi Smartphone' },
  { icon: '/icons/deporte.svg',              label: 'Deporte' },
  { icon: '/icons/vehículo.svg',             label: 'Para tu vehículo' },
  { icon: '/icons/experiencia.svg',          label: 'Experiencias' },
];

const TRIP_CARDS = [
  { img: getPublicUrl('Imagenes', 'design-suites.jpg'), cat: 'Hospedaje', name: 'Design Suites Bariloche', price: 'Desde $49.999 por 2 noches', favActive: false, to: '/hospedaje' },
  { img: getPublicUrl('Imagenes', 'campera-patagonia.png'), cat: 'Indumentaria', name: 'Campera Patagonia', price: '$239.000 en 6 cuotas sin interés', favActive: true },
  { img: getPublicUrl('Imagenes', 'catamaran.jpg'), cat: 'Actividad', name: 'Catamarán Isla Victoria', price: 'Desde $18.500 por persona' },
  { img: getPublicUrl('Imagenes', 'cerro-catedral.jpeg'), cat: 'Actividad', name: 'Ski Cerro Catedral', price: 'Desde $32.000 por día' },
  { img: getPublicUrl('Imagenes', 'restaurante.png'), cat: 'Gastronomía', name: 'El Boliche de Alberto', price: 'Reservá tu mesa' },
];

const TECH_PRODUCTS = [
  { id: 'tech-1', img: getPublicUrl('Imagenes', 'madrid.png'), price: '$1.339.208', install: 'Mismo precio en 12 cuotas de $199.560', title: 'Vuelos desde Buenos Aires a Madrid ida y vuelta', badge: 'Oferta imperdible', withPoints: true, imgFilled: true },
  { id: 'tech-2', img: getPublicUrl('Imagenes', 'escurridor.png'), oldPrice: '$59.999', price: '$24.999', shipping: 'Envío Gratis', title: 'Escurridor Secaplatos Platos Cubiertos Acero Negro Cocina Organizador Vajilla Porta', favActive: true, withPoints: true },
  { id: 'tech-3', img: getPublicUrl('Imagenes', 'iPhone.png'), oldPrice: '$1.392.763', price: '$1.079.763', install: 'Mismo precio en 12 cuotas de $199.560', title: 'iPhone 14 Dual SIM 256 GB amarillo', withPoints: true },
  { id: 'tech-4', img: getPublicUrl('Imagenes', 'hotel.png'), oldPrice: '$2.670.000', price: '$2.124.000', install: 'Mismo precio en 12 cuotas de $199.560', title: '5 días y 4 noches en Petit Hotel Panambi', withPoints: true, imgFilled: true },
  { id: 'tech-5', img: getPublicUrl('Imagenes', 'bota.png'), oldPrice: '$2.895.226', price: '$205.000', shipping: 'Envío Gratis', title: 'Bota Trekking Timberland Maddsen Peak Waterproof Dama', withPoints: true },
  { id: 'tech-6', img: getPublicUrl('Imagenes', 'notebook.png'), oldPrice: '$2.895.226', price: '$2.895.226', shipping: 'Envío Gratis', title: 'Notebook Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16gb Color Graphite', withPoints: true },
];

const ELECTRO_PRODUCTS = [
  { id: 'electro-1', img: getPublicUrl('Imagenes', 'cafetera.png'), oldPrice: '$45.999', price: '$39.999', shipping: 'Envío Gratis', title: 'Cafetera Espresso Profesional' },
  { id: 'electro-2', img: getPublicUrl('Imagenes', 'batidora.png'), oldPrice: '$18.499', price: '$16.999', shipping: 'Envío Gratis', title: 'Batidora de Mano Compacta y Potente', favActive: true },
  { id: 'electro-3', img: getPublicUrl('Imagenes', 'olla.png'), oldPrice: '$22.999', price: '$19.999', shipping: 'Envío Gratis', title: 'Olla de Cocción Lenta con Temporizador' },
  { id: 'electro-4', img: getPublicUrl('Imagenes', 'freidora.png'), oldPrice: '$50.999', price: '$44.999', shipping: 'Envío Gratis', title: 'Freidora de Aire Saludable y Eficiente' },
  { id: 'electro-5', img: getPublicUrl('Imagenes', 'extractor.png'), oldPrice: '$35.499', price: '$32.499', shipping: 'Envío Gratis', title: 'Extractor de Jugo de Alta Velocidad' },
  { id: 'electro-6', img: getPublicUrl('Imagenes', 'plancha.png'), oldPrice: '$15.999', price: '$13.999', shipping: 'Envío Gratis', title: 'Plancha de Vapor Vertical Portátil' },
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


function TripScrollWrap({ children, innerClass, compact = false }) {
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
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * (t.clientWidth * 0.8), behavior: 'smooth' });
  }

  return (
    <div className={`trip-scroll-wrap${compact ? ' trip-scroll-wrap--compact' : ''}`}>
      {canLeft && (
        <button className="trip-arrow trip-arrow--left" onClick={() => scroll(-1)} aria-label="Anterior">
          <i className="ph ph-caret-left"></i>
        </button>
      )}
      <div className={innerClass} ref={trackRef}>{children}</div>
      {canRight && (
        <button className="trip-arrow trip-arrow--right" onClick={() => scroll(1)} aria-label="Siguiente">
          <i className="ph ph-caret-right"></i>
        </button>
      )}
    </div>
  );
}

function ProductCarousel({ title, badge, products }) {
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
        <div className="section-title-group">
          <h2 className="section-title">{title}</h2>
          {badge && <span className="section-title-badge">{badge}</span>}
        </div>
        <LinkButton as="a" href="#">Mostrar todo</LinkButton>
      </div>
      <div className="carousel-wrap">
        <button className={`carousel-arrow${!canLeft ? ' carousel-arrow--hidden' : ''}`} aria-label="Anterior" onClick={() => scroll(-1)}><i className="ph ph-caret-left"></i></button>
        <div className="carousel-track" ref={trackRef}>
          <div className="product-row">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
        <button className={`carousel-arrow${!canRight ? ' carousel-arrow--hidden' : ''}`} aria-label="Siguiente" onClick={() => scroll(1)}><i className="ph ph-caret-right"></i></button>
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
                <PrimaryButton as="a" href="#">{s.cta}</PrimaryButton>
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
  const brand = useBrand();
  const currentUser = { ...CURRENT_USER_BASE, role: `Cuenta ${brand.bankName}` };
  const tripCards = TRIP_CARDS.map(c => c.to ? { ...c, to: brand.path(c.to) } : c);
  const [couponToggles, setCouponToggles] = useState(COUPONS.map((_, i) => i === 0));
  function toggleCoupon(i) {
    setCouponToggles(prev => prev.map((v, j) => j === i ? !v : v));
  }

  return (
    <>
      <aside className="tienda-sidebar">
        <div className="ts-logo">
          <BrandLogo />
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
          <div className="ts-user-avatar">{currentUser.initial}</div>
          <div className="ts-user-info">
            <span className="ts-user-name">{currentUser.name}</span>
            <span className="ts-user-role">{currentUser.role}</span>
          </div>
        </div>
      </aside>

      <div className="tienda-main">
        <Header variant="home" user={currentUser} />

        {/* ── Mobile home ── */}
        <div className="new-mobile-home">
          <ContextBanner
            icon={CTX_CAR_ICON}
            sub="El viaje se acerca"
            title="Reservá un transfer o alquilá un auto y evitá sorpresas al llegar."
            linkText="Ver opciones de transporte"
          />

          <section className="nmh-trip-section">
            <div className="nmh-section-header">
              <h2 className="nmh-section-title">Para tu viaje</h2>
              <LinkButton as={Link} to={brand.path('/para-tu-viaje')}>Mostrar todo</LinkButton>
            </div>
            <TripScrollWrap innerClass="nmh-trip-cards">
              {tripCards.map(c => <TripCard key={c.name} card={c} />)}
            </TripScrollWrap>
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

          <InsuranceCard variant="overlay" imgSrc={getPublicUrl('Imagenes', 'cobertura.png')} />

          <CreditCard
            label="Crédito disponible"
            amount="$450.000"
            sub="Podés solicitarlo ahora sin trámites"
          />

          <CouponCard coupons={COUPONS} toggles={couponToggles} onToggle={toggleCoupon} />
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
              <TripScrollWrap innerClass="dh-trip-cards" compact>
                {tripCards.map(c => <TripCard key={c.name} card={c} variant="desktop" />)}
              </TripScrollWrap>
              <ContextBanner
                icon={CTX_CAR_ICON}
                sub="El viaje se acerca"
                title="Reservá un transfer o alquilá un auto y evitá sorpresas al llegar."
                linkText="Ver opciones de transporte"
              />
              <SecondaryButton as={Link} to={brand.path('/para-tu-viaje')} style={{width:'100%'}}>Ver todo</SecondaryButton>
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

            <CreditCard
              label="Crédito disponible"
              amount="$450.000"
              sub="Podés solicitarlo ahora sin trámites"
            />

            <CouponCard coupons={COUPONS} toggles={couponToggles} onToggle={toggleCoupon} />

            <InsuranceCard variant="overlay" imgSrc={getPublicUrl('Imagenes', 'cobertura.png')} />
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
