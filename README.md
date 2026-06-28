# Prometeo — Web

Prometeo es una marca de **privacidad digital** pensada para jóvenes
hispanohablantes. Esta web es el prototipo funcional desarrollado como Trabajo
Fin de Grado (TFG): presenta la marca, su propuesta de certificación, contenido
educativo, comunidad y tienda.

> **Alcance — prototipo de demo.** No es un producto en producción. No hay
> backend, base de datos ni autenticación real. Comunidad, perfil, carrito y
> pedidos se simulan en el navegador con `localStorage`. Los formularios
> (contacto, newsletter) simulan el envío y **no** transmiten datos a ningún
> servidor. No introduzcas datos personales reales.

## Tecnología

- **React 18** + **Vite** (SPA estática).
- **React Router 7** para el enrutado.
- **Lenis** para el scroll suave.
- CSS propio con un **sistema de design tokens** (fuentes y colores); fuentes
  auto-alojadas (sin Google Fonts).
- ESLint + Prettier + Husky (lint-staged) para calidad de código.

## Requisitos

- Node.js 18 o superior.

## Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
```

Deja la terminal abierta mientras desarrollas: si se cierra, el sitio deja de
responder.

### Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con HMR. |
| `npm run build` | Compila la web a `dist/`. |
| `npm run preview` | Sirve localmente el build de producción. |
| `npm run lint` | Comprueba el código con ESLint. |
| `npm run lint:fix` | Corrige automáticamente lo que puede. |
| `npm run format` | Formatea `src` con Prettier. |

## Estructura

```
src/
  app/            Providers, rutas, transiciones y boundary de errores
  assets/         Fuentes, imágenes y media (incl. products/ de la tienda)
  context/        Estado global (comunidad, tienda, accesibilidad)
  data/           Contenido y datos de demo (tienda, artículos, legal…)
  design/         Tokens, tipografía y sistema de grid
  features/       Una carpeta por página/sección:
                    landing, para-ti, empresas, certificacion,
                    articulos, comunidad, tienda, perfil, contacto,
                    sobre, legal, not-found
  hooks/          Hooks reutilizables (scroll, reveal, media query…)
  lib/            Utilidades (media, math, lenis)
  shared/         UI, layout (topbar/footer), cookies, accesibilidad
public/           Archivos servidos tal cual (favicon, robots, sitemap)
```

## Páginas principales

- **Landing** (`/`) — presentación de la marca.
- **Para ti** (`/para-ti`) — propuesta para personas + artículos y comunidad.
- **Para empresas** (`/empresas`) — propuesta B2B, casos y registro.
- **Certificación** (`/certificacion`) — el estándar Prometeo.
- **Artículos** (`/articulos`), **Comunidad** (`/comunidad`).
- **Tienda** (`/tienda`) — catálogo de demo (Jersey, USB, Bermuda, Camisa).
- **Cuenta** (`/perfil`), **Contacto** (`/contacto`), **Legal** (`/legal/...`).

## Sistema de diseño

El estilo se controla desde tokens centralizados:

- En JS: `FONTS` / `COLORS` (`src/design/tokens.js`).
- En CSS: variables `var(--font-*)` y `var(--brand-*)` (`src/index.css`).

No se deben hardcodear fuentes ni colores hex: usar siempre los tokens.

## Datos y estado (demo)

- **Comunidad / Perfil:** `ComunidadContext` (usuarios, hilos, respuestas).
- **Tienda:** `TiendaContext` (carrito y pedidos).
- **Accesibilidad:** `AccessibilityContext`.

Todo se persiste en `localStorage`; desde la cuenta puedes **borrar los datos
locales** y **reabrir la ventana de cookies**.

## Despliegue

El proyecto se publica en **GitHub Pages** con el workflow de
`.github/workflows/deploy.yml`, que ejecuta `npm run build` y publica `dist/`.

En producción la base es `/Web-Prometeo/` (ver `vite.config.js`); en desarrollo
es `/`.

## Nota académica

Web desarrollada como prototipo de TFG. El contenido, los flujos de cuenta, la
tienda, la certificación y la comunidad muestran una experiencia posible, no un
servicio comercial activo.
