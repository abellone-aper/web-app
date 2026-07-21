import './ChatHeader.css';
import { useBrand } from '../../../brands/BrandContext';


const MASK_CERRAR_NEUTRAL = {
  backgroundColor: 'var(--neutral-eight)',
  WebkitMaskImage: "url('/icons/cerrar.svg')",
  maskImage: "url('/icons/cerrar.svg')",
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

function maskCerrar(color) {
  return {
    backgroundColor: color,
    WebkitMaskImage: "url('/icons/cerrar.svg')",
    maskImage: "url('/icons/cerrar.svg')",
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  };
}

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
              <span
                className="mnav-icon chat-header-fab-icon"
                style={{ WebkitMaskImage: "url('/icons/chat.svg')", maskImage: "url('/icons/chat.svg')" }}
              ></span>
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
            <span className="chat-header-close-icon" style={MASK_CERRAR_NEUTRAL} />
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
              <span className="chat-tab-close-icon" style={maskCerrar(activeTabId === 'offer' ? 'var(--action-secondary-pressed-text)' : 'var(--neutral-seven)')} />
            </span>
          </button>
          <button
            className={`chat-tab chat-tab--hotel${activeTabId === 'hotel' ? ' chat-tab--active' : ''}`}
            onClick={() => onTabChange('hotel')}
          >
            <span>Reservar hospedaje</span>
            <span className="chat-tab-close" onClick={e => { e.stopPropagation(); onCloseHotelTab(); }}>
              <span className="chat-tab-close-icon" style={maskCerrar(activeTabId === 'hotel' ? 'var(--action-secondary-pressed-text)' : 'var(--neutral-seven)')} />
            </span>
          </button>
        </div>
      )}
    </>
  );
}
