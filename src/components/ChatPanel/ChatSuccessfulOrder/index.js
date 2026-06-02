import './ChatSuccessfulOrder.css';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { getPublicUrl } from '../../../lib/storage';

const PRODUCT = {
  img: getPublicUrl('Imagenes', 'termo.png'),
  name: 'Termo Stanley Classic Legendary',
  price: '$26.525',
};

export default function ChatSuccessfulOrder({ paymentMethod = 'Tarjeta VISA terminada en 4567', onGoToOrders }) {
  return (
    <div className="chat-success-order">
      <div className="chat-success-order-header">
        <i className="ph-fill ph-check-circle chat-success-order-icon" />
        <p className="chat-success-order-title">Compra realizada con éxito</p>
        <p className="chat-success-order-subtitle">{paymentMethod}</p>
      </div>
      <div className="chat-success-order-product">
        <img src={PRODUCT.img} alt={PRODUCT.name} className="chat-success-order-img" />
        <div className="chat-success-order-info">
          <p className="chat-success-order-name">{PRODUCT.name}</p>
          <p className="chat-success-order-price">{PRODUCT.price}</p>
        </div>
      </div>
      <PrimaryButton style={{ width: '100%' }} onClick={onGoToOrders}>Ir a mis compras</PrimaryButton>
    </div>
  );
}
