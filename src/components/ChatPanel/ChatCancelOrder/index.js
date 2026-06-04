import { useState } from 'react';
import './ChatCancelOrder.css';
import PrimaryButton from '../../Buttons/PrimaryButton';
import SecondaryButton from '../../Buttons/SecondaryButton';

export default function ChatCancelOrder({ product, onConfirm, onCancel }) {
  const [confirmed, setConfirmed] = useState(false);

  function handleConfirm() {
    setConfirmed(true);
    onConfirm?.();
  }

  if (confirmed) {
    return (
      <div className="chat-cancel-order chat-cancel-order--done">
        <div className="chat-cancel-done-header">
          <i className="ph-fill ph-x-circle chat-cancel-done-icon" />
          <p className="chat-cancel-done-title">Compra cancelada</p>
          <p className="chat-cancel-done-subtitle">El reintegro se acreditará en 3 a 5 días hábiles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-cancel-order">
      <div className="chat-cancel-order-header">
        <div className="chat-cancel-order-icon-wrap">
          <i className="ph ph-warning" />
        </div>
        <div className="chat-cancel-order-titles">
          <p className="chat-cancel-order-title">¿Cancelar esta compra?</p>
          <p className="chat-cancel-order-subtitle">Esta acción no se puede deshacer</p>
        </div>
      </div>
      <div className="chat-cancel-order-product">
        <img className="chat-cancel-order-img" src={product.img} alt={product.name} />
        <div className="chat-cancel-order-info">
          <p className="chat-cancel-order-name">{product.name}</p>
          <p className="chat-cancel-order-price">{product.price}</p>
        </div>
      </div>
      <div className="chat-cancel-order-actions">
        <PrimaryButton onClick={handleConfirm} style={{ width: '100%' }}>
          Cancelar compra
        </PrimaryButton>
        <SecondaryButton onClick={onCancel} style={{ width: '100%' }}>
          No, volver al pedido
        </SecondaryButton>
      </div>
    </div>
  );
}
