import './CarritoPanel.css';
import { useState, useEffect } from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton';

function fmtARS(n) {
  return '$' + Math.round(n).toLocaleString('es-AR');
}

function CheckIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartItem({ item, selected, onToggleSelect, onIncrement, onDecrement, onRemove }) {
  const isContain = item.imgFit === 'contain';
  const canDecrement = item.qty > 1;
  return (
    <div className="carrito-item">
      <div className="carrito-item-image-wrapper">
        <img
          src={item.img}
          alt={item.name}
          className="carrito-item-image"
          style={isContain
            ? { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }
            : { width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <button
          type="button"
          className={`carrito-item-checkbox${selected ? ' checked' : ''}`}
          aria-label={selected ? `Quitar selección de ${item.name}` : `Seleccionar ${item.name}`}
          onClick={onToggleSelect}
        >
          {selected && <CheckIcon />}
        </button>
      </div>

      {item.discountPct != null && (
        <div className="carrito-item-price-row">
          <span className="carrito-item-price-original">{fmtARS(item.priceOriginal)}</span>
          <span className="carrito-item-discount-badge">{item.discountPct}% Off</span>
        </div>
      )}
      <p className="carrito-item-price">{fmtARS(item.priceCurrent)}</p>

      <div className="carrito-item-quantity">
        <button
          type="button"
          className="carrito-qty-btn carrito-qty-btn--remove"
          aria-label={canDecrement ? `Restar ${item.name}` : `Quitar ${item.name}`}
          onClick={canDecrement ? onDecrement : onRemove}
        >
          <i className={canDecrement ? 'ph ph-minus' : 'ph ph-trash'}></i>
        </button>
        <span className="carrito-qty-value">{item.qty}</span>
        <button type="button" className="carrito-qty-btn carrito-qty-btn--add" aria-label={`Sumar ${item.name}`} onClick={onIncrement}>
          <i className="ph ph-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default function CarritoPanel({ open, onClose, items = [], onIncrement, onDecrement, onRemove }) {
  const [selectedIds, setSelectedIds] = useState(() => new Set(items.map(i => i.id)));
  const idsSignature = items.map(i => i.id).join('|');

  useEffect(() => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      let changed = false;
      items.forEach(i => {
        if (!next.has(i.id)) { next.add(i.id); changed = true; }
      });
      return changed ? next : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsSignature]);

  const allSelected = items.length > 0 && items.every(i => selectedIds.has(i.id));
  const subtotal = items.filter(i => selectedIds.has(i.id)).reduce((sum, i) => sum + i.priceCurrent * i.qty, 0);

  function toggleAll() {
    setSelectedIds(allSelected ? new Set() : new Set(items.map(i => i.id)));
  }

  function toggleOne(id) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <>
      {open && <div className="carrito-backdrop" onClick={onClose} />}
      <div className={`carrito-panel${open ? ' open' : ''}`}>
        <div className="carrito-panel-header">
          <span className="carrito-panel-title">Productos Agregados</span>
          <button className="carrito-header-icon-btn" aria-label="Cerrar" onClick={onClose}>
            <i className="ph ph-x carrito-header-close-icon"></i>
          </button>
        </div>

        <div className="carrito-panel-body">
          {items.length > 0 && (
            <button type="button" className="carrito-select-all" onClick={toggleAll}>
              <span className={`carrito-item-checkbox${allSelected ? ' checked' : ''}`}>
                {allSelected && <CheckIcon />}
              </span>
              <span>Seleccionar todo ({items.length})</span>
            </button>
          )}

          <div className="carrito-items">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                selected={selectedIds.has(item.id)}
                onToggleSelect={() => toggleOne(item.id)}
                onIncrement={() => onIncrement(item.id)}
                onDecrement={() => onDecrement(item.id)}
                onRemove={() => onRemove(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="carrito-panel-footer">
          <div className="carrito-summary">
            <span className="carrito-summary-label">Subtotal</span>
            <span className="carrito-summary-amount">{fmtARS(subtotal)}</span>
          </div>
          <div className="carrito-actions">
            <PrimaryButton style={{ width: '100%' }} type="button">Comprar</PrimaryButton>
            <SecondaryButton style={{ width: '100%' }} type="button">Ir al carrito</SecondaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
