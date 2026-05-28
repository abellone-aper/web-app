import { useState } from 'react';

export default function FaceID({ open, onDeny, onSuccess }) {
  const [phase, setPhase] = useState('alert'); // 'alert' | 'scan' | 'success'

  function handleAllow() {
    setPhase('scan');
    setTimeout(() => setPhase('success'), 2000);
    setTimeout(() => {
      onSuccess?.();
      setPhase('alert');
    }, 3000);
  }

  function handleDeny() {
    setPhase('alert');
    onDeny?.();
  }

  if (!open) return null;

  return (
    <div className={`faceid-overlay${open ? ' open' : ''}`}>
      {phase === 'alert' && (
        <div className="faceid-alert">
          <div className="faceid-alert-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="14" fill="#1c1c1e"/>
              <rect x="2" y="2" width="60" height="60" rx="12" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
              <path d="M18 26 L18 18 L26 18" stroke="#a1f293" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M38 18 L46 18 L46 26" stroke="#a1f293" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 38 L18 46 L26 46" stroke="#a1f293" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M38 46 L46 46 L46 38" stroke="#a1f293" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="26" cy="30" r="2" fill="#a1f293"/>
              <circle cx="38" cy="30" r="2" fill="#a1f293"/>
              <path d="M32 28 L32 35" stroke="#a1f293" strokeWidth="2" strokeLinecap="round"/>
              <path d="M26 40 Q32 45 38 40" stroke="#a1f293" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div className="faceid-alert-body">
            <p className="faceid-alert-title">¿Querés permitir que Tienda Galicia use Face ID?</p>
            <p className="faceid-alert-desc">Necesitamos validar tu identidad por motivos de seguridad para avanzar con la transacción.</p>
          </div>
          <div className="faceid-alert-buttons">
            <button className="faceid-alert-btn" onClick={handleDeny}>No permitir</button>
            <button className="faceid-alert-btn faceid-allow" onClick={handleAllow}>Permitir</button>
          </div>
        </div>
      )}

      {(phase === 'scan' || phase === 'success') && (
        <div className="faceid-scan-screen" style={{display:'flex'}}>
          <div className={`faceid-bezel${phase === 'success' ? ' success' : ''}`}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 30 L14 14 L30 14" stroke="#a1f293" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M50 14 L66 14 L66 30" stroke="#a1f293" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 50 L14 66 L30 66" stroke="#a1f293" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M50 66 L66 66 L66 50" stroke="#a1f293" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="31" cy="36" r="2.5" fill="#a1f293"/>
              <circle cx="49" cy="36" r="2.5" fill="#a1f293"/>
              <path d="M40 33 L40 42" stroke="#a1f293" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M31 50 Q40 57 49 50" stroke="#a1f293" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <p className="faceid-scan-hint">
            {phase === 'success' ? 'Face ID reconocido' : 'Mirá tu dispositivo'}
          </p>
        </div>
      )}
    </div>
  );
}
