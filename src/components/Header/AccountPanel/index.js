import './AccountPanel.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBrand } from '../../../brands/BrandContext';

function MaskIcon({ src }) {
  return (
    <span
      className="account-panel-icon"
      style={{ WebkitMaskImage: `url('${src}')`, maskImage: `url('${src}')` }}
    />
  );
}

export default function AccountPanel({ open, onClose, user, onOpenAssistant }) {
  const brand = useBrand();
  const firstName = user.name.split(' ')[0];

  function handleAssistantClick() {
    onClose();
    onOpenAssistant?.();
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    document.body.classList.toggle('account-panel-open', open);
    return () => document.body.classList.remove('account-panel-open');
  }, [open]);

  return createPortal(
    <>
      <div className={`account-panel-backdrop${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`account-panel${open ? ' open' : ''}`}>
        <div className="account-panel-header">
          <div className="account-panel-user">
            <div className="account-panel-avatar">
              {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.initial}
            </div>
            <span className="account-panel-greeting">Hola, {firstName}</span>
          </div>
          <button className="account-panel-close" onClick={onClose} aria-label="Cerrar">
            <i className="ph ph-x"></i>
          </button>
        </div>

        <div className="account-panel-body">
          <button type="button" className="account-panel-assistant" onClick={handleAssistantClick}>
            <i className="ph-fill ph-sparkle account-panel-assistant-icon"></i>
            <span className="account-panel-assistant-text">
              <span className="account-panel-assistant-title">Asistente inteligente</span>
              <span className="account-panel-assistant-sub">{brand.storeName}</span>
            </span>
          </button>

          <nav className="account-panel-list">
            <a href="#" className="account-panel-item">
              <MaskIcon src="/icons/favoritos.svg" />
              <span>Favoritos</span>
            </a>
            <a href="#" className="account-panel-item">
              <span className="account-panel-item-icon-wrap">
                <MaskIcon src="/icons/notificaciones.svg" />
                <span className="account-panel-notif-dot">1</span>
              </span>
              <span>Notificaciones</span>
            </a>
            <a href="#" className="account-panel-item">
              <MaskIcon src="/icons/pedidos.svg" />
              <span>Pedidos</span>
            </a>
            <a href="#" className="account-panel-item">
              <MaskIcon src="/icons/puntos.svg" />
              <span>Puntos</span>
            </a>
            <a href="#" className="account-panel-item">
              <MaskIcon src="/icons/prestamos.svg" />
              <span>Préstamos</span>
            </a>
            <a href="#" className="account-panel-item">
              <MaskIcon src="/icons/seguros.svg" />
              <span>Seguros</span>
            </a>
          </nav>

          <div className="account-panel-divider" />

          <nav className="account-panel-list">
            <a href="#" className="account-panel-item account-panel-item--reverse">
              <span>Recomendaciones</span>
              <MaskIcon src="/icons/sugerencias.svg" />
            </a>
            <a href="#" className="account-panel-item account-panel-item--reverse">
              <span>Cupones</span>
              <MaskIcon src="/icons/descuento.svg" />
            </a>
          </nav>

          <div className="account-panel-divider" />

          <button type="button" className="account-panel-item account-panel-logout" onClick={onClose}>
            <MaskIcon src="/icons/cerrar-sesión.svg" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
