import './ChatMessage.css';

export default function ChatMessage({ children, label = 'Tienda', animated = false }) {
  return (
    <div className={`chat-message${animated ? ' chat-msg-enter' : ''}`}>
      <div className="chat-message-header">
        <i className="ph ph-storefront chat-message-icon"></i>
        <span className="chat-message-label">{label}</span>
      </div>
      <p className="chat-message-text">{children}</p>
    </div>
  );
}
