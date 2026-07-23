import './Header.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBrand } from '../../brands/BrandContext';
import { CURRENT_USER } from '../../lib/currentUser';
import BrandLogo from '../BrandLogo';
import AccountPanel from './AccountPanel';
import SearchSuggestions from './SearchSuggestions';

export default function Header({
  variant = 'home',
  title,
  onBack,
  actions,
  user = CURRENT_USER,
  onOpenAssistant,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const brand = useBrand();
  const [scrollHidden, setScrollHidden] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      const down = y > lastY;
      const pastThreshold = y > 80;
      setScrolledDown(pastThreshold);
      setScrollHidden(!pastThreshold && down && y > 60);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const headerRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const openAccount = () => setAccountOpen(true);
  const isViajes = location.pathname === brand.path('/para-tu-viaje') || location.pathname.startsWith(brand.path('/hospedaje'));

  function openSearch() { setSearchMode(true); setSuggestionsOpen(true); }
  function closeSearch() { setSearchMode(false); setSearchQuery(''); setSuggestionsOpen(false); }

  useEffect(() => {
    if (!suggestionsOpen) return;
    function onDocMouseDown(e) {
      const insideDesktop = desktopSearchRef.current && desktopSearchRef.current.contains(e.target);
      const insideMobile = mobileSearchRef.current && mobileSearchRef.current.contains(e.target);
      if (!insideDesktop && !insideMobile) {
        setSuggestionsOpen(false);
      }
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setSuggestionsOpen(false);
    }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [suggestionsOpen]);

  const handleBack = onBack || (() => navigate(-1));

  return (
    <header ref={headerRef} className={`header header--${variant}${scrollHidden ? ' header--scroll-hidden' : ''}${searchMode ? ' header--search-open' : ''}${scrolledDown && variant === 'home' ? ' header--scrolled' : ''}`}>

      {/* ── Mobile: home variant ──────────────────────────────── */}
      <div className="header__mobile-home">
        <button className="header__mobile-home__left" onClick={openAccount}>
          <div className="header__mobile-home__avatar">
            {user.avatar
              ? <img src={user.avatar} alt={user.name} />
              : user.initial}
          </div>
          <span className="header__mobile-home__greeting">
            Hola, {user.name.split(' ')[0]}
          </span>
        </button>
        <div className="header__mobile-home__icons">
          <button className="header__mobile-home__icon-btn" onClick={openSearch} aria-label="Buscar">
            <img src="/icons/buscar.svg" alt="" className="header-icon-img" />
          </button>
          <button className="header__mobile-home__icon-btn" aria-label="Notificaciones">
            <span className="icon-wrap">
              <img src="/icons/notificaciones.svg" alt="" className="header-icon-img" />
              <span className="notif-dot">1</span>
            </span>
          </button>
          <button className="header__mobile-home__icon-btn" aria-label="Favoritos">
            <img src="/icons/favoritos.svg" alt="" className="header-icon-img" />
          </button>
        </div>
      </div>

      {/* ── Mobile: compact search (scrolled) ───────────────── */}
      <div className="header__mobile-compact">
        <div className="header__mobile-search__bar">
          <img src="/icons/buscar.svg" alt="" className="search-icon header-icon-img" />
          <input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={openSearch}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Borrar">
              <i className="ph ph-x"></i>
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile: search variant ────────────────────────────── */}
      <div className="header__mobile-search" ref={mobileSearchRef}>
        <button className="header__mobile-page__back" onClick={closeSearch} aria-label="Volver">
          <i className="ph ph-arrow-left"></i>
        </button>
        <div className="header__mobile-search__bar">
          <img src="/icons/buscar.svg" alt="" className="search-icon header-icon-img" />
          <input
            type="text"
            placeholder="Buscar productos o marcas"
            autoFocus={searchMode}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSuggestionsOpen(true)}
            onClick={() => setSuggestionsOpen(true)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Borrar">
              <i className="ph ph-x"></i>
            </button>
          )}
        </div>
        {suggestionsOpen && <SearchSuggestions onChipClick={setSearchQuery} />}
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
        {searchMode ? (
          <>
            <div className="header-search-left">
              <button className="header-search-back" onClick={closeSearch} aria-label="Volver">
                <i className="ph ph-arrow-left"></i>
              </button>
              <span className="header-search-title">Buscar</span>
            </div>
            <div className="search search--expanded" ref={desktopSearchRef}>
              <img src="/icons/buscar.svg" alt="" className="search-icon header-icon-img" />
              <input
                type="text"
                placeholder="Buscar productos o marcas"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onClick={() => setSuggestionsOpen(true)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Borrar búsqueda">
                  <i className="ph ph-x"></i>
                </button>
              )}
              {suggestionsOpen && <SearchSuggestions onChipClick={setSearchQuery} />}
            </div>
            <div className="header-search-right header-icons">
              <a href="#" className="header-icon-btn" aria-label="Notificaciones">
                <span className="icon-wrap">
                  <img src="/icons/notificaciones.svg" alt="" className="header-icon-img" />
                  <span className="notif-dot">1</span>
                </span>
              </a>
              <a href="#" className="header-icon-btn" aria-label="Favoritos">
                <img src="/icons/favoritos.svg" alt="" className="header-icon-img" />
              </a>
              <a href="#" className="header-icon-btn" aria-label="Carrito">
                <span className="icon-wrap">
                  <img src="/icons/carrito.svg" alt="" className="header-icon-img" />
                  <span className="notif-dot">1</span>
                </span>
              </a>
              <button className="header-user-btn" aria-label="Mi cuenta" onClick={openAccount}>
                <span className="header-user-name">{user.name}</span>
                <div className="header-user-avatar">
                  {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.initial}
                </div>
              </button>
            </div>
          </>
        ) : scrolledDown && variant === 'home' ? (
          <>
            <div className="header-left">
              <Link to={brand.path('/')} className="logo">
                <BrandLogo className="logo-img" />
              </Link>
            </div>
            <div className="search header-search--scrolled" ref={desktopSearchRef}>
              <img src="/icons/buscar.svg" alt="" className="search-icon header-icon-img" />
              <input
                type="text"
                placeholder="Buscar productos o marcas"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSuggestionsOpen(true)}
                onClick={() => setSuggestionsOpen(true)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Borrar búsqueda">
                  <i className="ph ph-x"></i>
                </button>
              )}
              {suggestionsOpen && <SearchSuggestions onChipClick={setSearchQuery} />}
            </div>
            <div className="header-icons">
              <a href="#" className="header-icon-btn" aria-label="Notificaciones">
                <span className="icon-wrap">
                  <img src="/icons/notificaciones.svg" alt="" className="header-icon-img" />
                  <span className="notif-dot">1</span>
                </span>
              </a>
              <a href="#" className="header-icon-btn" aria-label="Favoritos">
                <img src="/icons/favoritos.svg" alt="" className="header-icon-img" />
              </a>
              <a href="#" className="header-icon-btn" aria-label="Carrito">
                <span className="icon-wrap">
                  <img src="/icons/carrito.svg" alt="" className="header-icon-img" />
                  <span className="notif-dot">1</span>
                </span>
              </a>
              <button className="header-user-btn" aria-label="Mi cuenta" onClick={openAccount}>
                <span className="header-user-name">{user.name}</span>
                <div className="header-user-avatar">
                  {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.initial}
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="header-left">
              <Link to={brand.path('/')} className="logo">
                <BrandLogo className="logo-img" />
              </Link>
            </div>
            <a href="#" className="header-cta">Ampliar el límite de tus tarjetas</a>
            <div className="header-icons">
              <button className="header-icon-btn" onClick={openSearch} aria-label="Buscar">
                <img src="/icons/buscar.svg" alt="" className="header-icon-img" />
              </button>
              <a href="#" className="header-icon-btn" aria-label="Notificaciones">
                <span className="icon-wrap">
                  <img src="/icons/notificaciones.svg" alt="" className="header-icon-img" />
                  <span className="notif-dot">1</span>
                </span>
              </a>
              <a href="#" className="header-icon-btn" aria-label="Favoritos">
                <img src="/icons/favoritos.svg" alt="" className="header-icon-img" />
              </a>
              <a href="#" className="header-icon-btn" aria-label="Carrito">
                <span className="icon-wrap">
                  <img src="/icons/carrito.svg" alt="" className="header-icon-img" />
                  <span className="notif-dot">1</span>
                </span>
              </a>
              <button className="header-user-btn" aria-label="Mi cuenta" onClick={openAccount}>
                <span className="header-user-name">{user.name}</span>
                <div className="header-user-avatar">
                  {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.initial}
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Desktop / Tablet: bottom nav ─────────────────────── */}
      <div className="header-bottom">
        <div className="nav-left">
          <div className="nav-categorias">
            Categorías
            <i className="ph ph-caret-down" style={{ fontSize: '16px' }}></i>
          </div>
          <nav className="nav-list">
            <Link className={`nav-item${isViajes ? ' active' : ''}`} to={brand.path('/para-tu-viaje')}>
              {!isViajes && <span className="badge-new">¡Nuevo!</span>}
              Viajes
            </Link>
            <a className="nav-item" href="#">Ofertas del día</a>
            <a className="nav-item" href="#">Seguros</a>
          </nav>
        </div>
        <div className="user-nav">
          <button className="user-nav-item" onClick={openAccount}>
            <i className="ph ph-user"></i>
            <span>
              {user.name.split(' ')[0]}
              <i className="ph ph-caret-down" style={{ fontSize: '12px' }}></i>
            </span>
          </button>
          <a className="user-nav-item" href="#">
            <img src="/icons/favoritos.svg" alt="" className="header-icon-img" />
            <span>Favoritos</span>
          </a>
          <a className="user-nav-item" href="#">
            <span className="icon-wrap">
              <img src="/icons/notificaciones.svg" alt="" className="header-icon-img" />
              <span className="notif-dot">1</span>
            </span>
            <span>Notificaciones</span>
          </a>
          <a className="user-nav-item" href="#">
            <span className="icon-wrap">
              <img src="/icons/carrito.svg" alt="" className="header-icon-img" />
              <span className="notif-dot">1</span>
            </span>
            <span>Carrito</span>
          </a>
        </div>
      </div>

      <AccountPanel open={accountOpen} onClose={() => setAccountOpen(false)} user={user} onOpenAssistant={onOpenAssistant} />

    </header>
  );
}
