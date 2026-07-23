import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mochila.css';
import { CURRENT_USER } from '../../lib/currentUser';
import { getPublicUrl } from '../../lib/storage';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import FavButton from '../../components/Buttons/FavButton';
import TripCard from '../../components/TripCard';
import { useBrand } from '../../brands/BrandContext';

const GALLERY_IMGS = [1, 2, 3, 4, 5, 6, 7].map(n => ({
  src: getPublicUrl('Imagenes', `Mochila/${n}.png`),
  alt: `Mochila Tomtoc — foto ${n}`,
}));

const PRICE_ORIGINAL = 245000;
const PRICE_CURRENT = 171500;
const INSTALLMENTS = 12;
const CASHBACK_PCT = 0.2;

function fmtARS(n) {
  return '$' + Math.round(n).toLocaleString('es-AR');
}

const AI_FACTS_POSITIVE = [
  'Carry-on IATA · 52×33×23cm',
  '1.07 kg · Ripstop Nylon',
  'Laptop hasta 17.3" + iPad 13"',
  'Aprobada TSA',
  'Garantía 2 años · Dev. 30 días',
];
const AI_FACTS_NEGATIVE = ['No ideal viajes +7 días'];

const FEATURES_COL1 = [
  'Compartimento laptop acolchado',
  'Correas de compresión internas',
  'Correa para el pecho regulable',
  'Bolsillo lateral para botella',
];
const FEATURES_COL2 = [
  'Apertura tipo maleta 180°',
  'Panel trasero acolchado 3D',
  'Asa para maleta de ruedas',
  'Cierres YKK premium',
];

const INFO_LIST = [
  { icon: 'ph-tag', label: 'Marca', value: 'Tomtoc' },
  { icon: 'ph-airplane', label: 'Tipo de mochila', value: 'Viaje' },
  { icon: 'ph-check-circle', label: 'Capacidad', value: '40L' },
  { icon: 'ph-drop', label: 'Es a prueba de agua', value: 'Sí' },
  { icon: 'ph-check-circle', label: 'Ruedas', value: 'No' },
  { icon: 'ph-check-circle', label: 'Edad', value: 'Adultos' },
];

const SPEC_TABLES = [
  { title: 'Estilo', rows: [
    ['Color', 'Negro-ripstop'],
    ['Diseño de mochila', 'Mochila para computadora portátil'],
    ['Nombre de estilo', 'Minimalista'],
    ['Patrón', 'Sólido'],
  ] },
  { title: 'Detalles del producto', rows: [
    ['Marca', 'Tomtoc'],
    ['Descripción del rango de edad', 'Adulto'],
    ['Peso del artículo', '950 gramos'],
    ['Número de modelo', 'T66S1D2'],
    ['Número de artículos', '1'],
    ['Total del paquete', '1 Conteo'],
  ] },
  { title: 'Medidas', rows: [
    ['Volumen de almacenamiento', '40 L'],
    ['Dimensiones (prof. × an. × al.)', '7.87" x 11.81" x 17.72"'],
    ['Peso del artículo', '950 gramos'],
  ] },
  { title: 'Materiales y cuidado', rows: [
    ['Tipo de material', 'Poliéster 400D y poliéster 1680D'],
    ['Cuidado', 'Lavado a mano'],
    ['Material exterior', 'Poliéster'],
    ['Cubierta', 'Soft Shell'],
    ['Peso de tela', 'Liviano'],
  ] },
];

const REVIEW_TAGS = ['Materiales de calidad', 'Liviana', 'Resistente al agua', 'Sin correa de cadera', 'No ideal para viajes largos'];
const REVIEW_AI_SUMMARY = 'La mochila se ve de excelente calidad y materiales. Es muy cómoda y funcional, además de espaciosa. Ofrece un gran producto a un precio competitivo. Usuarios mencionan que no es ideal para viajes largos.';
const REVIEW_PHOTOS = [
  { src: 'https://http2.mlstatic.com/D_NQ_NP_2X_601029-MLA85094285482_052025-F.webp', rating: 5 },
  { src: 'https://http2.mlstatic.com/D_NQ_NP_2X_994837-MLA85396153805_052025-F.webp', rating: 4.7 },
  { src: 'https://http2.mlstatic.com/D_NQ_NP_2X_679076-MLA85094305106_052025-F.webp', rating: 5 },
  { src: 'https://http2.mlstatic.com/D_NQ_NP_2X_747714-MLA108806008359_032026-F.webp', rating: 4.8 },
  { src: 'https://http2.mlstatic.com/D_NQ_NP_2X_664255-MLA108035268118_032026-F.webp', rating: 5 },
  { src: 'https://http2.mlstatic.com/D_NQ_NP_2X_942512-MLA107970445025_032026-F.webp', rating: 4.7 },
];
const REVIEWS = [
  { initial: 'M', name: 'María L.', date: 'Mayo 2025', text: 'Excelente calidad de materiales, se nota que es resistente. La usé como equipaje de mano en mi último viaje y entró perfecto en el compartimento superior del avión.' },
  { initial: 'C', name: 'Carlos B.', date: 'Abril 2025', text: 'La calidad es muy buena! me sorprendió el espacio de guardado que tiene. Nunca más viajo con carry on. Buena tela, los cierres se los ve bien reforzados, lo mismo que las tiras de la mochila. Feliz con mi compra.' },
  { initial: 'V', name: 'Valentina P.', date: 'Marzo 2025', text: 'Súper cómoda y liviana, ideal para viajes cortos. Cumple todo lo que promete, aunque para viajes de más de una semana se queda algo corta de espacio.' },
];

const IDEAL_PARA = [
  'Viajes de 3 a 5 días en cabina',
  'Viajeros que quieren evitar el bodegaje',
  'Nómades digitales con laptop grande (hasta 17.3")',
  'Personas que prefieren viajar liviano',
];
const NO_IDEAL_PARA = [
  'Viajes de más de 7 días',
  'Quienes necesitan mucha organización interna',
  'Trekking o actividades al aire libre intensas',
  'Personas que cargan mucho equipo fotográfico',
];

const SUGERENCIAS = [
  { img: getPublicUrl('Imagenes', 'Mochila/sugerencia1.png'), cat: 'Mochilas de viaje', name: 'Mochila Tomtoc Classic 30L', price: '$145.000', rating: '4.6' },
  { img: getPublicUrl('Imagenes', 'Mochila/sugerencia2.png'), cat: 'Mochilas de viaje', name: 'Mochila Tomtoc Business 25L', price: '$132.900', rating: '4.7' },
  { img: getPublicUrl('Imagenes', 'Mochila/sugerencia3.png'), cat: 'Mochilas de viaje', name: 'Mochila Tomtoc Adventure 45L', price: '$198.500', rating: '4.8' },
];

const QA_QUESTIONS = [
  '¿De qué material está hecha?',
  '¿Tiene garantía?',
  'Classic vs Liteway: ¿cuál me conviene?',
  '¿Es resistente al agua?',
  '¿Tiene correa para el pecho?',
];

const COLORS = [
  { name: 'Verde', hex: '#3f5d47' },
  { name: 'Gris', hex: '#8a8a8a' },
  { name: 'Negro', hex: '#1c1c1c' },
  { name: 'Azul', hex: '#2c3e6b' },
];
const SIZES = ['28 L', '40 L'];

function Stars({ count = 5 }) {
  return <>{[...Array(count)].map((_, i) => <i key={i} className="ph-fill ph-star"></i>)}</>;
}

function AiBanner({ brand }) {
  return (
    <div className="mo-ai-banner">
      <div className="mo-ai-banner-head">
        <i className="ph ph-sparkle"></i>
        <p>¿Por qué {brand.bankName} te sugiere esta mochila?</p>
      </div>
      <p className="mo-ai-banner-text">Basado en tus búsquedas recientes y tu historial de compras, detectamos que buscás una solución de equipaje liviana para viajes cortos. Esta mochila entra como equipaje de mano en la mayoría de aerolíneas, pesa solo 1.07 kg y está entre las más compradas por perfiles similares al tuyo.</p>
      <div className="mo-ai-chips">
        {AI_FACTS_POSITIVE.map(f => (
          <span key={f} className="mo-ai-chip"><i className="ph ph-check"></i>{f}</span>
        ))}
        {AI_FACTS_NEGATIVE.map(f => (
          <span key={f} className="mo-ai-chip mo-ai-chip--warning"><i className="ph ph-warning"></i>{f}</span>
        ))}
      </div>
    </div>
  );
}

function ProductTabs() {
  const [tab, setTab] = useState('descripcion');
  return (
    <div className="mo-tabs">
      <div className="mo-tabs-bar">
        <button className={`mo-tab${tab === 'descripcion' ? ' active' : ''}`} onClick={() => setTab('descripcion')}>Descripción</button>
        <button className={`mo-tab${tab === 'caracteristicas' ? ' active' : ''}`} onClick={() => setTab('caracteristicas')}>Características</button>
        <button className={`mo-tab${tab === 'evaluaciones' ? ' active' : ''}`} onClick={() => setTab('evaluaciones')}>Evaluaciones (47)</button>
      </div>

      {tab === 'descripcion' && (
        <div className="mo-tab-panel">
          <p className="mo-description">La Navigator-T66 Liteway es la evolución de la mochila de viaje. Diseñada para reemplazar la valija de cabina (Carry-On), ofrece la capacidad máxima de 40 litros permitida por las aerolíneas, pero con un peso pluma de apenas 1.07 kg.</p>
          <p className="mo-description">A diferencia del modelo Classic, esta versión Liteway está fabricada con Nylon Ripstop de alta resistencia, un material técnico usado en paracaídas que le da durabilidad pero mucho más liviana. Con apertura tipo valija a 180°, compartimento dedicado para laptops de hasta 17.3" y aprobación IATA, es la mochila definitiva para viajes de 3 a 8 días sin pagar equipaje extra.</p>
          <p className="mo-includes-label">Incluye</p>
          <div className="mo-features-grid">
            <div className="mo-features-col">
              {FEATURES_COL1.map(f => <span key={f} className="mo-feature"><i className="ph ph-check"></i>{f}</span>)}
            </div>
            <div className="mo-features-col">
              {FEATURES_COL2.map(f => <span key={f} className="mo-feature"><i className="ph ph-check"></i>{f}</span>)}
            </div>
          </div>
        </div>
      )}

      {tab === 'caracteristicas' && (
        <div className="mo-tab-panel">
          <div className="mo-info-list">
            {INFO_LIST.map(item => (
              <div key={item.label} className="mo-info-item">
                <i className={`ph ${item.icon}`}></i>
                <span>{item.label}: <strong>{item.value}</strong></span>
              </div>
            ))}
          </div>
          <div className="mo-spec-tables">
            {SPEC_TABLES.map(table => (
              <div key={table.title} className="mo-spec-table">
                <p className="mo-spec-table-title">{table.title}</p>
                <div className="mo-spec-table-rows">
                  {table.rows.map(([label, value]) => (
                    <div key={label} className="mo-spec-table-row">
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'evaluaciones' && (
        <div className="mo-tab-panel">
          <div className="mo-reviews-head">
            <p className="mo-reviews-heading">Evaluaciones de producto <span>(184)</span></p>
          </div>
          <div className="mo-rating-summary">
            <span className="mo-rating-number">4.7</span>
            <div className="mo-rating-stars-big"><Stars /></div>
          </div>
          <div className="mo-review-tags">
            {REVIEW_TAGS.map(t => <span key={t} className="mo-review-tag">{t}</span>)}
          </div>
          <p className="mo-review-ai-summary"><i className="ph ph-sparkle"></i> {REVIEW_AI_SUMMARY}</p>

          <p className="mo-includes-label">Fotos y videos</p>
          <div className="mo-review-photos">
            {REVIEW_PHOTOS.map((photo, i) => (
              <div key={i} className="mo-review-photo" style={{ backgroundImage: `url(${photo.src})` }}>
                <span><i className="ph-fill ph-star"></i>{photo.rating}</span>
              </div>
            ))}
          </div>

          <div className="mo-reviews-list">
            {REVIEWS.map(r => (
              <div key={r.name} className="mo-review">
                <div className="mo-review-header">
                  <div className="mo-review-avatar">{r.initial}</div>
                  <span className="mo-review-name">{r.name}</span>
                  <span className="mo-review-date">{r.date}</span>
                  <span className="mo-review-stars"><Stars /></span>
                </div>
                <p className="mo-review-text">{r.text}</p>
              </div>
            ))}
          </div>
          <SecondaryButton style={{ width: '100%', marginTop: '8px' }} type="button">Ver 184 evaluaciones</SecondaryButton>
        </div>
      )}
    </div>
  );
}

function ComparisonCard() {
  return (
    <div className="mo-comparison">
      <div className="mo-comparison-head">
        <i className="ph ph-sparkle"></i>
        <p>Análisis hecho por IA</p>
      </div>
      <div className="mo-comparison-grid">
        <div className="mo-comparison-col">
          <p className="mo-comparison-title">Ideal para</p>
          {IDEAL_PARA.map(t => (
            <div key={t} className="mo-comparison-item"><i className="ph ph-check mo-comparison-check"></i><span>{t}</span></div>
          ))}
        </div>
        <div className="mo-comparison-col">
          <p className="mo-comparison-title">No tan ideal para</p>
          {NO_IDEAL_PARA.map(t => (
            <div key={t} className="mo-comparison-item"><i className="ph ph-x mo-comparison-x"></i><span>{t}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sugerencias() {
  return (
    <div className="mo-section-block">
      <h2 className="mo-section-title">Productos relacionados</h2>
      <div className="mo-sugerencias-track">
        {SUGERENCIAS.map(card => <TripCard key={card.name} card={card} variant="page" />)}
      </div>
    </div>
  );
}

function QASection() {
  const [query, setQuery] = useState('');
  return (
    <div className="mo-section-block">
      <h2 className="mo-section-title">Preguntas y respuestas</h2>
      <div className="mo-qa-search">
        <input
          type="text"
          placeholder="Hacé una pregunta sobre este producto..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="button" className="mo-qa-send-btn" disabled={!query.trim()} aria-label="Enviar pregunta">
          <i className="ph ph-paper-plane-right"></i>
        </button>
      </div>
      <div className="mo-qa-chips">
        {QA_QUESTIONS.map(q => (
          <button key={q} type="button" className="mo-qa-chip" onClick={() => setQuery(q)}>{q}</button>
        ))}
      </div>
    </div>
  );
}

function PriceBox({ brand, onBuy, hideTitle = false }) {
  const [color, setColor] = useState(COLORS[0].name);
  const [size, setSize] = useState('40 L');
  const [qty, setQty] = useState(1);
  const [delivery, setDelivery] = useState('envio');
  const install = Math.round(PRICE_CURRENT / INSTALLMENTS);
  const cashback = Math.round(PRICE_CURRENT * CASHBACK_PCT);

  return (
    <div className="mo-price-box">
      <div className="mo-price-badges">
        <span className="mo-badge mo-badge--promo">Recomendado</span>
        <span className="mo-badge mo-badge--info">Sin interés</span>
      </div>

      {!hideTitle && (
        <>
          <div className="mo-price-rating">
            <span className="mo-price-stars"><Stars /></span>
            <span className="mo-price-rating-num">4.8</span>
            <span className="mo-price-rating-sep">|</span>
            <span>47 evaluaciones</span>
            <span className="mo-price-rating-sep">|</span>
            <span>502 vendidos</span>
          </div>

          <p className="mo-price-title">Mochila de viaje Tomtoc, equipaje de mano aprobado para vuelos, moderna, minimalista</p>
        </>
      )}

      <div className="mo-price-block">
        <span className="mo-price-original">{fmtARS(PRICE_ORIGINAL)}</span>
        <div className="mo-price-main-row">
          <span className="mo-price-current">{fmtARS(PRICE_CURRENT)}</span>
          <span className="mo-price-off">30% Off</span>
        </div>
        <p className="mo-installments">{INSTALLMENTS} cuotas sin interés de <strong>{fmtARS(install)}</strong></p>
      </div>

      <div className="mo-payment-card">
        <div className="mo-payment-head">
          <i className="ph ph-sparkle"></i>
          <p>Mejor opción de pago para vos</p>
        </div>
        <div className="mo-payment-info">
          <div className="mo-payment-details">
            <span className="mo-payment-name">{brand.cardName} · 20% cashback</span>
            <span className="mo-payment-sub">Válido hasta fin de mes en toda la tienda</span>
          </div>
        </div>
        <div className="mo-cashback-info">
          <i className="ph ph-currency-circle-dollar"></i>
          <span>Recibís {fmtARS(cashback)} de reintegro en tu próximo resumen</span>
        </div>
      </div>

      <div className="mo-divider"></div>

      <div className="mo-field">
        <p className="mo-field-label">Color: <strong>{color}</strong></p>
        <div className="mo-swatches">
          {COLORS.map(c => (
            <button
              key={c.name}
              type="button"
              className={`mo-swatch${color === c.name ? ' active' : ''}`}
              style={{ background: c.hex }}
              aria-label={c.name}
              onClick={() => setColor(c.name)}
            />
          ))}
        </div>
      </div>

      <div className="mo-field">
        <p className="mo-field-label">Tamaño</p>
        <div className="mo-size-options">
          {SIZES.map(s => (
            <button key={s} type="button" className={`mo-size-chip${size === s ? ' active' : ''}`} onClick={() => setSize(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="mo-quantity-row">
        <span>Cantidad: <strong>{qty} unidad{qty !== 1 ? 'es' : ''}</strong></span>
        <div className="mo-stepper">
          <button type="button" className="mo-stepper-btn" disabled={qty <= 1} onClick={() => setQty(v => Math.max(1, v - 1))} aria-label="Menos"><i className="ph ph-minus"></i></button>
          <button type="button" className="mo-stepper-btn" disabled={qty >= 7} onClick={() => setQty(v => Math.min(7, v + 1))} aria-label="Más"><i className="ph ph-plus"></i></button>
        </div>
        <span className="mo-stock">7 disponibles</span>
      </div>

      <div className="mo-divider"></div>

      <div className="mo-delivery">
        <p className="mo-field-label">Forma de entrega</p>
        <div className="mo-delivery-options">
          <button type="button" className={`mo-delivery-option${delivery === 'envio' ? ' active' : ''}`} onClick={() => setDelivery('envio')}>
            <span className="mo-delivery-name">Envío</span>
            <span className="mo-delivery-sub">Llega el miércoles 29/07</span>
            <span className="mo-delivery-price">{fmtARS(8900)}</span>
          </button>
          <button type="button" className={`mo-delivery-option${delivery === 'pickup' ? ' active' : ''}`} onClick={() => setDelivery('pickup')}>
            <span className="mo-delivery-name">Retiro en sucursal</span>
            <span className="mo-delivery-sub">Entre el jueves y el lunes</span>
            <span className="mo-delivery-price mo-delivery-price--free">Gratis</span>
          </button>
        </div>
      </div>

      <div className="mo-price-actions">
        <PrimaryButton style={{ width: '100%' }} type="button" onClick={onBuy}>Comprar ahora</PrimaryButton>
        <SecondaryButton style={{ width: '100%' }} type="button">Agregar al carrito</SecondaryButton>
      </div>

      <div className="mo-purchase-meta">
        <div className="mo-purchase-meta-row"><i className="ph ph-storefront"></i><span>Vendido por <strong>Tomtoc Oficial</strong></span></div>
        <div className="mo-purchase-meta-row"><i className="ph ph-package"></i><span>Devolución gratuita hasta 30 días</span></div>
        <div className="mo-purchase-meta-row"><i className="ph ph-shield-check"></i><span>Compra segura · Privacidad protegida</span></div>
      </div>
    </div>
  );
}

export default function MochilaPage({ onOpenAssistant, onChatOpen }) {
  const brand = useBrand();
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [barHidden, setBarHidden] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setBarHidden(y > lastY && y > 60);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleBuy() {
    onChatOpen?.();
  }

  return (
    <>
      <div className={`mo-mobile-bar${barHidden ? ' mo-mobile-bar--hidden' : ''}`}>
        <Link to={brand.path('/para-tu-viaje')} className="mo-back-btn" aria-label="Volver">
          <i className="ph ph-arrow-left"></i>
        </Link>
        <span className="mo-bar-title">Mochila</span>
        <span className="mo-bar-actions">
          <button className="mo-bar-icon-btn" aria-label="Compartir"><i className="ph ph-share-network"></i></button>
        </span>
      </div>

      <div className="mo-main">
        <Header variant="page" title="Mochila" user={CURRENT_USER} onOpenAssistant={onOpenAssistant} />

        <Breadcrumb items={[
          { label: 'Inicio', to: brand.path('/') },
          { label: 'Para tu viaje', to: brand.path('/para-tu-viaje') },
          { label: 'Mochila' },
        ]} />

        <div className="mo-page">
          {/* Mobile gallery */}
          <div className="mo-gallery-mobile">
            <div className="mo-gallery-track" ref={trackRef} onScroll={() => {
              if (trackRef.current) {
                const idx = Math.round(trackRef.current.scrollLeft / trackRef.current.offsetWidth);
                setGalleryIdx(idx);
              }
            }}>
              {GALLERY_IMGS.map((img, i) => (
                <div key={i} className="mo-gallery-slide">
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
            <div className="mo-gallery-counter">{galleryIdx + 1} / {GALLERY_IMGS.length}</div>
            <div className="mo-gallery-actions">
              <FavButton className="mo-gallery-fav" />
              <button className="mo-gallery-share" aria-label="Compartir"><i className="ph ph-share-network"></i></button>
            </div>
          </div>

          <div className="mo-layout">
            <div className="mo-col-main">
              <div className="mo-gallery-desktop">
                <div className="mo-gallery-thumbs">
                  {GALLERY_IMGS.map((img, i) => (
                    <button key={i} className={`mo-thumb${i === galleryIdx ? ' active' : ''}`} onClick={() => setGalleryIdx(i)}>
                      <img src={img.src} alt={img.alt} />
                    </button>
                  ))}
                </div>
                <div className="mo-gallery-main">
                  <img src={GALLERY_IMGS[galleryIdx].src} alt={GALLERY_IMGS[galleryIdx].alt} />
                  <div className="mo-gallery-actions">
                    <FavButton className="mo-gallery-fav" />
                    <button className="mo-gallery-share" aria-label="Compartir"><i className="ph ph-share-network"></i></button>
                  </div>
                </div>
              </div>

              <div className="mo-info-top">
                <h1 className="mo-title">Mochila de viaje Tomtoc, equipaje de mano aprobado para vuelos, moderna, minimalista</h1>
                <div className="mo-meta-row">
                  <span className="mo-rating-chip"><i className="ph-fill ph-star"></i> 4.8 <span className="mo-rating-count">(47 evaluaciones)</span></span>
                  <span className="mo-sold">502 vendidos</span>
                </div>
                <p className="mo-vendor">Vendido por <a href="#" className="mo-vendor-link">Tomtoc Oficial</a></p>
              </div>

              <div className="mo-section-block"><AiBanner brand={brand} /></div>
              <div className="mo-section-block"><ProductTabs /></div>
              <div className="mo-section-block"><ComparisonCard /></div>
              <Sugerencias />
              <QASection />
            </div>

            <div className="mo-col-aside">
              <PriceBox brand={brand} onBuy={handleBuy} />
            </div>
          </div>

          {/* Mobile detail */}
          <div className="mo-mobile-detail">
            <h1 className="mo-title-mobile-sr">Mochila de viaje Tomtoc, equipaje de mano aprobado para vuelos, moderna, minimalista</h1>

            <div className="mo-price-box-mobile">
              <PriceBox brand={brand} onBuy={handleBuy} />
            </div>

            <AiBanner brand={brand} />
            <ProductTabs />
            <ComparisonCard />
            <Sugerencias />
            <QASection />
          </div>
        </div>
      </div>
    </>
  );
}
