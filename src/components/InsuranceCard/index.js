import PrimaryButton from '../Buttons/PrimaryButton';
import './InsuranceCard.css';

export default function InsuranceCard({ variant = 'card', imgSrc, features }) {
  if (variant === 'overlay') {
    return (
      <div className="insurance-card--overlay">
        <img src={imgSrc} alt="Seguro de viaje" className="insurance-bg" />
        <div className="insurance-body">
          <p className="insurance-sub">Recomendado para el viaje</p>
          <p className="insurance-title">Agregá un seguro de viaje y viajá más tranquila</p>
          <PrimaryButton style={{ alignSelf: 'flex-start' }}>Contratar cobertura</PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="insurance-card--card">
      <div className="insurance-media">
        <img src={imgSrc} alt="Seguro de viaje" />
      </div>
      <div className="insurance-body">
        <p className="insurance-sub">Recomendado para el viaje</p>
        <p className="insurance-title">Agregá un seguro de viaje y viajá más tranquila</p>
        {features && (
          <div className="insurance-features">
            {features.map(f => (
              <span key={f}><i className="ph-fill ph-check-circle"></i> {f}</span>
            ))}
          </div>
        )}
        <PrimaryButton style={{ alignSelf: 'flex-start' }}>Contratar cobertura</PrimaryButton>
      </div>
    </div>
  );
}
