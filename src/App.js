import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage';
import ParaTuViaje from './pages/ParaTuViaje/ParaTuViaje';
import HomeBanking from './pages/HomeBanking/HomeBanking';
import Hospedaje from './pages/Hospedaje/Hospedaje';
import Footer from './components/Footer';
import HelpSection from './components/HelpSection';
import ChatPanel from './components/ChatPanel';
import MobileBottomNav from './components/MobileBottomNav';

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
  const isBanking = location.pathname === '/homebanking';

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

  function handleHotelReserve() {
    setHotelTabOpen(true);
    setChatOpen(true);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/para-tu-viaje" element={<Layout><ParaTuViaje /></Layout>} />
        <Route path="/homebanking" element={<Layout><HomeBanking chatOpen={chatOpen} onChatOpen={() => setChatOpen(true)} onChatClose={() => setChatOpen(false)} /></Layout>} />
        <Route path="/hospedaje" element={<Layout><Hospedaje onChatOpen={handleHotelReserve} /></Layout>} />
      </Routes>

      <MobileBottomNav onChatOpen={() => setChatOpen(true)} hidden={navHidden} />

      <button
        className={`boti-fab${chatOpen ? ' is-open' : ''}`}
        aria-label={chatOpen ? 'Cerrar chat' : 'Abrir chat'}
        onClick={() => setChatOpen(v => !v)}
      >
        <i className={`ph ${chatOpen ? 'ph-x' : 'ph-sparkle'}`} style={{fontSize:'26px'}}></i>
        {!chatOpen && <span className="boti-fab-notif"></span>}
      </button>

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        variant={variant}
        hotelTabOpen={hotelTabOpen}
        onCloseHotelTab={() => setHotelTabOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
