import './ChatPanel.css';
import { useState, useRef, useEffect } from 'react';
import FaceID from '../FaceID';
import ChatHistory from './ChatHistory';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatOffer from './ChatOffer';
import ChatSuggestions from './ChatSuggestions';
import ChatMessage from './ChatMessage';
import ChatProductDetails from './ChatProductDetails';
import ChatSuccessfulOrder from './ChatSuccessfulOrder';
import ChatCvvCard from './ChatCvvCard';
import PrimaryButton from '../Buttons/PrimaryButton';
import ChatUserBubble from './ChatUserBubble';


const STORE_OFFER = {
  img: 'https://static-catalog.tiendamia.com/marketplace_manager_service/production/product_62498b26_mirakl_image_1_large.jpg',
  name: 'Termo Stanley Classic Legendary',
  confirmName: 'Termo Stanley Classic',
  price: '$26.525',
  discount: '15% de descuento',
  cta: 'Comprar ahora',
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

function TypingIndicator() {
  return (
    <div className="chat-typing chat-msg-enter">
      <span className="chat-typing-dot"></span>
      <span className="chat-typing-dot"></span>
      <span className="chat-typing-dot"></span>
    </div>
  );
}

const initOfferTab = () => ({ messages: [], inputVal: '', awaitingCvv: false, cvvError: false, isTyping: false, responseIdx: 0 });
const initHotelTab = () => ({ messages: [], inputVal: '', isTyping: false, responseIdx: 0 });

export default function ChatPanel({ open, onClose, variant = 'tienda', hotelTabOpen = false, onCloseHotelTab = () => {} }) {
  const [activeTabId, setActiveTabId] = useState('offer');
  const [tabData, setTabData] = useState({ offer: initOfferTab() });
  const [offerTabClosed, setOfferTabClosed] = useState(false);
  const [histOpen, setHistOpen] = useState(false);
  const [histDetailTitle, setHistDetailTitle] = useState(null);
  const [backToListSignal, setBackToListSignal] = useState(0);
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

  const currentMessages = tabData[activeTabId]?.messages;
  const currentIsTyping = tabData[activeTabId]?.isTyping;

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    const t = setTimeout(() => { el.scrollTop = el.scrollHeight; }, 50);
    return () => clearTimeout(t);
  }, [currentMessages, currentIsTyping, activeTabId]);

  const isDesktop = () => window.innerWidth > 480;

  const activeVariant = activeTabId === 'hotel' ? 'hotel' : variant;
  const isHomeVariant = activeVariant === 'tienda';
  const isBankingVariant = activeVariant === 'banking';
  const isHotelVariant = activeVariant === 'hotel';

  const specSheetSent = td.messages.some(m => m.type === 'spec-sheet');
  const purchaseDone = td.messages.some(m => m.type === 'purchase-confirm' || m.type === 'reservation-confirm');
  const moreDetailDone = td.messages.some(m => m.type === 'more-detail' || m.type === 'more-detail-hotel');
  const buyDisabled = purchaseDone || td.awaitingCvv || faceIdOpen;

  function openCvvFlow(tabId) {
    const id = tabId || activeTabId;
    addMessageTo({ type: 'user', text: STORE_OFFER.cta }, id);
    setTabData(prev => ({ ...prev, [id]: { ...(prev[id] || {}), isTyping: true } }));
    setTimeout(() => {
      setTabData(prev => ({ ...prev, [id]: { ...prev[id], isTyping: false } }));
      addMessageTo({ type: 'bot', text: 'Para confirmar, ingresá el código de seguridad de tu tarjeta VISA terminada en 4567 (los 3 dígitos del dorso).' }, id);
      addMessageTo({ type: 'cvv-card' }, id);
      setTabData(prev => ({ ...prev, [id]: { ...(prev[id] || {}), awaitingCvv: true } }));
    }, 750);
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
    setTabData(prev => ({ ...prev, [id]: { ...(prev[id] || {}), isTyping: true } }));
    setTimeout(() => {
      setTabData(prev => ({ ...prev, [id]: { ...prev[id], isTyping: false } }));
      if (id === 'hotel') {
        addMessageTo({ type: 'reservation-confirm', reservation: HOTEL_RESERVATION }, id);
        addMessageTo({ type: 'bot', text: '¿Necesitás que te ayude en algo más?' }, id);
        addMessageTo({ type: 'suggestions', items: ['Ver mis reservas', 'Agregar servicios al hospedaje'] }, id);
      } else {
        addMessageTo({ type: 'purchase-confirm', product: STORE_OFFER }, id);
        addMessageTo({ type: 'bot', text: '¿Necesitás que te ayude en algo más?' }, id);
        addMessageTo({ type: 'suggestions', items: ['Ver productos similares', 'Ver más ofertas'] }, id);
      }
    }, 750);
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

  function sendTextAsMessage(text) {
    const tabId = activeTabId;
    const idx = tabData[tabId]?.responseIdx ?? 0;
    addMessageTo({ type: 'user', text }, tabId);
    setTabData(prev => ({
      ...prev,
      [tabId]: { ...(prev[tabId] || {}), isTyping: true, responseIdx: idx + 1 }
    }));
    setTimeout(() => {
      setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: false } }));
      addMessageTo({ type: 'bot', text: GENERIC_RESPONSES[idx % GENERIC_RESPONSES.length] }, tabId);
      addMessageTo({ type: 'suggestions', label: 'Tal vez te interesa', items: SUGGESTION_SETS[idx % SUGGESTION_SETS.length] }, tabId);
    }, 750);
  }

  function handleSend() {
    if (td.awaitingCvv) { submitCvv(); return; }
    const text = td.inputVal.trim();
    if (!text) return;
    setTd({ inputVal: '' });
    sendTextAsMessage(text);
  }

  function handleSuggestionClick(text) {
    if (text.startsWith('Comprar ahora') || text === 'Confirmar reserva ahora') { handleBuyAction(); return; }
    sendTextAsMessage(text);
  }

  function handleMoreDetail() {
    const tabId = activeTabId;
    const type = tabId === 'hotel' ? 'more-detail-hotel' : 'more-detail';
    addMessageTo({ type: 'user', text: 'Más información' }, tabId);
    setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: true } }));
    setTimeout(() => {
      setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: false } }));
      addMessageTo({ type }, tabId);
    }, 750);
  }

  function handleSpecSheet() {
    const tabId = activeTabId;
    addMessageTo({ type: 'user', text: 'Ver ficha técnica del producto' }, tabId);
    setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: true } }));
    setTimeout(() => {
      setTabData(prev => ({ ...prev, [tabId]: { ...prev[tabId], isTyping: false } }));
      addMessageTo({ type: 'bot', text: 'El Stanley Classic Legendary es uno de los termos más vendidos del mundo. Acá te dejo todo:' }, tabId);
      addMessageTo({ type: 'spec-sheet' }, tabId);
      addMessageTo({ type: 'suggestions', items: [STORE_OFFER.cta] }, tabId);
    }, 800);
  }

  const initialMessages = isHomeVariant ? (
    <>
      <ChatMessage label="Tienda">Hola Sol. El termo que tenés en el carrito entró hoy en una acción especial de Tienda Galicia. Bajó un 15% de precio y además te armé una combinación de pago exclusiva para vos</ChatMessage>
      <ChatOffer variant="tienda" onBuy={handleBuyAction} buyDisabled={buyDisabled} moreDetailDisabled={moreDetailDone || td.isTyping} onMoreDetail={handleMoreDetail} />
      {td.messages.length === 0 && !td.isTyping && (
        <ChatSuggestions items={[
          { label: 'Más información', onClick: handleMoreDetail },
          { label: 'Ver ficha técnica del producto', onClick: handleSpecSheet },
        ]} />
      )}
    </>
  ) : isBankingVariant ? (
    <>
      <ChatMessage label="Tienda">¡Hola Sol! Vi que tenés un viaje a Bariloche pronto. Te ayudo a encontrar el hospedaje ideal para tu estadía con las mejores opciones disponibles.</ChatMessage>
      <ChatOffer variant="banking" />
    </>
  ) : (
    <>
      <ChatMessage label="Tienda">Hola Sol. Reservá 7 noches en el Design Suites Bariloche y disfrutá de una experiencia única a orillas del Lago Nahuel Huapi.</ChatMessage>
      <ChatOffer variant="hotel" onBuy={handleBuyAction} onMoreDetail={handleMoreDetail} buyDisabled={buyDisabled} moreDetailDisabled={moreDetailDone || td.isTyping} />
    </>
  );

  return (
    <>
      {open && <div className="chat-backdrop" onClick={onClose} />}
      <div className={`chat-panel${open ? ' open' : ''}`}>
          <ChatHeader
          histOpen={histOpen}
          histDetailTitle={histDetailTitle}
          showOptionsMenu={showOptionsMenu}
          onClose={onClose}
          onBack={() => {
            if (histDetailTitle) {
              setBackToListSignal(s => s + 1);
            } else {
              setHistOpen(false);
            }
          }}
          onToggleOptions={() => setShowOptionsMenu(v => !v)}
          onOpenHistory={() => { setHistOpen(true); setShowOptionsMenu(false); }}
          onNewChat={() => setShowOptionsMenu(false)}
          hotelTabOpen={hotelTabOpen}
          offerTabClosed={offerTabClosed}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
          onCloseOfferTab={() => { setOfferTabClosed(true); setActiveTabId('hotel'); }}
          onCloseHotelTab={onCloseHotelTab}
        />

        <ChatHistory
          open={histOpen}
          onClose={() => { setHistOpen(false); setHistDetailTitle(null); }}
          onDetailEnter={title => setHistDetailTitle(title)}
          onDetailLeave={() => setHistDetailTitle(null)}
          backToListSignal={backToListSignal}
        />

        <>
          <div className={`chat-messages${histOpen ? ' chat-messages--hidden' : ''}`} ref={messagesRef}>
            <div className="chat-messages-spacer" />
            {initialMessages}
            {td.messages.map((msg, i) => {
              if (msg.type === 'user') return <ChatUserBubble key={i}>{msg.text}</ChatUserBubble>;
              if (msg.type === 'bot') return (
                <ChatMessage key={i} label="Tienda" animated>{msg.text}</ChatMessage>
              );
              if (msg.type === 'suggestions') {
                const isLatest = i === td.messages.length - 1 && !td.isTyping;
                if (!isLatest) return null;
                return (
                  <ChatSuggestions key={i} label={msg.label} items={msg.items} onChipClick={handleSuggestionClick} animated />
                );
              }
              if (msg.type === 'more-detail') {
                const isLatest = i === td.messages.length - 1 && !td.isTyping;
                return (
                  <div key={i} className="chat-more-detail" style={{ display: 'flex' }}>
                    <ChatMessage label="Tienda" animated>Con el 15% de descuento, el termo queda en $26.525. Además, veo que tenés 1.525 Puntos Galicia disponibles en tu cuenta. Si los aplicás, el total baja a $25.000.<br /><br />Para ese monto tenés preaprobadas 3 cuotas sin interés de $8.334 con tu Visa Galicia. El envío es gratis a tu domicilio en Palermo.</ChatMessage>
                    {isLatest && (
                      <ChatSuggestions items={[
                        { label: 'Comprar (Puntos + 3 cuotas sin interés)', onClick: handleBuyAction },
                        { label: 'Ver ficha técnica del producto', onClick: handleSpecSheet },
                      ]} animated />
                    )}
                  </div>
                );
              }
              if (msg.type === 'more-detail-hotel') {
                const isLatest = i === td.messages.length - 1 && !td.isTyping;
                return (
                  <div key={i} className="chat-more-detail" style={{ display: 'flex' }}>
                    <ChatMessage label="Tienda" animated>Acá van los detalles de tu reserva:<br /><br />
                      📅 <strong>Fechas:</strong> 26 jun – 2 jul (7 noches)<br />
                      👤 <strong>Huéspedes:</strong> 1 adulto<br />
                      🍳 <strong>Incluye:</strong> desayuno buffet, WiFi, estacionamiento<br />
                      ✅ <strong>Cancelación gratuita</strong> hasta el 20 de junio<br /><br />
                      Podés pagarlo en <strong>12 cuotas sin interés de $199.560</strong> con tu tarjeta Galicia.
                    </ChatMessage>
                    {isLatest && (
                      <ChatSuggestions onChipClick={handleSuggestionClick} items={[
                        { label: 'Confirmar reserva ahora', onClick: handleBuyAction },
                        { label: 'Cambiar fechas' },
                      ]} animated />
                    )}
                  </div>
                );
              }
              if (msg.type === 'cvv-card') {
                if (!td.awaitingCvv) return null;
                return <ChatCvvCard key={i} cvvValue={td.inputVal} />;
              }
              if (msg.type === 'purchase-confirm') return (
                <div key={i}>
                  <p className="chat-confirm-label">Compraste {msg.product.confirmName}</p>
                  <ChatSuccessfulOrder />
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
                      <PrimaryButton style={{width:'100%'}}>Ver mi reserva</PrimaryButton>
                    </div>
                  </div>
                );
              }
              if (msg.type === 'spec-sheet') return (
                <ChatProductDetails key={i} name={STORE_OFFER.name} />
              );
              return null;
            })}
            {td.isTyping && <TypingIndicator />}
          </div>

          <ChatInput
            awaitingCvv={td.awaitingCvv}
            cvvError={td.cvvError}
            inputVal={td.inputVal}
            inputRef={inputRef}
            onChange={e => setTd({ inputVal: e.target.value })}
            onSend={handleSend}
            hidden={histOpen}
          />
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
