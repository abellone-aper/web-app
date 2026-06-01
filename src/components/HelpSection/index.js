import './HelpSection.css';

const HELP_ITEMS = [
  { icon: '/icons/preguntas frecuentes.svg', label: 'Preguntas frecuentes' },
  { icon: '/icons/chat soporte.svg',         label: 'Chat con soporte' },
  { icon: '/icons/cambios y devoluciones.svg', label: 'Cambios y devoluciones' },
  { icon: '/icons/seguimiento de envios.svg', label: 'Seguimiento de envíos' },
  { icon: '/icons/reprogramar.svg',           label: 'Reprogramar una entrega' },
  { icon: '/icons/reportar.svg',              label: 'Reportá un problema' },
];

const LOGO_DATA_FISCAL = 'https://www.figma.com/api/mcp/asset/d40b218d-0c14-4cd9-915e-7dd766f8a351';
const LOGO_SSN         = 'https://www.figma.com/api/mcp/asset/529e42dd-d184-4151-8e8d-69e9a97df69d';
const LOGO_CACE        = 'https://www.figma.com/api/mcp/asset/96bdc94a-9115-4277-b3aa-76af114882f5';

export default function HelpSection() {
  return (
    <section className="help-section">
      <div className="help-inner">
        <h2 className="help-title">Ayuda</h2>

        <div className="help-grid">
          {HELP_ITEMS.map(item => (
            <a key={item.label} href="#" className="help-item-card">
              <img src={item.icon} alt="" className="help-item-icon" />
              <span className="help-item-label">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="help-bottom">
          <div className="help-arrepentimiento">
            <p className="help-arrepentimiento-title">¿Te arrepentiste de una compra?</p>
            <button className="help-arrepentimiento-btn">Botón de arrepentimiento</button>
          </div>

          <div className="help-protegidas">
            <p className="help-protegidas-text">Compras protegidas y reguladas</p>
            <div className="help-logos">
              <img src={LOGO_DATA_FISCAL} alt="Data Fiscal" className="help-logo" />
              <img src={LOGO_SSN}         alt="SSN"         className="help-logo" />
              <img src={LOGO_CACE}        alt="CACE"        className="help-logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
