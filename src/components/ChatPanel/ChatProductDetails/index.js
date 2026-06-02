import './ChatProductDetails.css';

export default function ChatProductDetails({ name = 'Termo Stanley Classic Legendary' }) {
  return (
    <div className="chat-spec-card chat-msg-enter">
      <div className="chat-spec-hd">
        <p className="chat-spec-name">{name}</p>
        <p className="chat-spec-brand">Stanley · Modelo 10-01612-024</p>
        <div className="chat-spec-rating">
          <span className="chat-spec-stars">★★★★★</span>
          <span className="chat-spec-rating-num">4.8</span>
          <span className="chat-spec-rating-count">· 312 opiniones</span>
        </div>
        <div className="chat-spec-pills">
          <span className="chat-spec-pill warranty"><i className="ph ph-shield-check" style={{fontSize:'10px'}}></i> Garantía vitalicia</span>
          <span className="chat-spec-pill bpa">Sin BPA</span>
          <span className="chat-spec-pill bpa">Acero 18/8</span>
        </div>
      </div>
      <div className="chat-spec-temps">
        <div className="chat-spec-temp-badge hot"><i className="ph ph-fire"></i><div><strong>24 hs</strong><span>caliente</span></div></div>
        <div className="chat-spec-temp-divider"></div>
        <div className="chat-spec-temp-badge cold"><i className="ph ph-snowflake"></i><div><strong>24 hs</strong><span>frío</span></div></div>
        <div className="chat-spec-temp-divider"></div>
        <div className="chat-spec-temp-badge ice"><i className="ph ph-snowflake"></i><div><strong>4 días</strong><span>hielo</span></div></div>
      </div>
      <div className="chat-spec-section">
        <div className="chat-spec-section-label">Dimensiones</div>
        <div className="chat-spec-grid">
          {[['Capacidad','1.9 L'],['Altura','26 cm'],['Peso','540 g'],['Diámetro','9.5 cm'],['Tapa','237 ml'],['Boca','Estándar']].map(([k,v]) => (
            <div key={k} className="chat-spec-cell"><span className="chat-spec-cell-label">{k}</span><span className="chat-spec-cell-value">{v}</span></div>
          ))}
        </div>
      </div>
      <div className="chat-spec-section">
        <div className="chat-spec-section-label">Construcción</div>
        <div className="chat-spec-rows">
          {[['Cuerpo','Acero inoxidable 18/8'],['Tapa','Acero inoxidable'],['Aislación','Doble pared al vacío'],['Apto lavavajillas','No'],['Color','Hammertone Green']].map(([k,v]) => (
            <div key={k} className="chat-spec-row"><span className="chat-spec-row-key">{k}</span><span className={`chat-spec-row-val${k==='Apto lavavajillas'?' chat-spec-row-val--no':''}`}>{v}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
