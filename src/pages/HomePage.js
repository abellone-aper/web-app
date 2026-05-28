import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const CURRENT_USER = { name: 'Sol García', initial: 'S', role: 'Cuenta Galicia' };

const PROMO_CARDS = [
  { file: 'promo-envio', alt: 'Envío gratis', label: 'Productos con envío gratis' },
  { file: 'promo-credito', alt: 'Crédito disponible', label: 'Tenés crédito disponible' },
  { file: 'promo-combustible', alt: 'Combustible', label: 'Llena tu tanque con 45% Off' },
  { file: 'promo-cupones', alt: 'Cupones', label: 'Cupones de descuento' },
];

const CHIPS = [
  { icon: '/img/chip-hogar.svg', label: 'Belleza' },
  { icon: '/img/chip-hogar.svg', label: 'Hogar' },
  { icon: '/img/chip-compu.svg', label: 'Pequeños electrodomésticos' },
  { icon: '/img/chip-hogar.svg', label: 'Computadoras' },
  { icon: '/img/chip-audio.svg', label: 'Audio' },
  { icon: '/img/chip-celu.svg', label: 'Smartphones' },
  { icon: '/img/chip-deporte.svg', label: 'Deporte' },
  { icon: '/img/chip-vehiculos.svg', label: 'Accesorios vehículos' },
  { icon: '/img/chip-bicicletas.svg', label: 'Bicicletas' },
  { icon: '/img/chip-herramientas.svg', label: 'Herramientas' },
];

const TRIP_CARDS = [
  { img: 'https://www.designsuites.com/images/bariloche/foto_33.jpg', cat: 'Hospedaje', name: 'Design Suites Bariloche', price: 'Desde $49.999 por 2 noches', badge: 'Destino', favActive: false, to: '/hospedaje' },
  { img: 'https://www.switchbacktravel.com/sites/default/files/image_fields/In-Depth%20Gear%20Reviews/Patagonia%20Tres%203-in-1%20Parka/Patagonia%20Tres%203-in-1%20Parka%20%28adjusting%20hood%29.jpg', cat: 'Indumentaria', name: 'Campera Patagonia', price: '$239.000 en 6 cuotas sin interés', favActive: true },
  { img: 'https://media.staticontent.com/media/pictures/8faf882d-b4cd-4306-b0d8-ac5ab26fd85b/853x380?op=NONE&enlarge=false&gravity=ce_0_0&quality=80&dpr=1', cat: 'Actividad', name: 'Catamarán Isla Victoria', price: 'Desde $18.500 por persona' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Base_del_Cerro_Catedral_en_Bariloche._%28Patagonia_Argentina%29_20.JPG', cat: 'Actividad', name: 'Ski Cerro Catedral', price: 'Desde $32.000 por día' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Lago_Nahuel_Huapi%2C_Bariloche%2C_Argentina.jpg/1200px-Lago_Nahuel_Huapi%2C_Bariloche%2C_Argentina.jpg', cat: 'Gastronomía', name: 'El Boliche de Alberto', price: 'Reservá tu mesa' },
];

const TECH_PRODUCTS = [
  { id: 'tech-1', img: 'https://multipoint.com.ar/Image/0/700_700-Samsung-123506515-ar-galaxy-book3-pro-14-inch-np940-np940xfg-ka1ar-537093813--Download-Source--zoom.jpg', disc: '30% Off', oldPrice: '$999.999,00', price: '$699.999', install: 'Mismo precio en 12 cuotas de $23.142', title: 'Notebook Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16gb Color Graphite', seller: 'Start_' },
  { id: 'tech-2', img: 'https://images.fravega.com/f500/15432a04096368c7b949c3baf53a08b1.png', disc: '10% Off', oldPrice: '$308.570', price: '$277.715', install: 'Mismo precio en 12 cuotas de $23.142', title: 'Moto G13 128gb 4gb Ram Rosa', seller: 'AlClick', favActive: true },
  { id: 'tech-3', img: 'https://images.samsung.com/ar/galaxy-buds2/feature/galaxy-buds2-battery-life-mo.jpg', disc: '23% Off', oldPrice: '$297.698', price: '$228.999', install: 'Mismo precio en 12 cuotas de $19.083', title: 'Auriculares in-ear inalámbricos Samsung Galaxy Buds2 SM-R177', seller: 'Samsung' },
  { id: 'tech-4', img: 'https://http2.mlstatic.com/D_NQ_NP_787750-MLA91558386024_092025-O.webp', disc: '15% Off', oldPrice: '$2.899.999', price: '$2.464.999', install: 'Mismo precio en 15 cuotas de $164.333', title: 'Samsung Galaxy Tab S10 Ultra 256gb Black Color Gris', seller: 'Diggit' },
  { id: 'tech-5', img: 'https://http2.mlstatic.com/D_NQ_NP_670516-MLA99966056855_112025-O.webp', disc: '10% Off', oldPrice: '$399.999', price: '$359.999', install: 'Mismo precio en 12 cuotas de $29.999', title: 'Apple Watch SE 2da Gen 44mm Midnight Aluminium', seller: 'Apple' },
  { id: 'tech-6', img: 'https://printy.photos/wp-content/uploads/2024/01/INSTAX-mini-12-product-photography-pink-hero-with-photo.jpg', disc: '21% Off', oldPrice: '$189.999', price: '$149.999', install: 'Mismo precio en 12 cuotas de $12.499', title: 'Cámara Instantánea Fujifilm Instax Mini 12 Rosa Pastel', seller: 'Fujifilm' },
  { id: 'tech-7', img: 'https://tiendadedrones.com.ar/wp-content/uploads/2024/01/DRDJI064.webp', disc: '20% Off', oldPrice: '$1.199.999', price: '$959.999', install: 'Mismo precio en 12 cuotas de $79.999', title: 'Drone DJI Mini 4 Pro Fly More Combo con Control RC-N2', seller: 'DJI' },
];

const ELECTRO_PRODUCTS = [
  { id: 'electro-1', img: 'https://jumboargentina.vtexassets.com/arquivos/ids/867022-800-600?v=638826167044170000&width=800&height=600&aspect=true', disc: '25% Off', oldPrice: '$650.000', price: '$487.500', install: 'Mismo precio en 12 cuotas de $40.625', title: 'Lavarropas Whirlpool 8kg Carga Frontal WNQ80AB', seller: 'Whirlpool' },
  { id: 'electro-2', img: 'https://petenattiar.vtexassets.com/arquivos/ids/211467/HORNO-SAMSUNG-ME731K-K-20Lts-BCO.jpg?v=638006860733200000', disc: '20% Off', oldPrice: '$420.000', price: '$336.000', install: 'Mismo precio en 12 cuotas de $28.000', title: 'Microondas Samsung 28L con Grill ME731K', seller: 'Samsung' },
  { id: 'electro-3', img: 'https://www.electromax.com.py/storage/6702_2.png', disc: '15% Off', oldPrice: '$1.250.000', price: '$1.062.500', install: 'Mismo precio en 12 cuotas de $88.541', title: 'Heladera Whirlpool No Frost 400L Acero Inoxidable', seller: 'Whirlpool' },
  { id: 'electro-4', img: 'https://images.fravega.com/f1000/9c41fa374b8dbc321d3e8b9c8cfbb4df.jpg', disc: '35% Off', oldPrice: '$890.000', price: '$578.500', install: 'Mismo precio en 12 cuotas de $48.208', title: 'Smart TV LG 55" 4K UHD ThinQ AI', seller: 'LG' },
  { id: 'electro-5', img: 'https://http2.mlstatic.com/D_798473-MLA92443866264_092025-C.jpg', disc: '18% Off', oldPrice: '$520.000', price: '$426.400', install: 'Mismo precio en 12 cuotas de $35.533', title: 'Horno Eléctrico Ultracomb 60L con Grill Digital UC-60DG', seller: 'Ultracomb' },
  { id: 'electro-6', img: 'https://arcencohogar.vtexassets.com/arquivos/ids/416612-500-auto?v=639058166515970000&width=500&height=auto&aspect=true', disc: '20% Off', oldPrice: '$980.000', price: '$784.000', install: 'Mismo precio en 12 cuotas de $65.333', title: 'Heladera Freezer Whirlpool No Frost 265L WRB35AB Blanco', seller: 'Whirlpool' },
  { id: 'electro-7', img: 'https://images.fravega.com/f1000/cefcf2d0a3a81ee05ac26ad9707f5e50.jpg', disc: '30% Off', oldPrice: '$380.000', price: '$266.000', install: 'Mismo precio en 12 cuotas de $22.166', title: 'Aspiradora Robot Xiaomi Mi Robot Vacuum S10+ con Base Vaciado', seller: 'Xiaomi' },
];

const PHONE_PRODUCTS = [
  { id: 'phone-1', img: 'https://beercoffee.com.ar/wp-content/uploads/2024/08/i-e1738081689922.webp', disc: '20% Off', oldPrice: '$1.299.000', price: '$1.039.200', install: 'Mismo precio en 12 cuotas de $86.600', title: 'iPhone 15 128gb Negro Apple', seller: 'Apple' },
  { id: 'phone-2', img: 'https://jumboargentina.vtexassets.com/arquivos/ids/825196-800-600?v=638526909930670000&width=800&height=600&aspect=true', disc: '25% Off', oldPrice: '$899.000', price: '$674.250', install: 'Mismo precio en 12 cuotas de $56.187', title: 'Samsung Galaxy S24 256gb Violet', seller: 'Samsung', favActive: true },
  { id: 'phone-3', img: 'https://http2.mlstatic.com/D_Q_NP_868847-CBT110410694439_042026-O.webp', disc: '15% Off', oldPrice: '$549.000', price: '$466.650', install: 'Mismo precio en 12 cuotas de $38.887', title: 'Xiaomi Redmi Note 13 Pro 256gb Azul', seller: 'Xiaomi' },
  { id: 'phone-4', img: 'https://armoto.vtexassets.com/arquivos/ids/165164-800-800?v=638774018596870000&width=800&height=800&aspect=true', disc: '30% Off', oldPrice: '$389.000', price: '$272.300', install: 'Mismo precio en 12 cuotas de $22.691', title: 'Motorola Edge 40 Neo 256gb Verde', seller: 'Motorola' },
  { id: 'phone-5', img: 'https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a556elvqaro/gallery/ar-galaxy-a55-5g-sm-a556-sm-a556elvqaro-544072539?$1164_776_PNG$', disc: '12% Off', oldPrice: '$749.000', price: '$659.120', install: 'Mismo precio en 12 cuotas de $54.926', title: 'Samsung Galaxy A55 5G 256gb Awesome Lilac', seller: 'Samsung' },
  { id: 'phone-6', img: 'https://images.fravega.com/f500/49ec70a0396bbba7592ff496ee9ee8b3.png', disc: '15% Off', oldPrice: '$469.000', price: '$399.650', install: 'Mismo precio en 12 cuotas de $33.304', title: 'Xiaomi 14T 256gb Desert Titanium', seller: 'Xiaomi' },
  { id: 'phone-7', img: 'https://res.cloudinary.com/dyifeei20/image/upload/v1748442225/Google-Pixel-9-Pro-1_dfk6ij.webp', disc: '22% Off', oldPrice: '$1.150.000', price: '$897.000', install: 'Mismo precio en 12 cuotas de $74.750', title: 'Google Pixel 9 Pro 256gb Obsidian', seller: 'Google', favActive: true },
];

const HERO_SLIDES = [
  { cls: 'hero-slide--tecno', eyebrow: 'Hasta 24 cuotas sin interés', title: 'Tecnología\nal mejor precio', cta: 'Ver ofertas' },
  { cls: 'hero-slide--moda', eyebrow: 'Nueva temporada', title: 'Moda y\ntendencias', cta: 'Ver colección' },
  { cls: 'hero-slide--electro', eyebrow: 'Hasta 35% de descuento', title: 'Electrodomésticos\npara tu hogar', cta: 'Ver descuentos' },
];

function FavBtn({ active: initialActive }) {
  const [active, setActive] = useState(initialActive || false);
  return (
    <button className={`fav-btn${active ? ' active' : ''}`} aria-label="Favorito" onClick={e => { e.preventDefault(); setActive(v => !v); }}>
      <i className={active ? 'ph-fill ph-heart' : 'ph ph-heart'}></i>
    </button>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.img} alt={product.title} style={{width:'100%',height:'100%',objectFit:'contain'}} />
        <FavBtn active={product.favActive} />
      </div>
      <div className="product-body">
        <div className="product-info">
          <span className="badge-disc">{product.disc}</span>
          <p className="price-old">{product.oldPrice}</p>
          <div className="price-row"><p className="price-now">{product.price}</p></div>
          <p className="installments">{product.install}</p>
          <p className="shipping">Envío Gratis</p>
          <p className="product-title">{product.title}</p>
        </div>
        <p className="product-seller">Vendido por <a href="#">{product.seller}</a></p>
        <p className="product-notax">Precio sin impuestos nacionales $94.700</p>
      </div>
    </article>
  );
}

function ProductCarousel({ title, products }) {
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
        <h2 className="section-title">{title}</h2>
        <a href="#" className="section-link">Mostrar todo</a>
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

const TRIP_CARD_CLASSES = {
  mobile: {
    root: 'nmh-trip-card', img: 'nmh-trip-card-img', badge: 'nmh-trip-card-badge',
    fav: 'nmh-fav-btn', body: 'nmh-trip-card-body', cat: 'nmh-card-category',
    name: 'nmh-card-name', price: 'nmh-card-price',
  },
  desktop: {
    root: 'dh-trip-card', img: 'dh-trip-card-img', badge: 'dh-trip-badge',
    fav: 'dh-fav-btn', body: 'dh-trip-card-body', cat: 'dh-card-cat',
    name: 'dh-card-name', price: 'dh-card-price',
  },
};

function TripCard({ card, variant = 'mobile' }) {
  const [fav, setFav] = useState(card.favActive || false);
  const cls = TRIP_CARD_CLASSES[variant];
  const inner = (
    <>
      <div className={cls.img}>
        <img src={card.img} alt={card.name} />
        {card.badge && <span className={cls.badge}>{card.badge}</span>}
        <button className={`${cls.fav}${fav ? ' active' : ''}`} aria-label="Favorito" onClick={e => { e.preventDefault(); setFav(v => !v); }}>
          <i className={fav ? 'ph-fill ph-heart' : 'ph ph-heart'}></i>
        </button>
      </div>
      <div className={cls.body}>
        <span className={cls.cat}>{card.cat}</span>
        <span className={cls.name}>{card.name}</span>
        <span className={cls.price}>{card.price}</span>
      </div>
    </>
  );
  if (card.to) return <Link to={card.to} className={cls.root}>{inner}</Link>;
  return <div className={cls.root}>{inner}</div>;
}

export default function HomePage() {
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
        <div className="mobile-header">
          <div className="mobile-header-left">
            <div className="mobile-user-avatar">{CURRENT_USER.initial}</div>
            <span className="mobile-greeting">Hola, {CURRENT_USER.name.split(' ')[0]}</span>
          </div>
          <div className="mobile-header-right">
            <span className="icon-wrap">
              <i className="ph ph-bell" style={{fontSize:'24px'}}></i>
              <span className="notif-dot">1</span>
            </span>
            <i className="ph ph-heart" style={{fontSize:'24px'}}></i>
          </div>
        </div>

        <Header />

        <div className="desktop-greeting">
          <div className="desktop-greeting-left">
            <div className="desktop-greeting-avatar">{CURRENT_USER.initial}</div>
            <span className="desktop-greeting-name">Hola, {CURRENT_USER.name.split(' ')[0]}</span>
          </div>
        </div>

        {/* ── Mobile home ── */}
        <div className="new-mobile-home">
          <div className="nmh-ctx-card">
            <div className="nmh-ctx-icon">
              <i className="ph ph-airplane-takeoff" style={{fontSize:'22px'}}></i>
            </div>
            <div className="nmh-ctx-body">
              <p className="nmh-ctx-sub">Te sacaste un pasaje a Bariloche</p>
              <p className="nmh-ctx-title">Ya tenés el vuelo. Armamos todo lo que necesitas para el viaje.</p>
              <a href="#" className="nmh-ctx-link">Ver mi viaje</a>
            </div>
          </div>

          <section className="nmh-trip-section">
            <div className="nmh-section-header">
              <h2 className="nmh-section-title">Para tu viaje</h2>
              <Link to="/para-tu-viaje" className="nmh-section-link">Mostrar todo</Link>
            </div>
            <div className="nmh-trip-cards-wrap">
              <div className="nmh-trip-cards" id="nmh-trip-cards-scroll">
                {TRIP_CARDS.map(c => <TripCard key={c.name} card={c} />)}
              </div>
            </div>
          </section>

          <section className="nmh-explore-section">
            <h2 className="nmh-explore-title">Explorá</h2>
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
              <button className="nmh-insurance-btn">Contratar cobertura</button>
            </div>
          </div>

          <div className="nmh-promo-grid">
            {PROMO_CARDS.map(({ file, alt, label }) => (
              <div key={file} className="nmh-promo-card">
                <img src={`/img/${file}.png`} alt={alt} className="nmh-promo-illustration" />
                <p className="nmh-promo-label">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroSlider />

        <main className="container">
          {/* ── Desktop home grid ── */}
          <div className="desktop-home">
            <div className="dh-trip-panel">
              <div className="dh-ctx-text">
                <p className="dh-ctx-sub">Te sacaste un pasaje a Bariloche</p>
                <p className="dh-ctx-title">Ya tenés el vuelo. Armamos todo lo que necesitas para el viaje.</p>
              </div>
              <div className="dh-trip-cards">
                {TRIP_CARDS.slice(0, 3).map(c => <TripCard key={c.name} card={c} variant="desktop" />)}
              </div>
              <div className="dh-ctx-card">
                <div className="dh-ctx-icon"><i className="ph ph-airplane-takeoff" style={{fontSize:'20px'}}></i></div>
                <div className="dh-ctx-body">
                  <p className="dh-ctx-sub">Te sacaste un pasaje a Bariloche</p>
                  <p className="dh-ctx-title">Ya tenés el vuelo. Armamos todo lo que necesitas para el viaje.</p>
                  <a href="#" className="dh-ctx-link">Ver mi viaje</a>
                </div>
              </div>
              <Link to="/para-tu-viaje" className="dh-cta-outline">Ver todo</Link>
            </div>

            <div className="dh-explore-chips-card">
              <div className="dh-explore-header">
                <span className="dh-explore-title">Explorá</span>
                <a href="#" className="dh-explore-link">Conocer todas</a>
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

            {PROMO_CARDS.map(({ file, alt, label }) => (
              <div key={file} className="dh-promo-card">
                <img src={`/img/${file}.png`} alt={alt} className="dh-promo-illustration" />
                <p className="dh-promo-label">{label}</p>
              </div>
            ))}

            <div className="dh-insurance-card">
              <img src="https://images.pexels.com/photos/8869247/pexels-photo-8869247.jpeg" alt="Seguro de viaje" className="dh-insurance-bg" />
              <div className="dh-insurance-overlay">
                <p className="dh-insurance-sub">Recomendado para el viaje</p>
                <p className="dh-insurance-title">Agregá un seguro de viaje y viajá más tranquila</p>
                <button className="dh-insurance-btn">Contratar cobertura</button>
              </div>
            </div>
          </div>

          <div className="feature-strip">
            {[['ph-credit-card','Cuotas','Hasta 24 sin interés'],['ph-percent','Promos','Hasta 50% descuento'],['ph-truck','Envíos','A todo el país'],['ph-storefront','Entregas','En tiendas sin costo']].map(([icon,label,sub]) => (
              <div key={label} className="feature-card">
                <div className="feature-icon"><i className={`ph ${icon}`}></i></div>
                <div className="feature-text"><strong>{label}</strong><span>{sub}</span></div>
              </div>
            ))}
          </div>

          <div className="desktop-ctx-banner">
            <div className="desktop-ctx-icon"><i className="ph ph-airplane-takeoff" style={{fontSize:'22px'}}></i></div>
            <div className="desktop-ctx-body">
              <p className="desktop-ctx-sub">Te sacaste un pasaje a Bariloche</p>
              <p className="desktop-ctx-title">Ya tenés el vuelo. Armamos todo lo que necesitas para el viaje.</p>
            </div>
            <a href="#" className="desktop-ctx-link">Ver mi viaje <i className="ph ph-arrow-right" style={{fontSize:'14px',verticalAlign:'middle'}}></i></a>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-main">
              <ProductCarousel title="Tecnología" products={TECH_PRODUCTS} />
              <ProductCarousel title="Electrodomésticos" products={ELECTRO_PRODUCTS} />
              <ProductCarousel title="Smartphones" products={PHONE_PRODUCTS} />

            </div>

            <div className="dashboard-aside">
              <section className="section">
                <div className="section-header">
                  <h2 className="section-title">Tiendas Oficiales</h2>
                  <a href="#" className="section-link">Mostrar todo</a>
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
