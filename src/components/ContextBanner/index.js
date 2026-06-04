import './ContextBanner.css';

export default function ContextBanner({ icon, sub, title, linkText, href = '#' }) {
  return (
    <div className="ctx-banner">
      <div className="ctx-banner-icon">
        <img src={icon} alt="" width={24} height={24} />
      </div>
      <div className="ctx-banner-body">
        <p className="ctx-banner-sub">{sub}</p>
        <p className="ctx-banner-title">{title}</p>
        {linkText && <a href={href} className="ctx-banner-link">{linkText}</a>}
      </div>
    </div>
  );
}
