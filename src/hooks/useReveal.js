import { useCallback, useEffect, useState } from 'react';

// Detecta cuándo un elemento entra en el viewport para animarlo una sola
// vez vía scroll (a diferencia de mount-in, que anima apenas se monta).
// El ref es un callback (no un useRef) para que el efecto se vuelva a
// ejecutar cada vez que el nodo aparece en el DOM — necesario cuando el
// elemento se monta condicionalmente (ej. tabs) en vez de al montar el
// componente.
export default function useReveal({ threshold = 0.15 } = {}) {
  const [node, setNode] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useCallback(el => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(node);
      }
    }, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [ref, visible];
}
