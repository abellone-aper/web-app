import { useState, useRef, useId, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hospedaje.css';
import { CURRENT_USER } from '../../lib/currentUser';
import { getPublicUrl } from '../../lib/storage';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import FavButton from '../../components/Buttons/FavButton';
import DateRangePicker from '../../components/DateRangePicker';
import { useBrand } from '../../brands/BrandContext';

const GALLERY_IMGS = [
  { src: getPublicUrl('Imagenes', 'Hospedaje/1.jpg'), alt: 'Habitación' },
  { src: getPublicUrl('Imagenes', 'Hospedaje/2.jpg'), alt: 'Vista lago' },
  { src: getPublicUrl('Imagenes', 'Hospedaje/3.jpg'), alt: 'Vista' },
  { src: getPublicUrl('Imagenes', 'Hospedaje/4.jpg'), alt: 'Vista' },
  { src: getPublicUrl('Imagenes', 'Hospedaje/5.jpg'), alt: 'Vista' },
];

const MONTHS_SHORT = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const ROOM_PRICES = {
  doble:       { current: 171500, original: 245000 },
  extragrande: { current: 210000, original: 300000 },
  suite:       { current: 295000, original: 421500 },
};
const INSTALLMENTS = 12;
const EXTRA_GUEST_RATE = 12000;

function fmtARS(n) {
  return '$' + n.toLocaleString('es-AR');
}


function BookingWidget({ onReserve }) {
  const uid = useId();
  const [guestCount, setGuestCount] = useState(1);
  const [nights, setNights] = useState(7);
  const [dateLabel, setDateLabel] = useState('26 jun – 2 jul (7 noches)');
  const [calOpen, setCalOpen] = useState(false);
  const [roomType, setRoomType] = useState('doble');
  const suffix = nights !== 1 ? 's' : '';
  const { current: pricePerNight, original: origPerNight } = ROOM_PRICES[roomType];
  const total = pricePerNight * nights * guestCount;
  const install = Math.round(total / INSTALLMENTS);

  function handleCalConfirm(start, end, n) {
    setNights(n);
    setDateLabel(`${start.getDate()} ${MONTHS_SHORT[start.getMonth()]} – ${end.getDate()} ${MONTHS_SHORT[end.getMonth()]} (${n} noche${n !== 1 ? 's' : ''})`);
  }

  return (
    <div className="hd-booking-card">
      <span className="hd-poff-tag">30% Off</span>
      <div className="hd-price-block">
        <span className="hd-price-original">{fmtARS(origPerNight)}</span>
        <div className="hd-price-main-row">
          <span className="hd-price-current">{fmtARS(pricePerNight)}</span>
          <span className="hd-pn-unit">/ noche</span>
        </div>
        <p className="hd-installments">{INSTALLMENTS} cuotas sin interés de <strong>{fmtARS(install)}</strong></p>
      </div>
      <div className="hd-booking-divider"></div>

      <div className="hd-field">
        <label className="hd-field-label">Elegí las fechas</label>
        <button className="hd-dropdown" type="button" onClick={() => setCalOpen(v => !v)}>
          <span>{dateLabel}</span>
          <i className="ph ph-caret-down"></i>
        </button>
        {calOpen && (
          <DateRangePicker
            startDate={new Date(2026,5,26)}
            endDate={new Date(2026,6,2)}
            onConfirm={handleCalConfirm}
            onClose={() => setCalOpen(false)}
          />
        )}
      </div>

      <div className="hd-field">
        <label className="hd-field-label">Tipo de habitación</label>
        <div className="hd-room-options">
          {[
            { value:'doble', name:'Habitación Doble Estándar', sub:'1 cama doble', tags:['28m²','Vista al lago'] },
            { value:'extragrande', name:'Habitación Cama Extragrande', sub:'1 cama doble extragrande', tags:['28m²','Vista montaña'] },
            { value:'suite', name:'Suite Superior', sub:'1 cama doble + sala de estar, jacuzzi y terraza privada', tags:['28m²','Panorámica'] },
          ].map(opt => (
            <label key={opt.value} className="hd-room-option">
              <input type="radio" name={`roomType_${uid}`} value={opt.value} checked={roomType === opt.value} className="hd-room-radio" onChange={() => setRoomType(opt.value)} />
              <div className="hd-room-option-body">
                <div className="hd-room-text">
                  <span className="hd-room-name">{opt.name}</span>
                  <span className="hd-room-sub">{opt.sub}</span>
                </div>
                <div className="hd-room-tags">{opt.tags.map(t => <span key={t} className="hd-room-tag">{t}</span>)}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="hd-field">
        <label className="hd-field-label">Cantidad de huéspedes</label>
        <div className="hd-stepper">
          <button className="hd-stepper-btn hd-stepper-less" type="button" aria-label="Menos" disabled={guestCount <= 1} onClick={() => setGuestCount(v => Math.max(1, v - 1))}>
            <i className="ph ph-minus"></i>
          </button>
          <span className="hd-stepper-value">{guestCount}</span>
          <button className="hd-stepper-btn hd-stepper-more" type="button" aria-label="Más" disabled={guestCount >= 8} onClick={() => setGuestCount(v => Math.min(8, v + 1))}>
            <i className="ph ph-plus"></i>
          </button>
        </div>
      </div>

      <div className="hd-breakdown">
        <div className="hd-bd-row">
          <span>{fmtARS(pricePerNight)} × {nights} noche{suffix}{guestCount > 1 ? ` × ${guestCount} huéspedes` : ''}</span>
          <span>{fmtARS(total)}</span>
        </div>
        <div className="hd-bd-sep"></div>
        <div className="hd-bd-row hd-bd-total">
          <span>Total</span>
          <strong>{fmtARS(total)}</strong>
        </div>
      </div>

      <PrimaryButton style={{width:'100%'}} type="button" onClick={onReserve}>Reservar</PrimaryButton>
    </div>
  );
}

const REVIEWS = [
  { initial:'M', name:'María L.', date:'Mayo 2025', text:'Espectacular. La vista al lago desde la terraza es inigualable. El desayuno buffet tiene de todo y el personal es super atento. ¡Ya quiero volver!' },
  { initial:'C', name:'Carlos B.', date:'Abril 2025', text:'La habitación fue un lujo. Muy bien ubicado, a pocos minutos del centro en auto. La piscina climatizada fue un plus ideal para el frío de Bariloche.' },
  { initial:'V', name:'Valentina P.', date:'Marzo 2025', text:'Fui con mi pareja para nuestra luna de miel y superó todas las expectativas. El spa es increíble. Definitivamente el mejor hotel de Bariloche.' },
];

const INCLUDES = [
  { icon:'ph ph-coffee', label:'Desayuno buffet' },
  { icon:'ph ph-wifi-high', label:'WiFi gratuito' },
  { icon:'ph ph-car', label:'Estacionamiento' },
  { icon:'ph ph-waves', label:'Piscina' },
  { icon:'ph ph-flower', label:'Spa' },
  { icon:'ph ph-fork-knife', label:'Restaurante' },
];

const AMENITIES = ['Aire acondicionado','TV pantalla plana','Caja de seguridad','Minibar','Servicio de habitaciones 24 hs','Terraza privada','Vista al lago','Concierge'];

const RATING_BARS = [
  { label:'Limpieza', val:'4.8', pct:'96%' },
  { label:'Ubicación', val:'5.0', pct:'100%' },
  { label:'Atención', val:'5.0', pct:'100%' },
  { label:'Valor', val:'4.6', pct:'92%' },
];

function Stars({ count = 5 }) {
  return <>{[...Array(count)].map((_, i) => <i key={i} className="ph-fill ph-star"></i>)}</>;
}

function HotelInfo({ onReserve, galleryIdx, setGalleryIdx }) {
  return (
    <div className="hd-info">
      <div className="hd-gallery-desktop">
        <div className="hd-gallery-main">
          <img src={GALLERY_IMGS[galleryIdx].src} alt={GALLERY_IMGS[galleryIdx].alt} id="desktopMainImg" />
          <span className="hd-gallery-badge">{galleryIdx + 1} / {GALLERY_IMGS.length}</span>
        </div>
        <div className="hd-gallery-thumbs">
          {GALLERY_IMGS.map((img, i) => (
            <button key={i} className={`hd-thumb${i === galleryIdx ? ' active' : ''}`} onClick={() => setGalleryIdx(i)}>
              <img src={img.src} alt={img.alt} />
            </button>
          ))}
        </div>
      </div>

      <div className="hd-col-aside">
        <BookingWidget onReserve={onReserve} />
      </div>

      <div className="hd-info-top">
        <div className="hd-stars"><Stars /> <span>Hotel 5 estrellas</span></div>
        <h1 className="hd-hotel-name">Design Suites Bariloche</h1>
        <div className="hd-meta-row">
          <span className="hd-location"><i className="ph ph-map-pin"></i> San Carlos de Bariloche, Río Negro</span>
          <span className="hd-rating-chip"><i className="ph-fill ph-star"></i> 5.0 <span className="hd-rating-count">(47 reseñas)</span></span>
        </div>
        <p className="hd-vendor">Vendido por <a href="#" className="hd-vendor-link">Radisson</a></p>
      </div>

      <div className="hd-section">
        <h2 className="hd-section-title">Sobre el hospedaje</h2>
        <p className="hd-description">El Design Suites Bariloche está ubicado a orillas del Lago Nahuel Huapi, ofreciendo vistas panorámicas a las montañas de la Patagonia. Cada habitación fue diseñada con materiales nobles y cuenta con terraza privada. A solo 5 minutos del centro de Bariloche, es el punto ideal para explorar la región.</p>
        <p className="hd-description">Desayuno buffet incluido</p>
      </div>

      <div className="hd-section">
        <h2 className="hd-section-title">Horarios de alojamiento</h2>
        <div className="hd-schedule-list">
          <div className="hd-schedule-item"><i className="ph ph-door-open"></i><span>Horario de Check in: de 14:00 a 05:30</span></div>
          <div className="hd-schedule-item"><i className="ph ph-door"></i><span>Horario de Check out: 10:00</span></div>
          <div className="hd-schedule-item"><i className="ph ph-coffee"></i><span>Desayuno: De 07:00 a 11:00</span></div>
        </div>
      </div>

      <div className="hd-section">
        <h2 className="hd-section-title">Lo que incluye</h2>
        <div className="hd-includes-grid">
          {INCLUDES.map(item => (
            <div key={item.label} className="hd-include-item">
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hd-section">
        <h2 className="hd-section-title">Servicios y comodidades</h2>
        <div className="hd-amenities-list">
          {AMENITIES.map(a => <span key={a} className="hd-amenity"><i className="ph ph-check"></i> {a}</span>)}
        </div>
      </div>

      <div className="hd-section">
        <h2 className="hd-section-title">Política de cancelación</h2>
        <div className="hd-policy-card">
          <i className="ph-fill ph-check-circle hd-policy-icon"></i>
          <div>
            <p className="hd-policy-title">Cancelación gratuita hasta el 20 de junio</p>
            <p className="hd-policy-desc">Después de esa fecha se aplica un cargo equivalente a 1 noche.</p>
          </div>
        </div>
      </div>

      <div className="hd-section">
        <h2 className="hd-section-title">Reseñas de huéspedes</h2>
        <div className="hd-rating-summary">
          <div className="hd-rating-big">
            <span className="hd-rating-number">5.0</span>
            <div className="hd-rating-stars-big"><Stars /></div>
            <span className="hd-rating-total">47 reseñas</span>
          </div>
          <div className="hd-rating-bars">
            {RATING_BARS.map(rb => (
              <div key={rb.label} className="hd-rating-bar-row">
                <span>{rb.label}</span>
                <div className="hd-bar"><div className="hd-bar-fill" style={{width:rb.pct}}></div></div>
                <span>{rb.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hd-reviews-list">
          {REVIEWS.map(r => (
            <div key={r.name} className="hd-review">
              <div className="hd-review-header">
                <div className="hd-review-avatar">{r.initial}</div>
                <div className="hd-review-meta">
                  <span className="hd-review-name">{r.name}</span>
                  <span className="hd-review-date">{r.date}</span>
                </div>
                <div className="hd-review-stars"><Stars /></div>
              </div>
              <p className="hd-review-text">{r.text}</p>
            </div>
          ))}
        </div>
        <SecondaryButton style={{width:'100%', marginTop:'16px'}} type="button">Ver 47 comentarios</SecondaryButton>
      </div>
    </div>
  );
}

export default function DesignSuitesPage({ onChatOpen, onOpenAssistant }) {
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

  function goGallery(idx) {
    const newIdx = ((idx % GALLERY_IMGS.length) + GALLERY_IMGS.length) % GALLERY_IMGS.length;
    setGalleryIdx(newIdx);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: newIdx * trackRef.current.offsetWidth, behavior: 'smooth' });
    }
  }

  function handleReserve() {
    onChatOpen?.();
  }

  return (
    <>
      <div className={`hd-mobile-bar${barHidden ? ' hd-mobile-bar--hidden' : ''}`}>
        <Link to={brand.path('/para-tu-viaje')} className="hd-back-btn" aria-label="Volver">
          <i className="ph ph-arrow-left"></i>
        </Link>
        <span className="hd-bar-title">Hospedaje</span>
        <span className="hd-bar-actions">
          <button className="hd-bar-icon-btn" aria-label="Compartir"><i className="ph ph-share-network"></i></button>
        </span>
      </div>

      <div className="hd-main">
        <Header variant="page" title="Hospedaje" user={CURRENT_USER} onOpenAssistant={onOpenAssistant} />

        <Breadcrumb items={[
          { label: 'Inicio', to: brand.path('/') },
          { label: 'Para tu viaje', to: brand.path('/para-tu-viaje') },
          { label: 'Design Suites Bariloche' },
        ]} />

        <div className="hd-page">
          {/* Mobile gallery */}
          <div className="hd-gallery-mobile">
            <div className="hd-gallery-track" ref={trackRef} onScroll={() => {
              if (trackRef.current) {
                const idx = Math.round(trackRef.current.scrollLeft / trackRef.current.offsetWidth);
                setGalleryIdx(idx);
              }
            }}>
              {GALLERY_IMGS.map((img, i) => (
                <div key={i} className="hd-gallery-slide">
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
            <div className="hd-gallery-counter">{galleryIdx + 1} / {GALLERY_IMGS.length}</div>
          </div>

          <div className="hd-layout">
            <div className="hd-col-main">
              <HotelInfo onReserve={handleReserve} galleryIdx={galleryIdx} setGalleryIdx={setGalleryIdx} />
            </div>
          </div>

          {/* Mobile detail */}
          <div className="hd-mobile-detail">
            <div className="hd-mobile-title-row">
              <h1 className="hd-hotel-name-mobile">Design Suites Bariloche</h1>
              <FavButton className="hd-fav-btn hd-fav-toggle" />
            </div>
            <p className="hd-vendor-mobile">Vendido por <a href="#" className="hd-vendor-link">Radisson</a></p>
            <div className="hd-meta-row-mobile">
              <span className="hd-location"><i className="ph ph-map-pin"></i> Bariloche, Río Negro</span>
              <span className="hd-rating-chip"><i className="ph-fill ph-star"></i> 5.0 <span className="hd-rating-count">(47)</span></span>
            </div>

            <div className="hd-price-box-mobile">
              <BookingWidget onReserve={handleReserve} />
            </div>

            <div className="hd-mobile-info">
              <div className="hd-section">
                <h2 className="hd-section-title">Sobre el hospedaje</h2>
                <p className="hd-description">El Design Suites Bariloche está ubicado a orillas del Lago Nahuel Huapi, ofreciendo vistas panorámicas a las montañas de la Patagonia. Cada habitación fue diseñada con materiales nobles y cuenta con terraza privada.</p>
              </div>
              <div className="hd-section">
                <h2 className="hd-section-title">Lo que incluye</h2>
                <div className="hd-includes-grid">
                  {INCLUDES.map(item => (
                    <div key={item.label} className="hd-include-item">
                      <i className={item.icon}></i><span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hd-section">
                <h2 className="hd-section-title">Política de cancelación</h2>
                <div className="hd-policy-card">
                  <i className="ph-fill ph-check-circle hd-policy-icon"></i>
                  <div>
                    <p className="hd-policy-title">Cancelación gratuita hasta el 20 de junio</p>
                    <p className="hd-policy-desc">Después de esa fecha se aplica un cargo equivalente a 1 noche.</p>
                  </div>
                </div>
              </div>
              <div className="hd-section">
                <h2 className="hd-section-title">Reseñas de huéspedes</h2>
                <div className="hd-reviews-list">
                  {REVIEWS.map(r => (
                    <div key={r.name} className="hd-review">
                      <div className="hd-review-header">
                        <div className="hd-review-avatar">{r.initial}</div>
                        <div className="hd-review-meta">
                          <span className="hd-review-name">{r.name}</span>
                          <span className="hd-review-date">{r.date}</span>
                        </div>
                        <div className="hd-review-stars"><Stars /></div>
                      </div>
                      <p className="hd-review-text">{r.text}</p>
                    </div>
                  ))}
                </div>
                <SecondaryButton style={{width:'100%', marginTop:'16px'}} type="button">Ver 47 comentarios</SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
