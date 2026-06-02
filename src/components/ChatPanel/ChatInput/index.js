import './ChatInput.css';

export default function ChatInput({ awaitingCvv, cvvError, inputVal, inputRef, onChange, onSend, hidden }) {
  return (
    <div className={`chat-input-bar${hidden ? ' chat-input-bar--hidden' : ''}`} id="chatMainInputBar">
      <input
        ref={inputRef}
        type={awaitingCvv ? 'password' : 'text'}
        inputMode={awaitingCvv ? 'numeric' : undefined}
        maxLength={awaitingCvv ? 3 : undefined}
        className="chat-input"
        style={cvvError ? { borderColor: 'var(--promotion-primary)' } : {}}
        placeholder={awaitingCvv ? (cvvError ? 'Ingresá 3 dígitos' : 'Código de 3 dígitos...') : '¿En qué te ayudo hoy?'}
        value={inputVal}
        onChange={onChange}
        onKeyDown={e => { if (e.key === 'Enter') onSend(); }}
      />
      <button className="chat-mic-btn" aria-label="Enviar" onClick={onSend}>
        <i
          className={`ph ${inputVal.trim() || awaitingCvv ? 'ph-paper-plane-right' : 'ph-microphone'}`}
          style={{ fontSize: '20px' }}
        ></i>
      </button>
    </div>
  );
}
