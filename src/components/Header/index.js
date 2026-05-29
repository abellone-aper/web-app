import './Header.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header({
  variant = 'home',
  title,
  onBack,
  actions,
  user = { name: 'Sol García', initial: 'S' },
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollHidden, setScrollHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setScrollHidden(y > lastY && y > 60);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const isViajes = location.pathname === '/para-tu-viaje' || location.pathname.startsWith('/hospedaje');

  const handleBack = onBack || (() => navigate(-1));

  return (
    <header className={`header header--${variant}${scrollHidden ? ' header--scroll-hidden' : ''}`}>

      {/* ── Mobile: home variant ──────────────────────────────── */}
      <div className="header__mobile-home">
        <div className="header__mobile-home__left">
          <div className="header__mobile-home__avatar">
            {user.avatar
              ? <img src={user.avatar} alt={user.name} />
              : user.initial}
          </div>
          <span className="header__mobile-home__greeting">
            Hola, {user.name.split(' ')[0]}
          </span>
        </div>
        <div className="header__mobile-home__icons">
          <button className="header__mobile-home__icon-btn" aria-label="Notificaciones">
            <span className="icon-wrap">
              <i className="ph ph-bell"></i>
              <span className="notif-dot">1</span>
            </span>
          </button>
          <button className="header__mobile-home__icon-btn" aria-label="Favoritos">
            <i className="ph ph-heart"></i>
          </button>
        </div>
      </div>

      {/* ── Mobile: page variant ──────────────────────────────── */}
      <div className="header__mobile-page">
        <button className="header__mobile-page__back" onClick={handleBack} aria-label="Volver">
          <i className="ph ph-arrow-left"></i>
        </button>
        {title && <span className="header__mobile-page__title">{title}</span>}
        {actions && (
          <div className="header__mobile-page__actions">
            {actions.map((action, i) => (
              <button
                key={i}
                className="header__mobile-page__action-btn"
                onClick={action.onClick}
                aria-label={action.label}
              >
                <i className={`ph ${action.icon}`}></i>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop / Tablet: top row ─────────────────────────── */}
      <div className="header-top">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/img/logo.png" alt="Tienda Galicia" className="logo-img" />
          </Link>
          <div className="search">
            <input type="text" placeholder="Buscar productos o marcas" />
            <i className="ph ph-magnifying-glass search-icon"></i>
          </div>
        </div>
        <a href="#" className="header-cta">Ampliar el límite de tus tarjetas</a>
        <div className="header-icons">
          <a href="#" className="header-icon-btn header-search-btn" aria-label="Buscar">
            <i className="ph ph-magnifying-glass" style={{ fontSize: '22px' }}></i>
          </a>
          <a href="#" className="header-icon-btn" aria-label="Notificaciones">
            <span className="icon-wrap">
              <i className="ph ph-bell" style={{ fontSize: '22px' }}></i>
              <span className="notif-dot">1</span>
            </span>
          </a>
          <a href="#" className="header-icon-btn" aria-label="Favoritos">
            <i className="ph ph-heart" style={{ fontSize: '22px' }}></i>
          </a>
          <a href="#" className="header-icon-btn" aria-label="Carrito">
            <span className="icon-wrap">
              <i className="ph ph-shopping-cart" style={{ fontSize: '22px' }}></i>
              <span className="notif-dot">1</span>
            </span>
          </a>
          <a href="#" className="header-icon-btn" aria-label="Menú">
            <i className="ph ph-list" style={{ fontSize: '22px' }}></i>
          </a>
        </div>
      </div>

      {/* ── Desktop / Tablet: bottom nav ─────────────────────── */}
      <div className="header-bottom">
        <div className="nav-left">
          <div className="nav-categorias">
            Categorías
            <i className="ph ph-caret-down" style={{ fontSize: '16px' }}></i>
          </div>
          <nav className="nav-list">
            <Link className={`nav-item${isViajes ? ' active' : ''}`} to="/para-tu-viaje">
              {!isViajes && <span className="badge-new">¡Nuevo!</span>}
              Viajes
            </Link>
            <a className="nav-item" href="#">Ofertas del día</a>
            <a className="nav-item" href="#">Seguros</a>
          </nav>
        </div>
        <div className="user-nav">
          <a className="user-nav-item" href="#">
            <i className="ph ph-user"></i>
            <span>
              {user.name.split(' ')[0]}
              <i className="ph ph-caret-down" style={{ fontSize: '12px' }}></i>
            </span>
          </a>
          <a className="user-nav-item" href="#">
            <i className="ph ph-heart"></i>
            <span>Favoritos</span>
          </a>
          <a className="user-nav-item" href="#">
            <span className="icon-wrap">
              <i className="ph ph-bell"></i>
              <span className="notif-dot">1</span>
            </span>
            <span>Notificaciones</span>
          </a>
          <a className="user-nav-item" href="#">
            <span className="icon-wrap">
              <i className="ph ph-shopping-cart"></i>
              <span className="notif-dot">1</span>
            </span>
            <span>Carrito</span>
          </a>
        </div>
      </div>

    </header>
  );
}
