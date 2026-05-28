import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isViajes = location.pathname === '/para-tu-viaje' || location.pathname.startsWith('/hospedaje');

  return (
    <header className="header">
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
          <a href="#" className="header-icon-btn">
            <span className="icon-wrap"><i className="ph ph-bell" style={{fontSize:'22px'}}></i><span className="notif-dot">1</span></span>
          </a>
          <a href="#" className="header-icon-btn">
            <i className="ph ph-heart" style={{fontSize:'22px'}}></i>
          </a>
          <a href="#" className="header-icon-btn">
            <span className="icon-wrap"><i className="ph ph-shopping-cart" style={{fontSize:'22px'}}></i><span className="notif-dot">1</span></span>
          </a>
          <a href="#" className="header-icon-btn">
            <i className="ph ph-list" style={{fontSize:'22px'}}></i>
          </a>
        </div>
      </div>

      <div className="header-bottom">
        <div className="nav-left">
          <div className="nav-categorias">
            Categorías
            <i className="ph ph-caret-down" style={{fontSize:'16px'}}></i>
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
            <span>Sol <i className="ph ph-caret-down" style={{fontSize:'12px'}}></i></span>
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
