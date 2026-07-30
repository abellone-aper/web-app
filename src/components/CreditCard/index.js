import './CreditCard.css';

export default function CreditCard({ label, amount, sub, btnLabel = 'Solicitar crédito', onRequest }) {
  return (
    <div className="credit-card">
      <p className="credit-label">{label}</p>
      <div className="credit-body">
        <div className="credit-info">
          <p className="credit-amount">{amount}</p>
          <p className="credit-sub">{sub}</p>
        </div>
        <button className="credit-btn" onClick={onRequest}>{btnLabel}</button>
      </div>
    </div>
  );
}
