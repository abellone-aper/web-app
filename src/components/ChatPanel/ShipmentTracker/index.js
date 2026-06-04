import './ShipmentTracker.css';

const STEPS = [
  { key: 'realizado',  label: 'En preparación' },
  { key: 'despachado', label: 'Despachado' },
  { key: 'en_camino',  label: 'En camino' },
  { key: 'entregado',  label: 'Entregado' },
];

export default function ShipmentTracker({
  status = 'en_camino',
  carrier,
  trackingNumber,
  estimatedDelivery = null,
}) {
  const currentIndex = STEPS.findIndex(s => s.key === status);
  const fillPercent = (currentIndex / (STEPS.length - 1)) * 100;

  return (
    <div className="shipment-tracker">
      <div className="shipment-tracker-notice">
        <i className="ph ph-calendar-blank shipment-tracker-notice-icon" />
        <p className="shipment-tracker-notice-text">
          {estimatedDelivery ? (
            <>Fecha de entrega estimada: <strong>{estimatedDelivery}</strong></>
          ) : (
            'La fecha de entrega estimada estará disponible en cuanto la informe el transportista.'
          )}
        </p>
      </div>

      <div className="shipment-tracker-steps">
        <div className="shipment-tracker-track">
          <div
            className="shipment-tracker-fill"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        {STEPS.map((step, i) => {
          const isDone   = i < currentIndex;
          const isActive = i === currentIndex;
          return (
            <div
              key={step.key}
              className={[
                'shipment-tracker-step',
                isDone   && 'shipment-tracker-step--done',
                isActive && 'shipment-tracker-step--active',
                !isDone && !isActive && 'shipment-tracker-step--pending',
              ].filter(Boolean).join(' ')}
            >
              <div className="shipment-tracker-dot">
                {isActive && <i className="ph-fill ph-truck shipment-tracker-dot-icon" />}
              </div>
              <span className="shipment-tracker-label">{step.label}</span>
            </div>
          );
        })}
      </div>

      {(carrier || trackingNumber) && (
        <p className="shipment-tracker-footer">
          {carrier && `Enviado con ${carrier}`}
          {carrier && trackingNumber && ' · '}
          {trackingNumber && `Nº ${trackingNumber}`}
        </p>
      )}
    </div>
  );
}
