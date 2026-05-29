import './ChatPanel.css';
import { useState, useRef, useEffect } from 'react';
import FaceID from '../FaceID';
import ChatHistory from './ChatHistory';

const STORE_OFFER = {
  img: 'https://static-catalog.tiendamia.com/marketplace_manager_service/production/product_62498b26_mirakl_image_1_large.jpg',
  name: 'Termo Stanley Classic Legendary',
  confirmName: 'Termo Stanley Classic',
  price: '$26.525',
  discount: '15% de descuento',
  cta: 'Comprar ahora (Puntos + 6 cuotas)',
};

const HOTEL_RESERVATION = {
  img: 'https://www.designsuites.com/images/bariloche/foto_33.jpg',
  name: 'Design Suites Bariloche',
  checkin: '26 jun 2026',
  checkout: '2 jul 2026',
  nights: '7 noches',
  guests: '1 adulto',
  room: 'Superior Lake View',
  price: '$1.200.500',
  installments: '12 cuotas sin interés de $100.041',
  reservationNum: 'RES-2026-4821',
};

const GENERIC_RESPONSES = [
  'Por ahora solo puedo ayudarte con lo que está en la tienda: productos, ofertas y tu forma de pago. ¿Buscás algo puntual?',
  'No llego a ayudarte con eso, pero puedo mostrarte lo que tenemos en oferta o armar el mejor combo de pago para lo que querés comprar.',
  'Eso se escapa un poco de lo mío. Si buscás un producto o querés aprovechar alguna promo, estoy para eso.',
];

const SUGGESTION_SETS = [
  ['Ver ofertas del día', 'Novedades en tecnología', 'Recomendaciones para vos'],
  ['Ver ofertas del día', 'Promos con tu tarjeta Galicia', 'Productos más vendidos'],
  ['Ver ofertas del día', 'Smartphones con descuento', 'Cuotas sin interés'],
];

function BotLabel() {
  return (
    <div className="chat-bot-label">
      <i className="ph ph-sparkle" style={{fontSize:'16px'}}></i> Hablemos
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="chat-typing chat-msg-enter">
      <span className="chat-typing-dot"></span>
      <span className="chat-typing-dot"></span>
      <span className="chat-typing-dot"></span>
    </div>
  );
}

const initOfferTab = () => ({ messages: [], inputVal: '', awaitingCvv: false, cvvError: false, showMoreDetail: false, isTyping: false, responseIdx: 0 });
const initHotelTab = () => ({ messages: [], inputVal: '', showMoreDetail: false, isTyping: false, responseIdx: 0 });

export default function ChatPanel({ open, onClose, variant = 'tienda', hotelTabOpen = false, onCloseHotelTab = () => {} }) {
  const [activeTabId, setActiveTabId] = useState('offer');
  const [tabData, setTabData] = useState({ offer: initOfferTab() });
  const [offerTabClosed, setOfferTabClosed] = useState(false);
  const [histOpen, setHistOpen] = useState(false);
  const [faceIdOpen, setFaceIdOpen] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const pendingTabIdRef = useRef(null);

  const td = tabData[activeTabId] || initOfferTab();

  function setTd(updates) {
    const id = activeTabId;
    setTabData(prev => ({ ...prev, [id]: { ...(prev[id] || {}), ...updates } }));
  }

  function addMessageTo(msg, tabId) {
    setTabData(prev => ({
      ...prev,
      [tabId]: { ...(prev[tabId] || {}), messages: [...(prev[tabId]?.messages || []), msg] }
    }));
  }

  useEffect(() => {
    if (hotelTabOpen) {
      setTabData(prev => ({ ...prev, hotel: initHotelTab() }));
      setActiveTabId('hotel');
      setOfferTabClosed(false);
    } else {
      setActiveTabId('offer');
      setOfferTabClosed(false);
    }
  }, [hotelTabOpen]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [tabData, activeTabId]);

  const isDesktop = () => window.innerWidth > 480;

  const activeVariant = activeTabId === 'hotel' ? 'hotel' : variant;
  const isHomeVariant = activeVariant === 'tienda';
  const isBankingVariant = activeVariant === 'banking';
  const isHotelVariant = activeVariant === 'hotel';

  function openCvvFlow(tabId) {
    const id = tabId || activeTabId;
    addMessageTo({ type: 'user', text: STORE_OFFER.cta }, id);
    addMessageTo({ type: 'bot', text: 'Para confirmar, ingresá el código de seguridad de tu tarjeta VISA terminada en 4567 (los 3 dígitos del dorso).' }, id);
    setTabData(prev => ({ ...prev, [id]: { ...(prev[id] || {}), awaitingCvv: true } }));
  }

  function submitCvv() {
    if (!td.awaitingCvv) return;
    const tabId = activeTabId;
    if (!/^\d{3}$/.test(td.inputVal.trim())) {
      setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], cvvError: true, inputVal: '' } }));
      setTimeout(() => {
        setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], cvvError: false } }));
      }, 1800);
      return;
    }
    setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], awaitingCvv: false, inputVal: '' } }));
    showPurchaseConfirmation(tabId);
  }

  function showPurchaseConfirmation(tabId) {
    const id = tabId || activeTabId;
    if (id === 'hotel') {
      addMessageTo({ type: 'reservation-confirm', reservation: HOTEL_RESERVATION }, id);
      addMessageTo({ type: 'bot', text: '¿Necesitás que te ayude en algo más?' }, id);
      addMessageTo({ type: 'suggestions', items: ['Ver mis reservas', 'Agregar servicios al hospedaje'] }, id);
    } else {
      addMessageTo({ type: 'purchase-confirm', product: STORE_OFFER }, id);
      addMessageTo({ type: 'bot', text: '¿Necesitás que te ayude en algo más?' }, id);
      addMessageTo({ type: 'suggestions', items: ['Ver mis pedidos', 'Seguir comprando'] }, id);
    }
  }

  function handleBuyAction() {
    const tabId = activeTabId;
    pendingTabIdRef.current = tabId;
    if (isDesktop()) {
      openCvvFlow(tabId);
    } else {
      setFaceIdOpen(true);
    }
  }

  function handleSend() {
    if (td.awaitingCvv) { submitCvv(); return; }
    const text = td.inputVal.trim();
    if (!text) return;
    const tabId = activeTabId;
    const idx = td.responseIdx;
    addMessageTo({ type: 'user', text }, tabId);
    setTabData(prev => ({
      ...prev,
      [tabId]: { ...(prev[tabId] || {}), inputVal: '', isTyping: true, responseIdx: idx + 1 }
    }));
    setTimeout(() => {
      setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: false } }));
      addMessageTo({ type: 'bot', text: GENERIC_RESPONSES[idx % GENERIC_RESPONSES.length] }, tabId);
      addMessageTo({ type: 'suggestions', label: 'Tal vez te interesa', items: SUGGESTION_SETS[idx % SUGGESTION_SETS.length] }, tabId);
    }, 750);
  }

  function handleSuggestionClick(text) {
    if (text.startsWith('Comprar ahora')) { handleBuyAction(); return; }
  }

  function handleSpecSheet() {
    const tabId = activeTabId;
    addMessageTo({ type: 'user', text: 'Ver ficha técnica del producto' }, tabId);
    setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: true } }));
    setTimeout(() => {
      setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: false } }));
      addMessageTo({ type: 'bot', text: 'El Stanley Classic Legendary es uno de los termos más vendidos del mundo. Acá te dejo todo:' }, tabId);
      addMessageTo({ type: 'spec-sheet' }, tabId);
      addMessageTo({ type: 'suggestions', items: [STORE_OFFER.cta, 'Recordármelo más tarde'] }, tabId);
    }, 800);
  }

  function handleReminder() {
    const tabId = activeTabId;
    addMessageTo({ type: 'user', text: 'Recordármelo más tarde' }, tabId);
    setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: true } }));
    setTimeout(() => {
      setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: false } }));
      addMessageTo({ type: 'reminder' }, tabId);
      addMessageTo({ type: 'suggestions', items: [STORE_OFFER.cta, 'Ver ficha técnica del producto'] }, tabId);
    }, 600);
  }

  const initialMessages = isHomeVariant ? (
    <>
      <BotLabel />
      <p className="chat-bot-text">Hola Sol. El termo que tenés en el carrito entró hoy en una acción especial de Tienda Galicia. Bajó un 15% de precio y además te armé una combinación de pago exclusiva para vos</p>
      <div className="chat-offer-card">
        <div className="chat-offer-title">Oferta imperdible</div>
        <div className="chat-offer-product">
          <img src={STORE_OFFER.img} alt={STORE_OFFER.name} className="chat-offer-img" />
          <div className="chat-offer-info">
            <span className="chat-offer-badge">{STORE_OFFER.discount}</span>
            <p className="chat-offer-name">{STORE_OFFER.name}</p>
            <p className="chat-offer-price">{STORE_OFFER.price}</p>
          </div>
        </div>
        <button className="chat-offer-buy" onClick={handleBuyAction}>{STORE_OFFER.cta}</button>
      </div>
      <div className="chat-suggestions">
        <div className="chat-suggestions-header">
          <i className="ph ph-sparkle" style={{fontSize:'20px',color:'var(--action-primary)'}}></i>
          <span>Sugerencias</span>
        </div>
        <div className="chat-suggestions-list">
          <button className="chat-suggestion-chip" onClick={() => { setTd({ showMoreDetail: true }); }}>
            <span>Más información</span>
            <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
          </button>
          <button className="chat-suggestion-chip" onClick={handleSpecSheet}>
            <span>Ver ficha técnica del producto</span>
            <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
          </button>
          <button className="chat-suggestion-chip" onClick={handleReminder}>
            <span>Recordármelo más tarde</span>
            <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
          </button>
        </div>
      </div>
    </>
  ) : isBankingVariant ? (
    <>
      <BotLabel />
      <p className="chat-bot-text">¡Hola Sol! Vi que tenés un viaje a Bariloche pronto. Te ayudo a encontrar el hospedaje ideal para tu estadía con las mejores opciones disponibles.</p>
      <div className="chat-offer-card">
        <div className="chat-suggestions-header">
          <i className="ph ph-sparkle" style={{fontSize:'20px',color:'var(--action-primary)'}}></i>
          <span>¿Qué estás buscando?</span>
        </div>
        <div className="chat-suggestions-list">
          {['Hoteles en el centro','Cabañas con vista al lago','Ver todos los hospedajes','Necesito más información'].map(s => (
            <button key={s} className="chat-suggestion-chip">
              <span>{s}</span>
              <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
            </button>
          ))}
        </div>
      </div>
    </>
  ) : (
    <>
      <BotLabel />
      <p className="chat-bot-text">Hola Sol. Reservá 7 noches en el Design Suites Bariloche y disfrutá de una experiencia única a orillas del Lago Nahuel Huapi.</p>
      <div className="chat-offer-card" id="hotelOfferCard">
        <div className="chat-offer-product">
          <img src="https://www.designsuites.com/images/bariloche/foto_33.jpg" alt="Design Suites Bariloche" className="chat-offer-img" style={{objectFit:'cover'}} />
          <div className="chat-offer-info">
            <span className="chat-offer-badge">15% OFF</span>
            <p className="chat-offer-name">Design Suites Bariloche</p>
            <p className="chat-offer-price">$1.200.500</p>
          </div>
        </div>
        <button className="chat-offer-buy" onClick={handleBuyAction}>Confirmar reserva</button>
        <button className="chat-offer-more" onClick={() => setTd({ showMoreDetail: true })}>Más información</button>
      </div>
    </>
  );

  return (
    <>
      <div className={`chat-panel${open ? ' open' : ''}`}>
        <div className="chat-panel-header">
          <div className="chat-mobile-header">
            <button className="chat-close-btn chat-back-btn" aria-label="Volver" onClick={onClose}>
              <i className="ph ph-arrow-left" style={{fontSize:'20px'}}></i>
            </button>
            <div className="chat-mobile-actions">
              <button className="chat-action-btn" onClick={() => setHistOpen(true)}>
                <span className="chat-action-icon"><i className="ph ph-clock-clockwise" style={{fontSize:'16px'}}></i></span>
                Historial
              </button>
              <button className="chat-action-btn">
                <span className="chat-action-icon"><i className="ph ph-plus" style={{fontSize:'16px'}}></i></span>
                Nuevo chat
              </button>
            </div>
          </div>
          <div className="chat-desktop-header">
            <div className="chat-header-identity">
              <div className="chat-header-avatar">
                <i className="ph ph-sparkle" style={{fontSize:'22px'}}></i>
              </div>
              <div className="chat-header-info">
                <span className="chat-header-name">Hablemos</span>
                <span className="chat-header-sub">Tienda Galicia</span>
              </div>
            </div>
            <div className="chat-header-right">
              <button className="chat-header-icon-btn" aria-label="Opciones" onClick={() => setShowOptionsMenu(v => !v)}>
                <i className="ph ph-dots-three-vertical" style={{fontSize:'20px'}}></i>
              </button>
              <button className="chat-close-btn chat-header-icon-btn" aria-label="Cerrar" onClick={onClose}>
                <i className="ph ph-x" style={{fontSize:'20px'}}></i>
              </button>
            </div>
          </div>
        </div>

        {showOptionsMenu && (
          <div className="chat-options-menu open">
            <button className="chat-options-item" onClick={() => { setHistOpen(true); setShowOptionsMenu(false); }}>
              <i className="ph ph-clock-clockwise" style={{fontSize:'16px'}}></i> Historial
            </button>
            <button className="chat-options-item" onClick={() => setShowOptionsMenu(false)}>
              <i className="ph ph-plus" style={{fontSize:'16px'}}></i> Nuevo chat
            </button>
          </div>
        )}

        {hotelTabOpen && !offerTabClosed && (
          <div className="chat-tabs">
            <button
              className={`chat-tab${activeTabId === 'offer' ? ' chat-tab--active' : ''}`}
              onClick={() => setActiveTabId('offer')}
            >
              <span>Oferta imperdible</span>
              <span className="chat-tab-close" onClick={e => { e.stopPropagation(); setOfferTabClosed(true); setActiveTabId('hotel'); }}>
                <i className="ph ph-x" style={{fontSize:'10px'}}></i>
              </span>
            </button>
            <button
              className={`chat-tab${activeTabId === 'hotel' ? ' chat-tab--active' : ''}`}
              onClick={() => setActiveTabId('hotel')}
            >
              <span>Reservar hospedaje</span>
              <span className="chat-tab-close" onClick={e => { e.stopPropagation(); onCloseHotelTab(); }}>
                <i className="ph ph-x" style={{fontSize:'10px'}}></i>
              </span>
            </button>
          </div>
        )}

        <ChatHistory open={histOpen} onClose={() => setHistOpen(false)} />

        <>
          <div className={`chat-messages${histOpen ? ' chat-messages--hidden' : ''}`} ref={messagesRef}>
            <div className="chat-messages-spacer" />
            {initialMessages}
            {td.showMoreDetail && isHomeVariant && (
              <div className="chat-more-detail" style={{display:'flex'}}>
                <p className="chat-bot-text">Con el 15% de descuento, el termo queda en $26.525. Además, veo que tenés 1.525 Puntos Galicia disponibles en tu cuenta. Si los aplicás, el total baja a $25.000.<br /><br />Para ese monto tenés preaprobadas 3 cuotas sin interés de $8.334 con tu Visa Galicia. El envío es gratis a tu domicilio en Palermo.</p>
                <div className="chat-suggestions">
                  <div className="chat-suggestions-header">
                    <i className="ph ph-sparkle" style={{fontSize:'20px',color:'var(--action-primary)'}}></i>
                    <span>Sugerencias</span>
                  </div>
                  <div className="chat-suggestions-list">
                    <button className="chat-suggestion-chip" onClick={handleBuyAction}>
                      <span>Comprar (Puntos + 3 cuotas sin interés)</span>
                      <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
                    </button>
                    <button className="chat-suggestion-chip" onClick={handleSpecSheet}>
                      <span>Ver ficha técnica del producto</span>
                      <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
                    </button>
                    <button className="chat-suggestion-chip" onClick={handleReminder}>
                      <span>Recordármelo más tarde</span>
                      <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {td.showMoreDetail && isHotelVariant && (
              <div className="chat-more-detail" style={{display:'flex'}}>
                <p className="chat-bot-text">Acá van los detalles de tu reserva:<br /><br />
                  📅 <strong>Fechas:</strong> 26 jun – 2 jul (7 noches)<br />
                  👤 <strong>Huéspedes:</strong> 1 adulto<br />
                  🍳 <strong>Incluye:</strong> desayuno buffet, WiFi, estacionamiento<br />
                  ✅ <strong>Cancelación gratuita</strong> hasta el 20 de junio<br /><br />
                  Podés pagarlo en <strong>12 cuotas sin interés de $199.560</strong> con tu tarjeta Galicia.
                </p>
                <div className="chat-suggestions">
                  <div className="chat-suggestions-header">
                    <i className="ph ph-sparkle" style={{fontSize:'20px',color:'var(--action-primary)'}}></i>
                    <span>Sugerencias</span>
                  </div>
                  <div className="chat-suggestions-list">
                    <button className="chat-suggestion-chip" onClick={handleBuyAction}>
                      <span>Confirmar reserva ahora</span>
                      <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
                    </button>
                    <button className="chat-suggestion-chip">
                      <span>Cambiar fechas</span>
                      <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {td.messages.map((msg, i) => {
              if (msg.type === 'user') return <div key={i} className="chat-user-bubble">{msg.text}</div>;
              if (msg.type === 'bot') return (
                <p key={i} className="chat-bot-text chat-msg-enter">{msg.text}</p>
              );
              if (msg.type === 'suggestions') return (
                <div key={i} className="chat-suggestions chat-msg-enter">
                  <div className="chat-suggestions-header">
                    <i className="ph ph-sparkle" style={{fontSize:'20px',color:'var(--action-primary)'}}></i>
                    <span>{msg.label || 'Sugerencias'}</span>
                  </div>
                  <div className="chat-suggestions-list">
                    {msg.items.map(s => (
                      <button key={s} className="chat-suggestion-chip" onClick={() => handleSuggestionClick(s)}>
                        <span>{s}</span>
                        <i className="ph ph-caret-right" style={{fontSize:'20px',flexShrink:0}}></i>
                      </button>
                    ))}
                  </div>
                </div>
              );
              if (msg.type === 'purchase-confirm') return (
                <div key={i}>
                  <p className="chat-confirm-label">Compraste {msg.product.confirmName}</p>
                  <div className="chat-confirm-card">
                    <div className="chat-confirm-header">
                      <i className="ph-fill ph-check-circle" style={{fontSize:'32px',color:'#22c55e'}}></i>
                      <p className="chat-confirm-title">Compra realizada con éxito</p>
                      <p className="chat-confirm-card-sub">Tarjeta VISA terminada en 4567</p>
                    </div>
                    <div className="chat-confirm-product">
                      <img className="chat-confirm-product-img" src={msg.product.img} alt={msg.product.name} />
                      <div className="chat-confirm-product-info">
                        <p className="chat-confirm-product-name">{msg.product.name}</p>
                        <p className="chat-confirm-product-price">{msg.product.price}</p>
                      </div>
                    </div>
                    <button className="chat-confirm-cta">Ir a mis compras</button>
                  </div>
                </div>
              );
              if (msg.type === 'reservation-confirm') {
                const r = msg.reservation;
                return (
                  <div key={i}>
                    <p className="chat-confirm-label">Reservaste {r.name}</p>
                    <div className="chat-confirm-card">
                      <div className="chat-confirm-header">
                        <i className="ph-fill ph-check-circle" style={{fontSize:'32px',color:'#22c55e'}}></i>
                        <p className="chat-confirm-title">Reserva confirmada</p>
                        <p className="chat-confirm-card-sub">Tarjeta VISA terminada en 4567</p>
                      </div>
                      <div className="chat-confirm-product">
                        <img className="chat-confirm-product-img" src={r.img} alt={r.name} style={{objectFit:'cover'}} />
                        <div className="chat-confirm-product-info">
                          <p className="chat-confirm-product-name">{r.name}</p>
                          <p className="chat-confirm-product-price" style={{fontSize:'12px',fontWeight:400,color:'var(--neutral-seven)'}}>{r.room}</p>
                        </div>
                      </div>
                      <div className="chat-confirm-res-rows">
                        <div className="chat-confirm-res-row"><span className="chat-confirm-res-key">Check-in</span><span className="chat-confirm-res-val">{r.checkin}</span></div>
                        <div className="chat-confirm-res-row"><span className="chat-confirm-res-key">Check-out</span><span className="chat-confirm-res-val">{r.checkout}</span></div>
                        <div className="chat-confirm-res-row"><span className="chat-confirm-res-key">Estadía</span><span className="chat-confirm-res-val">{r.nights} · {r.guests}</span></div>
                        <div className="chat-confirm-res-row chat-confirm-res-row--total"><span className="chat-confirm-res-key">Total</span><span className="chat-confirm-res-val chat-confirm-res-val--total">{r.price}</span></div>
                        <div className="chat-confirm-res-row"><span className="chat-confirm-res-key">Pago</span><span className="chat-confirm-res-val" style={{fontSize:'12px'}}>{r.installments}</span></div>
                        <div className="chat-confirm-res-row"><span className="chat-confirm-res-key">N° reserva</span><span className="chat-confirm-res-val" style={{fontSize:'12px',color:'var(--neutral-seven)'}}>{r.reservationNum}</span></div>
                      </div>
                      <button className="chat-confirm-cta">Ver mi reserva</button>
                    </div>
                  </div>
                );
              }
              if (msg.type === 'spec-sheet') return (
                <div key={i} className="chat-spec-card chat-msg-enter">
                  <div className="chat-spec-hd">
                    <p className="chat-spec-name">{STORE_OFFER.name}</p>
                    <p className="chat-spec-brand">Stanley · Modelo 10-01612-024</p>
                    <div className="chat-spec-rating">
                      <span className="chat-spec-stars">★★★★★</span>
                      <span className="chat-spec-rating-num">4.8</span>
                      <span className="chat-spec-rating-count">· 312 opiniones</span>
                    </div>
                    <div className="chat-spec-pills">
                      <span className="chat-spec-pill warranty"><i className="ph ph-shield-check" style={{fontSize:'10px'}}></i> Garantía vitalicia</span>
                      <span className="chat-spec-pill bpa">Sin BPA</span>
                      <span className="chat-spec-pill bpa">Acero 18/8</span>
                    </div>
                  </div>
                  <div className="chat-spec-temps">
                    <div className="chat-spec-temp-badge hot"><i className="ph ph-fire"></i><div><strong>24 hs</strong><span>caliente</span></div></div>
                    <div className="chat-spec-temp-divider"></div>
                    <div className="chat-spec-temp-badge cold"><i className="ph ph-snowflake"></i><div><strong>24 hs</strong><span>frío</span></div></div>
                    <div className="chat-spec-temp-divider"></div>
                    <div className="chat-spec-temp-badge ice"><i className="ph ph-snowflake"></i><div><strong>4 días</strong><span>hielo</span></div></div>
                  </div>
                  <div className="chat-spec-section">
                    <div className="chat-spec-section-label">Dimensiones</div>
                    <div className="chat-spec-grid">
                      {[['Capacidad','1.9 L'],['Altura','26 cm'],['Peso','540 g'],['Diámetro','9.5 cm'],['Tapa','237 ml'],['Boca','Estándar']].map(([k,v]) => (
                        <div key={k} className="chat-spec-cell"><span className="chat-spec-cell-label">{k}</span><span className="chat-spec-cell-value">{v}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="chat-spec-section">
                    <div className="chat-spec-section-label">Construcción</div>
                    <div className="chat-spec-rows">
                      {[['Cuerpo','Acero inoxidable 18/8'],['Tapa','Acero inoxidable'],['Aislación','Doble pared al vacío'],['Apto lavavajillas','No'],['Color','Hammertone Green']].map(([k,v]) => (
                        <div key={k} className="chat-spec-row"><span className="chat-spec-row-key">{k}</span><span className={`chat-spec-row-val${k==='Apto lavavajillas'?' chat-spec-row-val--no':''}`}>{v}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              );
              if (msg.type === 'reminder') return (
                <div key={i} className="chat-reminder-confirm chat-msg-enter">
                  <div className="chat-reminder-top">
                    <div className="chat-reminder-icon-wrap"><i className="ph ph-bell-ringing" style={{fontSize:'16px'}}></i></div>
                    <div>
                      <p className="chat-reminder-title">Recordatorio programado</p>
                      <p className="chat-reminder-subtitle">También te avisamos si el precio baja</p>
                    </div>
                  </div>
                  <div className="chat-reminder-time">
                    <i className="ph ph-clock"></i>
                    <span className="chat-reminder-time-text">Mañana 22/05 · 10:00 hs · {STORE_OFFER.confirmName}</span>
                  </div>
                </div>
              );
              return null;
            })}
            {td.isTyping && <TypingIndicator />}
          </div>

          <div className={`chat-input-bar${histOpen ? ' chat-input-bar--hidden' : ''}`} id="chatMainInputBar">
            <input
              ref={inputRef}
              type={td.awaitingCvv ? 'password' : 'text'}
              inputMode={td.awaitingCvv ? 'numeric' : undefined}
              maxLength={td.awaitingCvv ? 3 : undefined}
              className="chat-input"
              style={td.cvvError ? {borderColor:'var(--promotion-primary)'} : {}}
              placeholder={td.awaitingCvv ? (td.cvvError ? 'Ingresá 3 dígitos' : 'Código de 3 dígitos...') : '¿En qué te ayudo hoy?'}
              value={td.inputVal}
              onChange={e => setTd({ inputVal: e.target.value })}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <button className="chat-mic-btn" aria-label="Enviar" onClick={handleSend}>
              <i className={`ph ${td.inputVal.trim() || td.awaitingCvv ? 'ph-paper-plane-right' : 'ph-microphone'}`} style={{fontSize:'20px'}}></i>
            </button>
          </div>
        </>
      </div>

      <FaceID
        open={faceIdOpen}
        onDeny={() => setFaceIdOpen(false)}
        onSuccess={() => { setFaceIdOpen(false); showPurchaseConfirmation(pendingTabIdRef.current); }}
      />
    </>
  );
}
