import './StatusCard.css';

export default function StatusCard({ card }) {
  const { label, title, img, icon, href } = card;

  return (
    <a href={href || '#'} className="status-card">
      <div className="status-card-image">
        {img && <img src={img} alt={title} />}
        {!img && icon && <i className={`ph ${icon}`}></i>}
      </div>
      <div className="status-card-body">
        <p className="status-card-label">{label}</p>
        <p className="status-card-title">{title}</p>
      </div>
      <i className="ph ph-caret-right status-card-caret"></i>
    </a>
  );
}
