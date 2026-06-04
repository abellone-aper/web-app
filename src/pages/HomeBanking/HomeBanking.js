import './HomeBanking.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LinkButton from '../../components/Buttons/LinkButton';

const TRANSACTIONS = [
  { icon: 'purchase', iconClass: 'ph-fill ph-shopping-cart', name: 'Tienda Galicia', meta: 'Hoy · 10:23 hs · Tarjeta ••4821', amount: '-$26.525', neg: true },
  { icon: 'income', iconClass: 'ph ph-arrow-down', name: 'Transferencia recibida', meta: 'Hoy · 08:45 hs · Javier M.', amount: '+$50.000,00', neg: false },
  { icon: 'service', iconClass: 'ph ph-lightning', name: 'Pago Edesur', meta: 'Ayer · 18:32 hs · Débito automático', amount: '-$12.890', neg: true },
  { icon: 'purchase', iconClass: 'ph-fill ph-storefront', name: 'Supermercado Coto', meta: 'Ayer · 15:10 hs · Tarjeta ••2934', amount: '-$38.200', neg: true },
  { icon: 'outcome', iconClass: 'ph ph-arrow-up', name: 'Transferencia enviada', meta: '19 may · 12:05 hs · Lucía P.', amount: '-$25.000', neg: true },
  { icon: 'atm', iconClass: 'ph ph-bank', name: 'Extracción ATM Galicia', meta: '19 may · 09:30 hs · Cajero #3421', amount: '-$20.000', neg: true },
  { icon: 'income', iconClass: 'ph-fill ph-money', name: 'Acreditación sueldo', meta: '18 may · 07:00 hs · APER SA', amount: '+$980.000,00', neg: false },
];

const MOB_TRANSACTIONS = [
  ...TRANSACTIONS,
  { icon: 'service', iconClass: 'ph ph-wifi-high', name: 'Personal Flow', meta: '17 may · 08:00 hs', amount: '-$9.800', neg: true },
  { icon: 'purchase', iconClass: 'ph-fill ph-fork-knife', name: 'PedidosYa', meta: '16 may · 21:15 hs', amount: '-$7.450', neg: true },
  { icon: 'outcome', iconClass: 'ph ph-arrow-down', name: 'Transferencia enviada', meta: '15 may · 11:20 hs', amount: '-$15.000', neg: true },
  { icon: 'service', iconClass: 'ph ph-drop', name: 'Aysa — Agua', meta: '14 may · 10:05 hs', amount: '-$5.320', neg: true },
];

const VENCIMIENTOS = [
  { badge: '3', badgeStyle: {}, day: 'Hoy', desc: '3 servicios pendientes', amount: '$1.549.564' },
  { badge: '1', badgeStyle: {background:'var(--neutral-three)',color:'var(--neutral-seven)'}, day: 'En 3 días', desc: 'Tarjeta de crédito', amount: '$87.320' },
  { badge: '2', badgeStyle: {background:'var(--neutral-three)',color:'var(--neutral-seven)'}, day: 'En 7 días', desc: 'Expensas + Prepaga', amount: '$210.000' },
];

export default function HomeBankingPage({ chatOpen, onChatOpen }) {
  const [filterTab, setFilterTab] = useState('Todos');

  function openChat(e) {
    e.preventDefault();
    onChatOpen?.();
  }

  return (
    <div className="hb-page">
      {/* ── Desktop Sidebar ── */}
      <aside className="hb-sidebar">
        <div className="sidebar-logo">
          <img src="/img/logo.png" alt="Galicia" />
        </div>
        <nav className="sidebar-nav">
          <div className="nav-label">Principal</div>
          <a className="nav-link active" href="#"><i className="ph-fill ph-house-simple"></i> Inicio</a>
          <a className="nav-link" href="#"><i className="ph ph-wallet"></i> Cuentas</a>
          <a className="nav-link" href="#"><i className="ph ph-credit-card"></i> Tarjetas</a>
          <a className="nav-link" href="#"><i className="ph ph-arrows-left-right"></i> Transferencias</a>
          <a className="nav-link" href="#">
            <i className="ph ph-receipt"></i> Pagos
            <span className="nav-badge">3</span>
          </a>
          <div className="nav-label" style={{marginTop:'8px'}}>Servicios</div>
          <a className="nav-link" href="#"><i className="ph ph-trend-up"></i> Inversiones</a>
          <a className="nav-link" href="#"><i className="ph ph-shield-check"></i> Seguros</a>
          <Link className="nav-link" to="/"><i className="ph ph-storefront"></i> Tienda Galicia</Link>
          <a className="nav-link" href="#"><i className="ph ph-dots-three-outline"></i> Más servicios</a>
        </nav>
        <div className="sidebar-user">
          <div className="sidebar-avatar">SG</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Sol Gonzalez</div>
            <div className="sidebar-user-role">Cuenta Personal</div>
          </div>
          <i className="ph ph-sign-out sidebar-logout" style={{fontSize:'18px'}}></i>
        </div>
      </aside>

      {/* ── Desktop Main ── */}
      <div className="hb-main">
        <div className="hb-topbar">
          <div className="topbar-greeting">Buen día, <span>Sol</span></div>
          <div className="topbar-right">
            <span className="topbar-date">Martes, 20 de mayo de 2026</span>
            <button className="topbar-btn" title="Buscar"><i className="ph ph-magnifying-glass"></i></button>
            <button className="topbar-btn" title="Notificaciones">
              <i className="ph ph-bell"></i>
              <span className="topbar-notif-dot"></span>
            </button>
            <button className="topbar-btn" title="Configuración"><i className="ph ph-gear"></i></button>
          </div>
        </div>

        <div className="hb-content">
          <div className="balance-hero">
            <div className="balance-left">
              <div className="balance-label">Saldo disponible</div>
              <div className="balance-amount">
                $1.892.430,00
                <button className="balance-eye-btn" title="Ocultar saldo"><i className="ph ph-eye"></i></button>
              </div>
              <div className="balance-meta">
                <div className="bm-item">
                  <div className="bm-label">CBU</div>
                  <div className="bm-value">0070123456789012345678</div>
                </div>
                <div className="bm-item">
                  <div className="bm-label">Alias</div>
                  <div className="bm-value">SOL.GALICIA.ARS</div>
                </div>
              </div>
            </div>
            <div className="balance-right">
              <button className="quick-btn"><i className="ph ph-paper-plane-tilt"></i><span>Transferir</span></button>
              <button className="quick-btn"><i className="ph ph-receipt"></i><span>Pagar</span></button>
              <button className="quick-btn"><i className="ph ph-arrow-circle-down"></i><span>Ingresar</span></button>
            </div>
          </div>

          <div className="bottom-grid">
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">Últimos movimientos</div>
                <LinkButton as="a" href="#">Ver todos</LinkButton>
              </div>
              <div className="filter-tabs">
                {['Todos','Ingresos','Egresos','Tarjeta'].map(t => (
                  <div key={t} className={`filter-tab${filterTab === t ? ' active' : ''}`} onClick={() => setFilterTab(t)}>{t}</div>
                ))}
              </div>
              {TRANSACTIONS.map((tx, i) => (
                <div key={i} className="txn-item">
                  <div className={`txn-icon ${tx.icon}`}><i className={tx.iconClass}></i></div>
                  <div className="txn-body">
                    <div className="txn-name">{tx.name}</div>
                    <div className="txn-meta">{tx.meta}</div>
                  </div>
                  <div className={`txn-amount ${tx.neg ? 'neg' : 'pos'}`}>{tx.amount}</div>
                </div>
              ))}
            </div>

            <div className="right-col">
              <div className="panel">
                <div className="panel-header">
                  <div className="panel-title">Vencimientos</div>
                  <LinkButton as="a" href="#">Ver todos</LinkButton>
                </div>
                {VENCIMIENTOS.map((v, i) => (
                  <div key={i} className="venc-item">
                    <div className="venc-badge" style={v.badgeStyle}>{v.badge}</div>
                    <div className="venc-body">
                      <div className="venc-name">{v.day}</div>
                      <div className="venc-desc">{v.desc}</div>
                    </div>
                    <div className="venc-amount">{v.amount}</div>
                  </div>
                ))}
              </div>

              <div className="hb-promo-banner">
                <div className="hb-promo-banner-top">
                  <img src="https://www.designsuites.com/images/bariloche/foto_33.jpg" alt="Design Suites Bariloche" className="hb-promo-banner-img" />
                  <div className="hb-promo-tags">
                    <span className="hb-promo-tag"><i className="ph ph-trend-down"></i> Bajó el precio</span>
                  </div>
                </div>
                <div className="hb-promo-banner-body">
                  <div className="hb-promo-eyebrow">HOSPEDAJE</div>
                  <div className="hb-promo-title">Design Suites Bariloche</div>
                  <div className="hb-promo-sub">Desde $49.999 por 2 noches</div>
                  <div className="hb-promo-rating">
                    <i className="ph-fill ph-star" style={{color:'#f26522',fontSize:'13px'}}></i>
                    <span>5.0</span>
                  </div>
                  <button className="hb-promo-cta" onClick={openChat}>
                    <i className="ph ph-chat-circle-dots"></i> Hablemos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="hb-mobile">
        <div className="mob-header">
          <div className="mob-header-row">
            <button className="mob-avatar-btn"><i className="ph-fill ph-user"></i></button>
            <div className="mob-header-actions">
              <button className="mob-header-icon"><i className="ph ph-eye"></i></button>
              <button className="mob-header-icon">
                <i className="ph ph-bell"></i>
                <span className="mob-notif-dot"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="mob-content">
          <div className="mob-group">
            <div className="mob-section-hd">
              <span className="mob-section-title">Vencimientos</span>
              <i className="ph ph-caret-right"></i>
            </div>
            <div className="mob-card">
              <div className="mob-venc-row">
                <div className="mob-venc-badge">3</div>
                <div>
                  <div className="mob-venc-day">Hoy</div>
                  <div className="mob-venc-amount">$1.549.564,50</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mob-card">
            <div className="mob-promo-img">
              <img src="https://www.designsuites.com/images/bariloche/foto_33.jpg" alt="Design Suites Bariloche" />
              <div className="mob-promo-tags-row">
                <span className="mob-pill"><i className="ph ph-trend-down"></i>Bajó el precio</span>
              </div>
            </div>
            <div className="mob-promo-body">
              <div className="mob-promo-texts">
                <div className="mob-promo-eyebrow">HOSPEDAJE</div>
                <div className="mob-promo-title">Design Suites Bariloche</div>
                <div className="mob-promo-sub">Desde $49.999 por 2 noches</div>
                <div className="mob-promo-rating">
                  <i className="ph-fill ph-star" style={{color:'#f26522',fontSize:'12px'}}></i>
                  <span>5.0</span>
                </div>
              </div>
              <button className="mob-promo-btn" onClick={openChat}>
                <i className="ph ph-chat-circle-dots"></i> Hablemos
              </button>
            </div>
          </div>

          <div className="mob-group">
            <div className="mob-section-hd">
              <span className="mob-section-title">Últimos movimientos</span>
              <i className="ph ph-caret-right"></i>
            </div>
            <div className="mob-card">
              {MOB_TRANSACTIONS.map((tx, i) => (
                <div key={i} className="mob-txn-item">
                  <div className={`mob-txn-icon ${tx.icon}`}><i className={tx.iconClass}></i></div>
                  <div className="mob-txn-body">
                    <div className="mob-txn-name">{tx.name}</div>
                    <div className="mob-txn-meta">{tx.meta}</div>
                  </div>
                  <div className={`mob-txn-amount ${tx.neg ? 'neg' : 'pos'}`}>{tx.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mob-tabbar">
          <a className="mob-tab active" href="#"><i className="ph-fill ph-house-simple"></i><span>Inicio</span></a>
          <a className="mob-tab" href="#"><i className="ph ph-credit-card"></i><span>Tarjetas</span></a>
          <div className="mob-tab-qr">
            <button className="mob-qr-btn"><i className="ph ph-qr-code"></i></button>
          </div>
          <a className="mob-tab" href="#"><i className="ph ph-arrows-left-right"></i><span>Transferencias</span></a>
          <a className="mob-tab" href="#"><i className="ph ph-list"></i><span>Más</span></a>
        </div>
      </div>

    </div>
  );
}
