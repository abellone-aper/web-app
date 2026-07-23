import './ContextBanner.css';

export default function ContextBanner({ icon, sub, title, linkText, href = '#' }) {
  return (
    <div className="ctx-banner">
      <div className="ctx-banner-icon">
        <span
          className="ctx-banner-icon-mask"
          style={{ WebkitMaskImage: `url('${icon}')`, maskImage: `url('${icon}')` }}
        />
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
