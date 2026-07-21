import './Footer.css';
import { useBrand } from '../../brands/BrandContext';
import BrandLogo from '../BrandLogo';

export default function Footer() {
  const brand = useBrand();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__logo">
          <BrandLogo />
        </div>

        <div className="site-footer__info">
          <p className="site-footer__address">Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA</p>
          <p className="site-footer__copy">© 2019 {brand.storeName}. All Rights Reserved.</p>
        </div>

        <div className="site-footer__social">
          <a href="#" className="site-footer__social-btn" aria-label="Facebook">
            <span className="mnav-icon site-footer__social-icon" style={{ WebkitMaskImage: "url('/icons/facebook.svg')", maskImage: "url('/icons/facebook.svg')" }}></span>
          </a>
          <a href="#" className="site-footer__social-btn" aria-label="Instagram">
            <span className="mnav-icon site-footer__social-icon" style={{ WebkitMaskImage: "url('/icons/instagram.svg')", maskImage: "url('/icons/instagram.svg')" }}></span>
          </a>
          <a href="#" className="site-footer__social-btn" aria-label="WhatsApp">
            <span className="mnav-icon site-footer__social-icon" style={{ WebkitMaskImage: "url('/icons/whatsapp.svg')", maskImage: "url('/icons/whatsapp.svg')" }}></span>
          </a>
        </div>
      </div>

      <div className="site-footer__legal">
        <div className="site-footer__legal-inner">
          <a href="#" className="site-footer__legal-link">Términos y condiciones</a>
          <a href="#" className="site-footer__legal-link">Política de privacidad</a>
          <a href="#" className="site-footer__legal-link">Defensa del consumidor</a>
          <a href="#" className="site-footer__legal-link">Cómo cuidamos tu privacidad</a>
        </div>
      </div>
    </footer>
  );
}
