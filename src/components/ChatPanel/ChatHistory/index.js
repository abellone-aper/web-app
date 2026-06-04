import './ChatHistory.css';
import { useState, useRef, useEffect } from 'react';

const HIST_TAB_CHATS = [
  { group: 'Recientes', items: [
    'Descuentos utilizando mi tarjeta mastercard',
    'Termo Stanley Classic Legendary',
    '¿Tienen promociones de pasajes aéreos con Galicia?',
    '¿Cuántos puntos tengo que usar y cuánto me descuentan?',
    'Mi compra fue cancelada. Necesito urgente que me ayuden',
  ]},
  { group: 'Abril 2026', items: [
    'Zapatillas de deporte negras',
    'Campera Patagonia talle M color verde oliva',
    'Seguimiento de envío Samsung Galaxy Buds2',
  ]},
];

const ORDERS_INIT = {
  'stanley-prep': {
    title: 'Termo Stanley Classic Legendary', date: '15 de mayo de 2026', num: 'Pedido #567896',
    badge: 'En preparación', badgeClass: 'hist-badge--prep',
    img: 'https://static-catalog.tiendamia.com/marketplace_manager_service/production/product_62498b26_mirakl_image_1_large.jpg',
    name: 'Termo Stanley Classic Legendary', price: '$26.525',
    boti: '¡Hola Sol! Compraste el Termo Stanley Classic Legendary, una elección perfecta para mantener tus bebidas calientes o frías durante horas. ¡Gracias por tu compra!',
    cancellable: true, tracking: { step: 1 },
  },
  'iphone-prep': {
    title: 'iPhone 15 128gb Negro', date: '2 de mayo de 2026', num: 'Pedido #561204',
    badge: 'En preparación', badgeClass: 'hist-badge--prep',
    img: 'https://beercoffee.com.ar/wp-content/uploads/2024/08/i-e1738081689922.webp',
    name: 'iPhone 15 128gb Negro', price: '$1.039.200',
    boti: '¡Hola Sol! Tu iPhone 15 ya está en camino. Fue despachado desde el depósito y llegará en los próximos días. ¡Gracias por tu compra!',
    cancellable: true, tracking: { step: 1 },
  },
  'watch-shipping': {
    title: 'Apple Watch SE 2da Gen 44mm Midnight', date: '28 de abril de 2026', num: 'Pedido #558422',
    badge: 'En camino', badgeClass: 'hist-badge--shipping',
    img: 'https://http2.mlstatic.com/D_NQ_NP_670516-MLA99966056855_112025-O.webp',
    name: 'Apple Watch SE 2da Gen 44mm Midnight Aluminium', price: '$359.999',
    boti: '¡Hola Sol! Tu Apple Watch SE ya está en camino. Fue despachado el 30 de abril y llegará en los próximos días. Podés rastrear el envío desde aquí.',
    cancellable: false, tracking: { step: 3, notice: 'La fecha de entrega estimada estará disponible en cuanto la informe el transportista.', carrier: 'OCA', trackingNum: 'OCA12048573920' },
  },
  'galaxy-delivered': {
    title: 'Samsung Galaxy S24 256gb Violet', date: '5 de marzo de 2026', num: 'Pedido #541203',
    badge: 'Entregado', badgeClass: 'hist-badge--delivered',
    img: 'https://jumboargentina.vtexassets.com/arquivos/ids/825196-800-600?v=638526909930670000&width=800&height=600&aspect=true',
    name: 'Samsung Galaxy S24 256gb Violet', price: '$674.250',
    boti: '¡Hola Sol! Tu Samsung Galaxy S24 fue entregado el 8 de marzo. Esperamos que estés disfrutando tu nuevo teléfono. ¿Hay algo más en lo que pueda ayudarte?',
    cancellable: false, tracking: { step: 4, deliveredDate: '8 de marzo de 2026', carrier: 'OCA', trackingNum: 'OCA11930461827' },
  },
  'buds-cancelled': {
    title: 'Samsung Galaxy Buds2 SM-R177', date: '15 de abril de 2026', num: 'Pedido #554831',
    badge: 'Cancelado', badgeClass: 'hist-badge--cancelled',
    img: 'https://images.samsung.com/ar/galaxy-buds2/feature/galaxy-buds2-battery-life-mo.jpg',
    name: 'Samsung Galaxy Buds2 SM-R177', price: '$228.999',
    boti: 'Hola Sol. Tu pedido de los Samsung Galaxy Buds2 fue cancelado. Si tenés alguna duda o necesitás ayuda, estoy acá.',
    cancellable: false, tracking: null,
  },
};

const HIST_ORDERS = [
  { id: 'stanley-prep' }, { id: 'iphone-prep' }, { id: 'watch-shipping' },
  { id: 'galaxy-delivered' }, { id: 'buds-cancelled' },
];

const FILTER_MAP = {
  todos: null, preparacion: 'hist-badge--prep', camino: 'hist-badge--shipping',
  entregado: 'hist-badge--delivered', cancelado: 'hist-badge--cancelled',
};

const ORDER_DETAIL_RESPONSES = [
  '¡Claro! Estoy aquí para ayudarte con lo que necesites sobre este pedido.',
  'Entendido. Si tenés alguna duda sobre tu compra, con gusto te ayudo.',
  'Por supuesto, estoy para ayudarte con cualquier consulta sobre tu pedido.',
];

export default function ChatHistory({ open, onClose, onDetailEnter, onDetailLeave, backToListSignal }) {
  const [histTab, setHistTab] = useState('chats');
  const [histFilter, setHistFilter] = useState('todos');
  const [activeOrder, setActiveOrder] = useState(null);
  const [view, setView] = useState('main');
  const [orders, setOrders] = useState(ORDERS_INIT);
  const [orderActions, setOrderActions] = useState({});
  const [detailInput, setDetailInput] = useState('');
  const [detailTyping, setDetailTyping] = useState(false);
  const messagesRef = useRef(null);
  const detailInputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setView('main');
      setActiveOrder(null);
      onDetailLeave?.();
    }
  }, [open]);

  useEffect(() => {
    if (backToListSignal && view === 'orderDetail') {
      setView('main');
      onDetailLeave?.();
    }
  }, [backToListSignal]);

  useEffect(() => {
    setDetailInput('');
    setDetailTyping(false);
    if (messagesRef.current) {
      messagesRef.current.scrollTop = 0;
    }
  }, [activeOrder]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [detailTyping]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [orderActions]);

  function handleOrderAction(action, orderId) {
    const existing = orderActions[orderId] || [];
    if (action === 'envio' && existing.some(a => a.type === 'tracking')) return;
    if (action === 'factura' && existing.some(a => a.type === 'invoice')) return;
    if (action === 'cancelar' && existing.some(a => a.type === 'cancel-confirm' || a.type === 'cancel-done')) return;
    const orderInfo = orders[orderId] || {};
    setOrderActions(prev => ({
      ...prev,
      [orderId]: [...(prev[orderId] || []), { type: 'user', text: action === 'envio' ? 'Ver seguimiento de envío' : action === 'factura' ? 'Ver facturación' : 'Cancelar compra' }],
    }));
    setTimeout(() => {
      if (action === 'envio') {
        setOrderActions(prev => ({ ...prev, [orderId]: [...(prev[orderId] || []), { type: 'tracking', order: orderInfo }] }));
      } else if (action === 'factura') {
        setOrderActions(prev => ({ ...prev, [orderId]: [...(prev[orderId] || []), { type: 'invoice', order: orderInfo }] }));
      } else if (action === 'cancelar') {
        setOrderActions(prev => ({ ...prev, [orderId]: [...(prev[orderId] || []), { type: 'cancel-confirm', orderId }] }));
      }
    }, 500);
  }

  function confirmCancel(orderId) {
    setOrders(prev => ({
      ...prev,
      [orderId]: { ...prev[orderId], badge: 'Cancelado', badgeClass: 'hist-badge--cancelled', cancellable: false },
    }));
    setOrderActions(prev => ({
      ...prev,
      [orderId]: (prev[orderId] || []).map(a => a.type === 'cancel-confirm' ? { type: 'cancel-done' } : a),
    }));
  }

  function denyCancel(orderId) {
    setOrderActions(prev => ({
      ...prev,
      [orderId]: (prev[orderId] || []).filter(
        a => a.type !== 'cancel-confirm' && !(a.type === 'user' && a.text === 'Cancelar compra')
      ),
    }));
  }

  function handleDetailSend() {
    const text = detailInput.trim();
    if (!text || !activeOrder) return;
    const orderId = activeOrder;
    setDetailInput('');
    setDetailTyping(true);
    setOrderActions(prev => ({
      ...prev,
      [orderId]: [...(prev[orderId] || []), { type: 'user', text }],
    }));
    setTimeout(() => {
      setDetailTyping(false);
      setOrderActions(prev => {
        const responseIdx = (prev[orderId] || []).filter(a => a.type === 'bot-detail').length;
        return {
          ...prev,
          [orderId]: [...(prev[orderId] || []), { type: 'bot-detail', text: ORDER_DETAIL_RESPONSES[responseIdx % ORDER_DETAIL_RESPONSES.length] }],
        };
      });
    }, 750);
  }

  return (
    <div className={`chat-history-panel${open ? ' open' : ''}`}>
      {view !== 'orderDetail' && (
        <div className="chat-history-hd">
          <button className="chat-history-back-btn" onClick={onClose}>
            <i className="ph ph-arrow-left" style={{fontSize:'18px'}}></i>
          </button>
          <span className="chat-history-hd-title">Historial</span>
        </div>
      )}

      {view !== 'orderDetail' && (
        <div className="hist-tabs-wrap">
          <div className="hist-tabs">
            <button className={`hist-tab${histTab === 'chats' ? ' active' : ''}`} onClick={() => setHistTab('chats')}>Chats</button>
            <button className={`hist-tab${histTab === 'compras' ? ' active' : ''}`} onClick={() => setHistTab('compras')}>Mis compras</button>
          </div>
        </div>
      )}

      {view !== 'orderDetail' && (
        <>
          {/* Chats tab */}
          <div className="hist-tab-pane" style={{display: histTab === 'chats' ? '' : 'none'}}>
            {HIST_TAB_CHATS.map(group => (
              <div key={group.group}>
                <div className="hist-section-label">{group.group}</div>
                {group.items.map(item => (
                  <button key={item} className="hist-chat-item">
                    <span className="hist-chat-text">{item}</span>
                    <i className="ph ph-caret-right hist-chat-arrow"></i>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Compras tab */}
          <div className="hist-tab-pane" style={{display: histTab === 'compras' ? '' : 'none'}}>
            <div className="hist-filter-row">
              {Object.keys(FILTER_MAP).map(f => (
                <button key={f} className={`hist-filter-chip${histFilter === f ? ' active' : ''}`} onClick={() => setHistFilter(f)}>
                  {f === 'todos' ? 'Todos' : f === 'preparacion' ? 'En preparación' : f === 'camino' ? 'En camino' : f === 'entregado' ? 'Entregado' : 'Cancelado'}
                </button>
              ))}
            </div>
            {HIST_ORDERS.map(({ id }) => {
              const o = orders[id];
              const targetClass = FILTER_MAP[histFilter];
              if (targetClass && o.badgeClass !== targetClass) return null;
              return (
                <button key={id} className="hist-order-card" onClick={() => { setActiveOrder(id); setView('orderDetail'); onDetailEnter?.(orders[id].title); }}>
                  <div className="hist-order-card-inner">
                    <div className="hist-order-hd">
                      <span className={`hist-badge ${o.badgeClass}`}>{o.badge}</span>
                      <div className="hist-order-hd-meta">
                        <span className="hist-order-date">{o.date}</span>
                        <span className="hist-order-num">{o.num}</span>
                      </div>
                      <i className="ph ph-caret-right hist-order-caret"></i>
                    </div>
                    <div className="hist-order-body">
                      <img className="hist-order-img" src={o.img} alt={o.name} />
                      <div className="hist-order-info">
                        <span className="hist-order-name">{o.name}</span>
                        <span className="hist-order-price">{o.price}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Order detail sub-panel */}
      {activeOrder && (
        <div className={`hist-order-detail${view === 'orderDetail' ? ' open' : ''}`}>
          <div className="hist-order-detail-hd">
            <button className="hist-order-detail-back" onClick={() => { setView('main'); onDetailLeave?.(); }}>
              <i className="ph ph-arrow-left"></i>
            </button>
            <span className="hist-order-detail-title">{orders[activeOrder]?.title}</span>
          </div>
          <div className="hist-order-detail-msgs" ref={messagesRef}>
            <div className="hist-boti-label">
              <i className="ph ph-sparkle" style={{fontSize:'14px'}}></i> Hablemos
            </div>
            <p className="hist-boti-text">{orders[activeOrder]?.boti}</p>

            <div className="hist-order-card-detail">
              <div className="hist-order-hd">
                <span className={`hist-badge ${orders[activeOrder]?.badgeClass}`}>{orders[activeOrder]?.badge}</span>
                <div className="hist-order-hd-meta">
                  <span className="hist-order-date">{orders[activeOrder]?.date}</span>
                  <span className="hist-order-num">{orders[activeOrder]?.num}</span>
                </div>
              </div>
              <div className="hist-order-body">
                <img className="hist-order-img" src={orders[activeOrder]?.img} alt="" />
                <div className="hist-order-info">
                  <span className="hist-order-name">{orders[activeOrder]?.name}</span>
                  <span className="hist-order-price">{orders[activeOrder]?.price}</span>
                </div>
              </div>
            </div>

            {(orderActions[activeOrder] || []).map((action, i) => {
              if (action.type === 'user') {
                return <div key={i} className="hist-user-bubble">{action.text}</div>;
              }
              if (action.type === 'tracking') {
                const t = action.order.tracking;
                if (!t) return (
                  <div key={i} className="hist-tracking-wrap">
                    <div className="hist-tracking-card">
                      <div className="hist-tracking-notice">
                        <i className="ph ph-info" style={{fontSize:'20px',flexShrink:0,color:'var(--neutral-seven)'}}></i>
                        <span>Este pedido fue cancelado, por lo que no hay información de envío disponible.</span>
                      </div>
                    </div>
                  </div>
                );
                const step = t.step || 1;
                const stepPercent = Math.round((step - 1) / 3 * 100);
                const stepLabels = ['Realizado','Despachado','En camino','Entregado'];
                return (
                  <div key={i} className="hist-tracking-wrap">
                    <div className="hist-tracking-card">
                      {step < 4 && t.notice && (
                        <div className="hist-tracking-notice">
                          <i className="ph ph-calendar-blank" style={{fontSize:'20px',flexShrink:0,color:'var(--neutral-seven)'}}></i>
                          <span>{t.notice}</span>
                        </div>
                      )}
                      <div className="hist-tracking-labels">
                        {stepLabels.map((label, li) => (
                          <span key={label} className={`hist-tl-step${li + 1 < step ? ' hist-tl-step--done' : li + 1 === step ? ' hist-tl-step--current' : ''}`}>{label}</span>
                        ))}
                      </div>
                      <div className="hist-tracking-bar-row">
                        <div className="hist-tracking-bar">
                          <div className="hist-tracking-bar-fill" style={{width: stepPercent + '%'}}></div>
                          {step < 4 && (
                            <div className="hist-tracking-truck" style={{left: stepPercent === 0 ? '0px' : `calc(${stepPercent}% - 16px)`}}>
                              <i className="ph ph-truck" style={{fontSize:'16px',color:'#fff'}}></i>
                            </div>
                          )}
                        </div>
                      </div>
                      {step === 4 && (
                        <div className="hist-tracking-delivered">
                          <i className="ph ph-check-circle" style={{fontSize:'18px',color:'var(--information-primary)'}}></i>
                          <span>Entregado el {t.deliveredDate}</span>
                        </div>
                      )}
                      <p className="hist-tracking-carrier-info">
                        {t.carrier ? `Enviado con ${t.carrier} · N° ${t.trackingNum}` : 'El transportista asignado estará disponible en breve.'}
                      </p>
                    </div>
                  </div>
                );
              }
              if (action.type === 'invoice') {
                const o = action.order;
                return (
                  <div key={i} className="hist-invoice-wrap">
                    <div className="hist-invoice-card">
                      <div className="hist-invoice-hd">
                        <div className="hist-invoice-logo-wrap"><i className="ph ph-receipt" style={{fontSize:'22px',color:'var(--action-primary)'}}></i></div>
                        <div className="hist-invoice-titles">
                          <p className="hist-invoice-title">Factura electrónica</p>
                          <p className="hist-invoice-sub">Galicia Tienda S.A. · CUIT 30-71234567-9</p>
                        </div>
                      </div>
                      <div className="hist-invoice-rows">
                        <div className="hist-invoice-row"><span className="hist-invoice-key">N° de factura</span><span className="hist-invoice-val">0001-00042813</span></div>
                        <div className="hist-invoice-row"><span className="hist-invoice-key">Fecha de emisión</span><span className="hist-invoice-val">26/05/2026</span></div>
                        <div className="hist-invoice-row"><span className="hist-invoice-key">Producto</span><span className="hist-invoice-val">{o.name}</span></div>
                        <div className="hist-invoice-row"><span className="hist-invoice-key">Subtotal</span><span className="hist-invoice-val">{o.price}</span></div>
                        <div className="hist-invoice-row"><span className="hist-invoice-key">IVA (21%)</span><span className="hist-invoice-val hist-invoice-val--muted">Incluido</span></div>
                        <div className="hist-invoice-row hist-invoice-row--total"><span className="hist-invoice-key">Total</span><span className="hist-invoice-val hist-invoice-val--total">{o.price}</span></div>
                      </div>
                      <button className="hist-invoice-download"><i className="ph ph-download-simple" style={{fontSize:'15px'}}></i> Descargar PDF</button>
                    </div>
                  </div>
                );
              }
              if (action.type === 'cancel-confirm') {
                const o = orders[action.orderId];
                return (
                  <div key={i} className="hist-cancel-confirm">
                    <div className="hist-cancel-card">
                      <div className="hist-cancel-card-hd">
                        <div className="hist-cancel-warn-wrap"><i className="ph ph-warning" style={{fontSize:'18px'}}></i></div>
                        <div className="hist-cancel-card-titles">
                          <p className="hist-cancel-card-title">¿Cancelar esta compra?</p>
                          <p className="hist-cancel-card-sub">Esta acción no se puede deshacer</p>
                        </div>
                      </div>
                      <div className="hist-cancel-prod-row">
                        <img className="hist-cancel-prod-img" src={o.img} alt="" />
                        <div className="hist-cancel-prod-info">
                          <p className="hist-cancel-prod-name">{o.name}</p>
                          <p className="hist-cancel-prod-price">{o.price}</p>
                        </div>
                      </div>
                      <div className="hist-cancel-buttons">
                        <button className="hist-cancel-btn-yes" onClick={() => confirmCancel(action.orderId)}>Cancelar compra</button>
                        <button className="hist-cancel-btn-no" onClick={() => denyCancel(action.orderId)}>No, volver al pedido</button>
                      </div>
                    </div>
                  </div>
                );
              }
              if (action.type === 'cancel-done') {
                return (
                  <div key={i} className="hist-cancel-done-card">
                    <div className="hist-cancel-done-hd">
                      <div><i className="ph ph-x-circle" style={{fontSize:'28px',color:'#dc2626'}}></i></div>
                      <p className="hist-cancel-done-title">Compra cancelada</p>
                      <p className="hist-cancel-done-sub">El reintegro se acreditará en 3 a 5 días hábiles</p>
                    </div>
                    <p className="hist-cancel-done-msg">¿Hay algo más en lo que pueda ayudarte?</p>
                  </div>
                );
              }
              if (action.type === 'bot-detail') {
                return (
                  <div key={i} className="hist-bot-msg">
                    <div className="hist-boti-label"><i className="ph ph-sparkle" style={{fontSize:'14px'}}></i> Hablemos</div>
                    <p className="hist-boti-text">{action.text}</p>
                  </div>
                );
              }
              return null;
            })}

            {orders[activeOrder]?.cancellable !== undefined && (() => {
              const usedTypes = (orderActions[activeOrder] || []).map(a => a.type);
              const showEnvio = !usedTypes.includes('tracking');
              const showFactura = !usedTypes.includes('invoice');
              const showCancelar = orders[activeOrder]?.cancellable && !usedTypes.includes('cancel-confirm') && !usedTypes.includes('cancel-done');
              if (!showEnvio && !showFactura && !showCancelar) return null;
              return (
                <div className="hist-acciones" id="histAcciones">
                  <div className="hist-acciones-hd">
                    <i className="ph ph-sparkle" style={{fontSize:'16px',color:'var(--brand-primary)'}}></i>
                    <span className="hist-acciones-title">¿En qué más te ayudo?</span>
                  </div>
                  <div className="hist-acciones-chips">
                    {showEnvio && (
                      <button className="hist-action-chip" onClick={() => handleOrderAction('envio', activeOrder)}>
                        <span>Ver detalles de envío</span>
                        <i className="ph ph-caret-right" style={{fontSize:'16px',color:'var(--neutral-five)'}}></i>
                      </button>
                    )}
                    {showFactura && (
                      <button className="hist-action-chip" onClick={() => handleOrderAction('factura', activeOrder)}>
                        <span>Ver facturación</span>
                        <i className="ph ph-caret-right" style={{fontSize:'16px',color:'var(--neutral-five)'}}></i>
                      </button>
                    )}
                    {showCancelar && (
                      <button className="hist-action-chip hist-action-chip--cancel" onClick={() => handleOrderAction('cancelar', activeOrder)}>
                        <span className="hist-cancel-chip-inner"><span>Cancelar compra</span></span>
                        <i className="ph ph-caret-right" style={{fontSize:'16px',color:'#fca5a5'}}></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {detailTyping && (
              <div className="hist-detail-typing">
                <span className="chat-typing-dot"></span>
                <span className="chat-typing-dot"></span>
                <span className="chat-typing-dot"></span>
              </div>
            )}
          </div>

          <div className="hist-order-detail-input-bar">
            <input
              ref={detailInputRef}
              className="hist-detail-input"
              placeholder="¿En qué te ayudo?"
              value={detailInput}
              onChange={e => setDetailInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleDetailSend(); }}
            />
            <button className="hist-detail-send-btn" onClick={handleDetailSend}>
              <i
                className={`ph ${detailInput.trim() ? 'ph-paper-plane-right' : 'ph-microphone'}`}
                style={{fontSize: '20px'}}
              ></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
