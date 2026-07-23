import { getPublicUrl } from '../lib/storage';

export const CHIPS = [
  { icon: '/icons/compras.svg',              label: 'Compras recurrentes' },
  { icon: '/icons/super.svg',                label: 'Ahorrar en el super' },
  { icon: '/icons/puntos.svg',               label: 'Hasta 54.000 puntos' },
  { icon: '/icons/computadora.svg',          label: 'Computadoras' },
  { icon: '/icons/audio.svg',                label: 'Audio' },
  { icon: '/icons/smartphone.svg',           label: 'Renovar mi Smartphone' },
  { icon: '/icons/deporte.svg',              label: 'Deporte' },
  { icon: '/icons/vehículo.svg',             label: 'Para tu vehículo' },
  { icon: '/icons/experiencia.svg',          label: 'Experiencias' },
];

export const TECH_PRODUCTS = [
  { id: 'tech-1', img: getPublicUrl('Imagenes', 'madrid.png'), price: '$1.339.208', install: 'Mismo precio en 12 cuotas de $199.560', title: 'Vuelos desde Buenos Aires a Madrid ida y vuelta', badge: 'Oferta imperdible', withPoints: true, imgFilled: true },
  { id: 'tech-2', img: getPublicUrl('Imagenes', 'escurridor.png'), oldPrice: '$59.999', price: '$24.999', shipping: 'Envío Gratis', title: 'Escurridor Secaplatos Platos Cubiertos Acero Negro Cocina Organizador Vajilla Porta', favActive: true, withPoints: true },
  { id: 'tech-3', img: getPublicUrl('Imagenes', 'iPhone.png'), oldPrice: '$1.392.763', price: '$1.079.763', install: 'Mismo precio en 12 cuotas de $199.560', title: 'iPhone 14 Dual SIM 256 GB amarillo', withPoints: true },
  { id: 'tech-4', img: getPublicUrl('Imagenes', 'hotel.png'), oldPrice: '$2.670.000', price: '$2.124.000', install: 'Mismo precio en 12 cuotas de $199.560', title: '5 días y 4 noches en Petit Hotel Panambi', withPoints: true, imgFilled: true },
  { id: 'tech-5', img: getPublicUrl('Imagenes', 'bota.png'), oldPrice: '$2.895.226', price: '$205.000', shipping: 'Envío Gratis', title: 'Bota Trekking Timberland Maddsen Peak Waterproof Dama', withPoints: true },
  { id: 'tech-6', img: getPublicUrl('Imagenes', 'notebook.png'), oldPrice: '$2.895.226', price: '$2.895.226', shipping: 'Envío Gratis', title: 'Notebook Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16gb Color Graphite', withPoints: true },
];

export const ELECTRO_PRODUCTS = [
  { id: 'electro-1', img: getPublicUrl('Imagenes', 'cafetera.png'), oldPrice: '$45.999', price: '$39.999', shipping: 'Envío Gratis', title: 'Cafetera Espresso Profesional' },
  { id: 'electro-2', img: getPublicUrl('Imagenes', 'batidora.png'), oldPrice: '$18.499', price: '$16.999', shipping: 'Envío Gratis', title: 'Batidora de Mano Compacta y Potente', favActive: true },
  { id: 'electro-3', img: getPublicUrl('Imagenes', 'olla.png'), oldPrice: '$22.999', price: '$19.999', shipping: 'Envío Gratis', title: 'Olla de Cocción Lenta con Temporizador' },
  { id: 'electro-4', img: getPublicUrl('Imagenes', 'freidora.png'), oldPrice: '$50.999', price: '$44.999', shipping: 'Envío Gratis', title: 'Freidora de Aire Saludable y Eficiente' },
  { id: 'electro-5', img: getPublicUrl('Imagenes', 'extractor.png'), oldPrice: '$35.499', price: '$32.499', shipping: 'Envío Gratis', title: 'Extractor de Jugo de Alta Velocidad' },
  { id: 'electro-6', img: getPublicUrl('Imagenes', 'plancha.png'), oldPrice: '$15.999', price: '$13.999', shipping: 'Envío Gratis', title: 'Plancha de Vapor Vertical Portátil' },
];
