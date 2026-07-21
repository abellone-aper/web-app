import { createContext, useContext, useEffect, useMemo } from 'react';
import { BRANDS } from './brands';

const BrandContext = createContext(null);

function buildPath(prefix, suffix) {
  if (suffix === '/') return prefix || '/';
  return `${prefix}${suffix}`;
}

function setFaviconHref(selector, href) {
  const el = document.querySelector(selector);
  if (el) el.href = href;
}

function applyFavicon(faviconDir) {
  const base = `/favicon/${faviconDir}`;
  setFaviconHref('link[rel="icon"][type="image/x-icon"]', `${base}/favicon.ico`);
}

export function BrandProvider({ brand: brandId, children }) {
  const brand = BRANDS[brandId] || BRANDS.galicia;

  useEffect(() => {
    document.documentElement.dataset.brand = brand.id;
    document.title = brand.storeName;
    applyFavicon(brand.faviconDir);
  }, [brand]);

  const value = useMemo(() => ({
    ...brand,
    path: (suffix) => buildPath(brand.prefix, suffix),
  }), [brand]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used within a BrandProvider');
  return ctx;
}
