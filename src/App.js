import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ParaTuViajePage from './pages/ParaTuViajePage';
import HomeBankingPage from './pages/HomeBankingPage';
import DesignSuitesPage from './pages/DesignSuitesPage';
import Footer from './components/Footer';
import ChatPanel from './components/ChatPanel';
import MobileBottomNav from './components/MobileBottomNav';

function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

function AppContent() {
  const [chatOpen, setChatOpen] = useState(false);
  const [hotelTabOpen, setHotelTabOpen] = useState(false);
  const location = useLocation();
  const isBanking = location.pathname === '/homebanking';

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
        <Route path="/para-tu-viaje" element={<Layout><ParaTuViajePage /></Layout>} />
        <Route path="/homebanking" element={<Layout><HomeBankingPage chatOpen={chatOpen} onChatOpen={() => setChatOpen(true)} onChatClose={() => setChatOpen(false)} /></Layout>} />
        <Route path="/hospedaje" element={<Layout><DesignSuitesPage onChatOpen={handleHotelReserve} /></Layout>} />
      </Routes>

      {location.pathname === '/' && (
        <MobileBottomNav onChatOpen={() => setChatOpen(true)} />
      )}

      <button
        className={`boti-fab${chatOpen ? ' is-open' : ''}${location.pathname !== '/' ? ' boti-fab--show-mobile' : ''}`}
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
