import './HelpSection.css';
import { getPublicUrl } from '../../lib/storage';

const HELP_ITEMS = [
  { icon: '/icons/preguntas frecuentes.svg', label: 'Preguntas frecuentes' },
  { icon: '/icons/chat soporte.svg',         label: 'Chat con soporte' },
  { icon: '/icons/cambios y devoluciones.svg', label: 'Cambios y devoluciones' },
  { icon: '/icons/seguimiento de envios.svg', label: 'Seguimiento de envíos' },
  { icon: '/icons/reprogramar.svg',           label: 'Reprogramar una entrega' },
  { icon: '/icons/reportar.svg',              label: 'Reportá un problema' },
];

const LOGO_DATA_FISCAL = getPublicUrl('Imagenes', 'data fiscal.png');
const LOGO_SSN         = getPublicUrl('Imagenes', 'SSN.png');
const LOGO_CACE        = getPublicUrl('Imagenes', 'cace.png');

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
              <img src="/icons/flecha derecha.svg" alt="" className="help-item-chevron" />
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
