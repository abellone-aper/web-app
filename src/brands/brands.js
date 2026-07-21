import { getPublicUrl } from '../lib/storage';

export const BRANDS = {
  aper: {
    id: 'aper',
    prefix: '',
    faviconDir: 'Aper',
    storeName: 'Tienda APER',
    bankName: 'APER',
    cardName: 'Visa APER',
    pointsName: 'Puntos APER',
    logoUrl: getPublicUrl('Imagenes', 'logo-aper.png'),
    // TODO: reemplazar por la URL real del isologo bancario si corresponde
    bankLogoUrl: null,
    aliasHandle: 'SOL.APER.ARS',
    legalName: 'APER Tienda S.A.',
    cuit: 'CUIT 30-00000000-0',
    insuranceProduct: { name: 'APER Viajero', badge: 'Exclusivo APER' },
  },
  galicia: {
    id: 'galicia',
    prefix: '/galicia',
    faviconDir: 'Galicia',
    storeName: 'Tienda Galicia',
    bankName: 'Galicia',
    cardName: 'Visa Galicia',
    pointsName: 'Puntos Galicia',
    logoUrl: getPublicUrl('Imagenes', 'logo.png'),
    bankLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Logo_Banco_Galicia.svg/3840px-Logo_Banco_Galicia.svg.png',
    aliasHandle: 'SOL.GALICIA.ARS',
    legalName: 'Galicia Tienda S.A.',
    cuit: 'CUIT 30-71234567-9',
    insuranceProduct: { name: 'Galicia Viajero', badge: 'Exclusivo Galicia' },
  },
  icbc: {
    id: 'icbc',
    prefix: '/icbc',
    faviconDir: 'ICBC',
    storeName: 'Tienda ICBC',
    bankName: 'ICBC',
    cardName: 'Visa ICBC',
    pointsName: 'Puntos ICBC',
    logoUrl: getPublicUrl('Imagenes', 'logo-ICBC.png'),
    // TODO: reemplazar por la URL real del isologo de ICBC
    bankLogoUrl: null,
    aliasHandle: 'SOL.ICBC.ARS',
    legalName: 'ICBC Tienda S.A.',
    cuit: 'CUIT 30-99999999-9',
    insuranceProduct: { name: 'ICBC Viajero', badge: 'Exclusivo ICBC' },
  },
};

export function resolveBrandId(pathname) {
  if (pathname === '/icbc' || pathname.startsWith('/icbc/')) return 'icbc';
  if (pathname === '/galicia' || pathname.startsWith('/galicia/')) return 'galicia';
  return 'aper';
}
