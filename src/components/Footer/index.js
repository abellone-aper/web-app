import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__logo">
          <img src="/img/logo.png" alt="Tienda Galicia" />
        </div>

        <div className="site-footer__info">
          <p className="site-footer__address">Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA</p>
          <p className="site-footer__copy">© 2019 Tienda Galicia. All Rights Reserved.</p>
        </div>

        <div className="site-footer__social">
          <a href="#" className="site-footer__social-btn" aria-label="Facebook">
            <img src="/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="#" className="site-footer__social-btn" aria-label="Instagram">
            <img src="/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="#" className="site-footer__social-btn" aria-label="WhatsApp">
            <img src="/icons/whatsapp.svg" alt="WhatsApp" />
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
