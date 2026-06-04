import './InvoiceCard.css';

export default function InvoiceCard({ orderName, price }) {
  return (
    <div className="invoice-card-wrap">
      <div className="invoice-card">
        <div className="invoice-card-hd">
          <div className="invoice-card-icon-wrap">
            <i className="ph ph-receipt" style={{ fontSize: '22px', color: 'var(--action-primary)' }}></i>
          </div>
          <div className="invoice-card-titles">
            <p className="invoice-card-title">Factura electrónica</p>
            <p className="invoice-card-sub">Galicia Tienda S.A. · CUIT 30-71234567-9</p>
          </div>
        </div>
        <div className="invoice-card-rows">
          <div className="invoice-card-row">
            <span className="invoice-card-key">N° de factura</span>
            <span className="invoice-card-val">0001-00042813</span>
          </div>
          <div className="invoice-card-row">
            <span className="invoice-card-key">Fecha de emisión</span>
            <span className="invoice-card-val">26/05/2026</span>
          </div>
          <div className="invoice-card-row">
            <span className="invoice-card-key">Producto</span>
            <span className="invoice-card-val">{orderName}</span>
          </div>
          <div className="invoice-card-row">
            <span className="invoice-card-key">Subtotal</span>
            <span className="invoice-card-val">{price}</span>
          </div>
          <div className="invoice-card-row">
            <span className="invoice-card-key">IVA (21%)</span>
            <span className="invoice-card-val invoice-card-val--muted">Incluido</span>
          </div>
          <div className="invoice-card-row invoice-card-row--total">
            <span className="invoice-card-key">Total</span>
            <span className="invoice-card-val invoice-card-val--total">{price}</span>
          </div>
        </div>
        <button className="invoice-card-download">
          <i className="ph ph-download-simple" style={{ fontSize: '15px' }}></i>
          Descargar PDF
        </button>
      </div>
    </div>
  );
}
