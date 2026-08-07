import './ChatHeader.css';
import { useBrand } from '../../../brands/BrandContext';

export default function ChatHeader({
  histOpen,
  histDetailTitle,
  showOptionsMenu,
  onClose,
  onBack,
  onToggleOptions,
  onOpenHistory,
  onNewChat,
  hotelTabOpen,
  offerTabClosed,
  activeTabId,
  onTabChange,
  onCloseOfferTab,
  onCloseHotelTab,
}) {
  const brand = useBrand();
  return (
    <>
      <div className="chat-panel-header">
        <div className="chat-header-left">
          {histOpen ? (
            <button className="chat-header-icon-btn" aria-label="Volver" onClick={onBack}>
              <i className="ph ph-arrow-left" style={{ fontSize: '20px' }}></i>
            </button>
          ) : (
            <div className="chat-header-fab">
              <i className="ph-fill ph-sparkle chat-header-fab-icon"></i>
            </div>
          )}
          <div className="chat-header-info">
            <span className="chat-header-name">
              {histOpen ? (histDetailTitle || 'Historial') : 'Hablemos'}
            </span>
            {!histOpen && <span className="chat-header-sub">{brand.storeName}</span>}
          </div>
        </div>

        <div className="chat-header-right">
          {!histOpen && (
            <button className="chat-header-icon-btn" aria-label="Opciones" onClick={onToggleOptions}>
              <i className="ph ph-dots-three-vertical" style={{ fontSize: '20px' }}></i>
            </button>
          )}
          <button className="chat-header-icon-btn" aria-label="Cerrar" onClick={onClose}>
            <i className="ph ph-x chat-header-close-icon"></i>
          </button>
        </div>
      </div>

      {showOptionsMenu && (
        <div className="chat-options-menu open">
          <button className="chat-options-item" onClick={onOpenHistory}>
            <i className="ph ph-clock-clockwise" style={{ fontSize: '16px' }}></i> Historial
          </button>
          <button className="chat-options-item" onClick={onNewChat}>
            <i className="ph ph-plus" style={{ fontSize: '16px' }}></i> Nuevo chat
          </button>
        </div>
      )}

      {hotelTabOpen && !offerTabClosed && !histOpen && (
        <div className="chat-tabs">
          <button
            className={`chat-tab${activeTabId === 'offer' ? ' chat-tab--active' : ''}`}
            onClick={() => onTabChange('offer')}
          >
            <span>Oferta imperdible</span>
            <span className="chat-tab-close" onClick={e => { e.stopPropagation(); onCloseOfferTab(); }}>
              <i className="ph ph-x chat-tab-close-icon" style={{ color: activeTabId === 'offer' ? 'var(--action-secondary-pressed-text)' : 'var(--neutral-seven)' }}></i>
            </span>
          </button>
          <button
            className={`chat-tab chat-tab--hotel${activeTabId === 'hotel' ? ' chat-tab--active' : ''}`}
            onClick={() => onTabChange('hotel')}
          >
            <span>Reservar hospedaje</span>
            <span className="chat-tab-close" onClick={e => { e.stopPropagation(); onCloseHotelTab(); }}>
              <i className="ph ph-x chat-tab-close-icon" style={{ color: activeTabId === 'hotel' ? 'var(--action-secondary-pressed-text)' : 'var(--neutral-seven)' }}></i>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
