import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage';
import ParaTuViaje from './pages/ParaTuViaje/ParaTuViaje';
import HomeBanking from './pages/HomeBanking/HomeBanking';
import Hospedaje from './pages/Hospedaje/Hospedaje';
import Mochila from './pages/Mochila/Mochila';
import Footer from './components/Footer';
import HelpSection from './components/HelpSection';
import ChatPanel from './components/ChatPanel';
import MobileBottomNav from './components/MobileBottomNav';
import { BrandProvider } from './brands/BrandContext';
import { resolveBrandId, BRANDS } from './brands/brands';

function Layout({ children }) {
  return (
    <>
      {children}
      <HelpSection />
      <Footer />
    </>
  );
}

function AppContent() {
  const [chatOpen, setChatOpen] = useState(false);
  const [hotelTabOpen, setHotelTabOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const location = useLocation();
  const brandId = resolveBrandId(location.pathname);
  const brandPrefix = BRANDS[brandId].prefix;
  const isBanking = location.pathname === `${brandPrefix}/homebanking`;

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setNavHidden(y > lastY && y > 60);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const variant = isBanking ? 'banking' : 'tienda';

  useEffect(() => {
    document.body.classList.toggle('chat-open', chatOpen);
    return () => document.body.classList.remove('chat-open');
  }, [chatOpen]);

  useEffect(() => {
    document.body.classList.toggle('is-banking', isBanking);
    return () => document.body.classList.remove('is-banking');
  }, [isBanking]);

  function handleHotelReserve() {
    setHotelTabOpen(true);
    setChatOpen(true);
  }

  const openAssistant = () => setChatOpen(true);

  const homeBankingPage = (
    <HomeBanking chatOpen={chatOpen} onChatOpen={() => setChatOpen(true)} onChatClose={() => setChatOpen(false)} />
  );
  const hospedajePage = <Hospedaje onChatOpen={handleHotelReserve} onOpenAssistant={openAssistant} />;
  const mochilaPage = <Mochila onOpenAssistant={openAssistant} onChatOpen={openAssistant} />;
  const homePage = <HomePage onOpenAssistant={openAssistant} />;
  const paraTuViajePage = <ParaTuViaje onOpenAssistant={openAssistant} />;

  return (
    <BrandProvider brand={brandId}>
      <Routes>
        <Route path="/" element={<Layout>{homePage}</Layout>} />
        <Route path="/para-tu-viaje" element={<Layout>{paraTuViajePage}</Layout>} />
        <Route path="/homebanking" element={<Layout>{homeBankingPage}</Layout>} />
        <Route path="/hospedaje" element={<Layout>{hospedajePage}</Layout>} />
        <Route path="/mochila" element={<Layout>{mochilaPage}</Layout>} />

        <Route path="/icbc" element={<Layout>{homePage}</Layout>} />
        <Route path="/icbc/para-tu-viaje" element={<Layout>{paraTuViajePage}</Layout>} />
        <Route path="/icbc/homebanking" element={<Layout>{homeBankingPage}</Layout>} />
        <Route path="/icbc/hospedaje" element={<Layout>{hospedajePage}</Layout>} />
        <Route path="/icbc/mochila" element={<Layout>{mochilaPage}</Layout>} />

        <Route path="/galicia" element={<Layout>{homePage}</Layout>} />
        <Route path="/galicia/para-tu-viaje" element={<Layout>{paraTuViajePage}</Layout>} />
        <Route path="/galicia/homebanking" element={<Layout>{homeBankingPage}</Layout>} />
        <Route path="/galicia/hospedaje" element={<Layout>{hospedajePage}</Layout>} />
        <Route path="/galicia/mochila" element={<Layout>{mochilaPage}</Layout>} />
      </Routes>

      {!isBanking && <MobileBottomNav onChatOpen={() => setChatOpen(true)} hidden={navHidden} />}

      <button
        className={`boti-fab${chatOpen ? ' is-open' : ''}`}
        aria-label={chatOpen ? 'Cerrar chat' : 'Abrir chat'}
        onClick={() => setChatOpen(v => !v)}
      >
        {chatOpen
          ? <i className="ph ph-x" style={{fontSize:'26px'}}></i>
          : <span className="mnav-icon boti-fab-icon" style={{WebkitMaskImage:"url('/icons/chat.svg')", maskImage:"url('/icons/chat.svg')"}}></span>
        }
        {!chatOpen && <span className="boti-fab-notif"></span>}
      </button>

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        variant={variant}
        hotelTabOpen={hotelTabOpen}
        onCloseHotelTab={() => setHotelTabOpen(false)}
      />
    </BrandProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
