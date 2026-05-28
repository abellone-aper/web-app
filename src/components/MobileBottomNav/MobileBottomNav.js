import { Link, useLocation } from 'react-router-dom';

export default function MobileBottomNav({ onChatOpen }) {
  const location = useLocation();

  return (
    <nav className="mobile-bottom-nav">
      <Link to="/" className={`mobile-nav-item${location.pathname === '/' ? ' active' : ''}`}>
        <i className={`ph${location.pathname === '/' ? '-fill' : ''} ph-house`} style={{fontSize:'22px'}}></i>
        <span className="mobile-nav-label">Home</span>
      </Link>
      <a href="#" className="mobile-nav-item">
        <i className="ph ph-magnifying-glass" style={{fontSize:'22px'}}></i>
        <span className="mobile-nav-label">Buscar</span>
      </a>
      <a href="#" className="mobile-nav-item" onClick={e => { e.preventDefault(); onChatOpen?.(); }}>
        <span className="mobile-nav-chat-fab-wrap">
          <span className="mobile-nav-chat-fab">
            <i className="ph ph-sparkle" style={{fontSize:'24px'}}></i>
          </span>
          <span className="mobile-chat-notif-dot"></span>
        </span>
        <span className="mobile-nav-label">Chat</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <span className="icon-wrap">
          <i className="ph ph-shopping-cart" style={{fontSize:'22px'}}></i>
          <span className="notif-dot">1</span>
        </span>
        <span className="mobile-nav-label">Carrito</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <i className="ph ph-list" style={{fontSize:'22px'}}></i>
        <span className="mobile-nav-label">Más</span>
      </a>
    </nav>
  );
}
