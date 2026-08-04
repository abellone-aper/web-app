import './HomeDashboard.css';
import ProductCarousel from '../ProductCarousel';
import LinkButton from '../Buttons/LinkButton';
import { TECH_PRODUCTS, ELECTRO_PRODUCTS } from '../../data/homeProducts';

const STORES = ['Samsung', 'Apple', 'LG', 'Sony', 'Motorola', 'Xiaomi'];

export default function HomeDashboard() {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-main">
        <ProductCarousel title="Para comprar con tus puntos" badge="54.000 puntos disponibles - Vence el 31/05" products={TECH_PRODUCTS} />
        <ProductCarousel title="Relacionados con tu última compra" products={ELECTRO_PRODUCTS} />
      </div>

      <div className="dashboard-aside">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Tiendas Oficiales</h2>
            <LinkButton as="a" href="#">Mostrar todo</LinkButton>
          </div>
          <div className="carousel-wrap">
            <button className="carousel-arrow"><i className="ph ph-caret-left"></i></button>
            <div className="carousel-track">
              <div className="stores-row">
                {STORES.map(s => <div key={s} className="store-card">{s}</div>)}
              </div>
            </div>
            <button className="carousel-arrow"><i className="ph ph-caret-right"></i></button>
          </div>
        </section>
      </div>
    </div>
  );
}
