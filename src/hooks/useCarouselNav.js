import { useCallback, useEffect, useRef, useState } from 'react';

// Shared scroll/arrow logic for horizontally-scrolling card rows
// (ProductCarousel, RecommendationsCarousel, "Más accedidos"). `trackRef`
// is the scrollable element itself — either a dedicated wrapper
// (.carousel-track-scroll) or the card row itself when there's no extra
// layer, `cardSelector` matches the individual card elements inside it.
export default function useCarouselNav(cardSelector) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [edgeHover, setEdgeHover] = useState(null);

  const checkScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanLeft(t.scrollLeft > 0);
    setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 1);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    checkScroll();
    t.addEventListener('scroll', checkScroll, { passive: true });
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(checkScroll);
    observer && observer.observe(t);
    return () => {
      t.removeEventListener('scroll', checkScroll);
      observer && observer.disconnect();
    };
  }, [checkScroll]);

  function scroll(dir) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(cardSelector);
    if (!card) { track.scrollBy({ left: dir * 300, behavior: 'smooth' }); return; }
    const gap = parseFloat(getComputedStyle(card.parentElement).columnGap) || 0;
    const amount = (card.getBoundingClientRect().width + gap) * 2;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  // Reveals the arrow only when the card flush against that side of the
  // track is the one under the cursor, instead of the whole row hovering.
  function handleCardHover(e) {
    const card = e.target.closest(cardSelector);
    const track = trackRef.current;
    if (!card || !track) { setEdgeHover(null); return; }
    const cardRect = card.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    // Generous on purpose: scrollBy() moves by whole card steps but the
    // browser clamps the last step to the max scroll position, so the
    // edge card is often a few px short of flush against the track edge.
    const EPS = 32;
    if (cardRect.left <= trackRect.left + EPS) setEdgeHover('left');
    else if (cardRect.right >= trackRect.right - EPS) setEdgeHover('right');
    else setEdgeHover(null);
  }

  function handleRowLeave() {
    setEdgeHover(null);
  }

  return { trackRef, canLeft, canRight, edgeHover, scroll, handleCardHover, handleRowLeave };
}
