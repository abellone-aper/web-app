import './ChatCvvCard.css';

export default function ChatCvvCard({ cvvValue = '' }) {
  const raw = cvvValue.replace(/\D/g, '').slice(0, 3);
  const digits = [0, 1, 2].map(i => raw[i] || '');

  return (
    <div className="cvv-card chat-msg-enter">
      <div className="cvv-card-top">
        <div className="cvv-card-chip" />
      </div>
      <div className="cvv-card-stripe" />
      <div className="cvv-card-sig-area">
        <div className="cvv-card-sig-strip">
          <div className="cvv-card-sig-lines">
            {[...Array(5)].map((_, i) => <div key={i} className="cvv-card-sig-line" />)}
          </div>
          <div className="cvv-card-cvv-box">
            <span className="cvv-card-cvv-label">CVV</span>
            <div className="cvv-card-cvv-digits">
              {digits.map((d, i) => (
                <span key={i} className={`cvv-card-cvv-digit${d ? ' cvv-card-cvv-digit--filled' : ''}`}>
                  {d || '•'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="cvv-card-footer">
        <span className="cvv-card-number">•••• •••• •••• 4567</span>
        <span className="cvv-card-brand">VISA</span>
      </div>
    </div>
  );
}
