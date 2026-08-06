# Tienda de Puntos — Multi-marca

Prototipo funcional (front-end) de una tienda de canje de puntos, pensado para reutilizarse entre distintas marcas bancarias con una sola base de código.

## Qué es

Una SPA en React que simula el ecosistema de "canjeá tus puntos" de un banco: home de tienda, catálogo de productos con carrusel, página de detalle de producto y sección "Para tu viaje" (seguros, hospedaje, mochila de viaje). Todo el flujo de compra/asistencia se apoya en un asistente conversacional (chat) embebido en cada página.

## Multi-marca

El mismo código sirve tres marcas distintas mediante un único `BrandProvider`:

| Marca | Ruta |
|---|---|
| APER | `/` (default) |
| Galicia | `/galicia` |
| ICBC | `/icbc` |

Cada marca define su propio nombre de tienda/banco, logo, alias de cuenta, CUIT y producto de seguro en [`src/brands/brands.js`](src/brands/brands.js). `resolveBrandId` detecta la marca activa según el pathname y `BrandContext` la expone al resto de la app — así los componentes no hardcodean textos ni assets, sino que leen del contexto de marca.

## Páginas principales

- **HomePage** — home de la tienda: hero con carrusel de banners, recomendaciones, accesos rápidos y buscador con sugerencias.
- **ParaTuViaje** — sección de seguros de viaje, con tarjetas de producto por marca.
- **Hospedaje** — búsqueda y reserva de alojamiento, integrada con el asistente de chat para completar la reserva.
- **Mochila** — checklist/armado de "mochila de viaje".

## Componentes destacados

- **Header** — con variantes según si la página está en el tope o scrolleada, buscador expandible con sugerencias.
- **ChatPanel** (`ChatHistory`, `ChatHeader`, `ChatInput`, `ChatOffer`, `ChatSuggestions`, `ChatProductDetails`, `ChatCvvCard`, `ChatSuccessfulOrder`) — asistente conversacional simulado, capaz de ofrecer productos, completar una reserva de hotel (flujo `hotelTabOpen`) y confirmar compras con verificación FaceID simulada.
- **ProductCarousel / RecommendationsCarousel / BannerCarousel** — carruseles reutilizables para catálogo, recomendaciones y banners de hero.
- **ProductCard / CreditCard / CouponCard / InsuranceCard / TripCard / FeaturedCard / StatusCard** — tarjetas de producto por caso de uso.
- **MobileBottomNav** — navegación inferior en mobile, que se oculta al hacer scroll hacia abajo.
- **FaceID** — componente de verificación biométrica simulada usada en el flujo de confirmación de compra del chat.

## Datos e imágenes

- Los productos de la home viven en [`src/data/homeProducts.js`](src/data/homeProducts.js).
- Las imágenes se sirven desde un bucket de **Supabase Storage** (`Imagenes`) a través del helper `getPublicUrl` en [`src/lib/storage.js`](src/lib/storage.js), en vez de bundlearse en el repo.
- La conexión a Supabase está en [`src/lib/supabase.js`](src/lib/supabase.js), configurada por variables de entorno (`REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`).

## Diseño

Sistema de diseño basado en variables CSS centralizadas en `:root` (`src/index.css`): tokens de color, tipografía y spacing consistentes entre componentes. El layout responsive contempla explícitamente dos breakpoints de escritorio (estándar 1025–1280px y grande >1280px) además de mobile, con ajustes puntuales cuando el panel de chat está abierto (para no romper el layout de las filas de tarjetas/carruseles).

El diseño visual se apoya en el contexto del proyecto de Figma correspondiente. Hoy esa integración no está totalmente conectada: solo se tiene acceso de lectura al proyecto de Figma, sin sincronización automática de tokens/componentes.

## Stack

- React 19 + React Router 7
- Create React App (`react-scripts`)
- Supabase JS client (storage de imágenes)
- CSS puro por componente (sin librería de UI)

## Cómo correrlo

```bash
npm install
npm start        # http://localhost:3000
npm run build     # build de producción
npm test          # tests
```

Requiere un archivo `.env` con:

```
REACT_APP_SUPABASE_URL=...
REACT_APP_SUPABASE_ANON_KEY=...
```

## Estado actual

Prototipo de front-end sin backend propio (no hay persistencia real de compras/reservas; el flujo de chat y checkout es simulado).
