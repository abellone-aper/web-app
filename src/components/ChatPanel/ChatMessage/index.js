import './ChatMessage.css';

const iconStyle = {
  backgroundColor: 'var(--neutral-seven)',
  WebkitMaskImage: "url('/icons/mensaje-tienda.svg')",
  maskImage: "url('/icons/mensaje-tienda.svg')",
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

export default function ChatMessage({ children, label = 'Tienda', animated = false }) {
  return (
    <div className={`chat-message${animated ? ' chat-msg-enter' : ''}`}>
      <div className="chat-message-header">
        <span className="chat-message-icon" style={iconStyle} />
        <span className="chat-message-label">{label}</span>
      </div>
      <p className="chat-message-text">{children}</p>
    </div>
  );
}
