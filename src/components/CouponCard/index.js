import './CouponCard.css';

export default function CouponCard({ coupons, toggles, onToggle }) {
  return (
    <div className="coupon-card">
      <div className="coupon-card-header">
        <span className="coupon-card-title">Cupones a vencer</span>
        <a href="#" className="coupon-card-link">Ver todos</a>
      </div>
      <div className="coupon-card-list">
        {coupons.map((c, i) => (
          <div key={c.title} className="coupon-item">
            <div className="coupon-icon">
              {c.icon
                ? <img src={c.icon} alt="" />
                : <i className={c.iconPh}></i>
              }
            </div>
            <div className="coupon-info">
              <p className="coupon-name">{c.title}</p>
              <p className="coupon-sub">{c.subtitle}</p>
              <span className="coupon-badge">{c.expires}</span>
            </div>
            <button
              className={`coupon-toggle${toggles[i] ? '' : ' off'}`}
              onClick={() => onToggle(i)}
              aria-label="Activar cupón"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
