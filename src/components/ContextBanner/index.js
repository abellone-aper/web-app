import './ContextBanner.css';

export default function ContextBanner({ icon, sub, title, linkText, href = '#' }) {
  return (
    <div className="ctx-banner">
      <div className="ctx-banner-icon">
        <i className={`ph ${icon} ctx-banner-icon-mask`}></i>
      </div>
      <div className="ctx-banner-body">
        <div className="ctx-banner-text">
          <p className="ctx-banner-sub">{sub}</p>
          <p className="ctx-banner-title">{title}</p>
        </div>
        {linkText && <a href={href} className="ctx-banner-link">{linkText}</a>}
      </div>
    </div>
  );
}
