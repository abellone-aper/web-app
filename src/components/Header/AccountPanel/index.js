import './AccountPanel.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBrand } from '../../../brands/BrandContext';

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
              <i className="ph ph-heart account-panel-item-icon"></i>
              <span>Favoritos</span>
            </a>
            <a href="#" className="account-panel-item">
              <span className="account-panel-item-icon-wrap">
                <i className="ph ph-bell account-panel-item-icon"></i>
                <span className="account-panel-notif-dot">1</span>
              </span>
              <span>Notificaciones</span>
            </a>
            <a href="#" className="account-panel-item">
              <i className="ph ph-package account-panel-item-icon"></i>
              <span>Pedidos</span>
            </a>
            <a href="#" className="account-panel-item">
              <i className="ph ph-coins account-panel-item-icon"></i>
              <span>Puntos</span>
            </a>
            <a href="#" className="account-panel-item">
              <i className="ph ph-hand-coins account-panel-item-icon"></i>
              <span>Préstamos</span>
            </a>
            <a href="#" className="account-panel-item">
              <i className="ph ph-shield-check account-panel-item-icon"></i>
              <span>Seguros</span>
            </a>
          </nav>

          <div className="account-panel-divider" />

          <nav className="account-panel-list">
            <a href="#" className="account-panel-item">
              <i className="ph ph-lightbulb account-panel-item-icon"></i>
              <span>Recomendaciones</span>
            </a>
            <a href="#" className="account-panel-item">
              <i className="ph ph-tag account-panel-item-icon"></i>
              <span>Cupones</span>
            </a>
          </nav>

          <div className="account-panel-divider" />

          <button type="button" className="account-panel-item account-panel-logout" onClick={onClose}>
            <i className="ph ph-sign-out account-panel-item-icon"></i>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
