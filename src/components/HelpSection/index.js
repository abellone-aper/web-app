import './HelpSection.css';
import { getPublicUrl } from '../../lib/storage';
import useReveal from '../../hooks/useReveal';

const HELP_ITEMS = [
  { iconPh: 'ph-question',                label: 'Preguntas frecuentes' },
  { iconPh: 'ph-chat-circle-dots',         label: 'Chat con soporte' },
  { iconPh: 'ph-arrows-counter-clockwise', label: 'Cambios y devoluciones' },
  { iconPh: 'ph-truck',                    label: 'Seguimiento de envíos' },
  { iconPh: 'ph-calendar-check',           label: 'Reprogramar una entrega' },
  { iconPh: 'ph-warning-circle',           label: 'Reportá un problema' },
];

const LOGO_DATA_FISCAL = getPublicUrl('Imagenes', 'data fiscal.png');
const LOGO_SSN         = getPublicUrl('Imagenes', 'SSN.png');
const LOGO_CACE        = getPublicUrl('Imagenes', 'cace.png');

export default function HelpSection() {
  const [revealRef, revealVisible] = useReveal();
  return (
    <section ref={revealRef} className={`help-section reveal${revealVisible ? ' is-visible' : ''}`}>
      <div className="help-inner">
        <h2 className="help-title">Ayuda</h2>

        <div className="help-grid">
          {HELP_ITEMS.map((item, i) => (
            <a key={item.label} href="#" className="help-item-card mount-in" style={{'--index': i}}>
              <i className={`ph ${item.iconPh} help-item-icon`}></i>
              <span className="help-item-label">{item.label}</span>
              <i className="ph ph-caret-right help-item-chevron"></i>
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
