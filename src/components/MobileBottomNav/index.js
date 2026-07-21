import './MobileBottomNav.css';
import { Link, useLocation } from 'react-router-dom';
import { useBrand } from '../../brands/BrandContext';

const maskStyle = (icon) => ({
  WebkitMaskImage: `url('/icons/${icon}.svg')`,
  maskImage: `url('/icons/${icon}.svg')`,
});

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
        <span className="mnav-icon" style={maskStyle('buscar')}></span>
        <span className="mobile-nav-label">Buscar</span>
      </a>
      <a href="#" className="mobile-nav-item" onClick={e => { e.preventDefault(); onChatOpen?.(); }}>
        <span className="mobile-nav-chat-fab-wrap">
          <span className="mobile-nav-chat-fab">
            <span className="mnav-icon" style={maskStyle('chat')}></span>
          </span>
          <span className="mobile-chat-notif-dot"></span>
        </span>
        <span className="mobile-nav-label">Chat</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <span className="icon-wrap">
          <span className="mnav-icon" style={maskStyle('carrito')}></span>
          <span className="notif-dot">1</span>
        </span>
        <span className="mobile-nav-label">Carrito</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <span className="mnav-icon" style={maskStyle('menu')}></span>
        <span className="mobile-nav-label">Más</span>
      </a>
    </nav>
  );
}
