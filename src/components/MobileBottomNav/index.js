import './MobileBottomNav.css';
import { Link, useLocation } from 'react-router-dom';
import { useBrand } from '../../brands/BrandContext';

export default function MobileBottomNav({ onChatOpen, hidden }) {
  const location = useLocation();
  const brand = useBrand();
  const isHome = location.pathname === brand.path('/');

  return (
    <nav className={`mobile-bottom-nav${hidden ? ' mobile-bottom-nav--hidden' : ''}`}>
      <Link to={brand.path('/')} className={`mobile-nav-item${isHome ? ' active' : ''}`}>
        <i className={`ph${isHome ? '-fill' : ''} ph-house`} style={{fontSize:'22px'}}></i>
        <span className="mobile-nav-label">Home</span>
      </Link>
      <a href="#" className="mobile-nav-item">
        <i className="ph ph-magnifying-glass mnav-icon"></i>
        <span className="mobile-nav-label">Buscar</span>
      </a>
      <a href="#" className="mobile-nav-item" onClick={e => { e.preventDefault(); onChatOpen?.(); }}>
        <span className="mobile-nav-chat-fab-wrap">
          <span className="mobile-nav-chat-fab">
            <i className="ph-fill ph-sparkle mnav-icon"></i>
          </span>
          <span className="mobile-chat-notif-dot"></span>
        </span>
        <span className="mobile-nav-label">Chat</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <span className="icon-wrap">
          <i className="ph ph-shopping-cart mnav-icon"></i>
          <span className="notif-dot">1</span>
        </span>
        <span className="mobile-nav-label">Carrito</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <i className="ph ph-list mnav-icon"></i>
        <span className="mobile-nav-label">Más</span>
      </a>
    </nav>
  );
}
