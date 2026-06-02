import './ChatOffer.css';
import PrimaryButton from '../../Buttons/PrimaryButton';
import SecondaryButton from '../../Buttons/SecondaryButton';
import LinkButton from '../../Buttons/LinkButton';
import { getPublicUrl } from '../../../lib/storage';

const STORE_OFFER = {
  img: getPublicUrl('Imagenes', 'termo.png'),
  name: 'Termo Stanley Classic Legendary',
  price: '$26.525',
  discount: '15% de descuento',
};

export default function ChatOffer({ variant, onBuy, onMoreDetail, buyDisabled, moreDetailDisabled }) {
  if (variant === 'tienda') {
    return (
      <div className="chat-offer-card chat-offer-card--tienda">
        <p className="chat-offer-title">Oferta imperdible</p>
        <div className="chat-offer-product-box">
          <div className="chat-offer-product">
            <img src={STORE_OFFER.img} alt={STORE_OFFER.name} className="chat-offer-img" />
            <div className="chat-offer-info">
              <span className="chat-offer-badge">{STORE_OFFER.discount}</span>
              <p className="chat-offer-name">{STORE_OFFER.name}</p>
              <p className="chat-offer-price">{STORE_OFFER.price}</p>
            </div>
          </div>
          <div className="chat-offer-actions">
            <PrimaryButton style={{ width: '100%' }} onClick={onBuy} disabled={buyDisabled}>Comprar</PrimaryButton>
            {!moreDetailDisabled && (
              <SecondaryButton style={{ width: '100%' }} onClick={onMoreDetail}>Más información</SecondaryButton>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'banking') {
    return (
      <div className="chat-offer-card">
        <div className="chat-suggestions-header">
          <i className="ph ph-sparkle" style={{ fontSize: '20px', color: 'var(--action-primary)' }}></i>
          <span>¿Qué estás buscando?</span>
        </div>
        <div className="chat-suggestions-list">
          {['Hoteles en el centro', 'Cabañas con vista al lago', 'Ver todos los hospedajes', 'Necesito más información'].map(s => (
            <button key={s} className="chat-suggestion-chip">
              <span>{s}</span>
              <i className="ph ph-caret-right" style={{ fontSize: '20px', flexShrink: 0 }}></i>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'hotel') {
    return (
      <div className="chat-offer-card" id="hotelOfferCard">
        <div className="chat-offer-product">
          <img
            src="https://www.designsuites.com/images/bariloche/foto_33.jpg"
            alt="Design Suites Bariloche"
            className="chat-offer-img"
            style={{ objectFit: 'cover' }}
          />
          <div className="chat-offer-info">
            <span className="chat-offer-badge">15% OFF</span>
            <p className="chat-offer-name">Design Suites Bariloche</p>
            <p className="chat-offer-price">$1.200.500</p>
          </div>
        </div>
        <PrimaryButton style={{ width: '100%' }} onClick={onBuy} disabled={buyDisabled}>Confirmar reserva</PrimaryButton>
        {!moreDetailDisabled && <LinkButton onClick={onMoreDetail}>Más información</LinkButton>}
      </div>
    );
  }

  return null;
}
