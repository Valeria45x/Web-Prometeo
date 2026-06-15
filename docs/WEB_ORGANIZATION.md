# Organización del código de Prometeo

## Estructura general

El proyecto sigue una organización **feature-based**: cada página vive en su
propia carpeta con todo lo que necesita, y lo común se comparte.

```
src/
  app/          Arranque de la app: routing (con code-splitting), providers, shell.
  features/     Una carpeta por página o dominio:
                landing, sobre, para-ti, empresas, certificacion,
                comunidad, tienda, perfil, contacto, legal, articulos.
  shared/       Lo reutilizable entre features:
                ui/         Sistema de diseño (Button, Grid, Label, Chip, ...).
                layout/     Estructura de página (Page, Topbar, Footer, Frame).
                components/ Piezas sueltas compartidas (LocalDemoNotice, ...).
                a11y/, cookies/, account/
  hooks/        Hooks genéricos (no atados a una feature).
  context/      Estado global (Comunidad, Tienda, Accesibilidad).
  data/         Datos mock/ficticios (artículos, comunidad, tienda, legal, registro).
  design/       Tokens visuales, tipografía, sistema de grid y prometeoSystem.
  lib/          Utilidades: lenis (scroll), media (assets), math (clamp...).
  config/       Configuración de entorno.
  assets/       Imágenes y vídeo locales (placeholder, futura migración a imagekit).
```

Imports siempre con el alias **`@/`** (= `src/`), nunca `../../../`.

## Patrón de modularización de páginas

Cada página es un **orquestador delgado** que solo compone; la lógica y los
datos viven fuera. Dentro de cada `features/<pagina>/`:

- `XPage.jsx` — orquestador: compone secciones, sin lógica pesada.
- `*.content.js` — textos, listas y constantes (editar sin tocar el render).
- `hooks/` — lógica de animación por scroll y estado (parallax, carruseles,
  revelados, focus-trap, etc.).
- `components/` — sub-componentes reutilizables (cards, modales, iconos, formularios).
- `sections/` — cada bloque de las páginas de scroll largo.
- `*.css` — estilos de la página.

### Cuándo crear cada subcarpeta

Las subcarpetas **se ganan su sitio cuando hay contenido**; no se crean vacías
por simetría. Una página simple es un solo archivo (p. ej. contacto, legal).

- `components/` — en cuanto extraes **2+ sub-componentes** de la página.
- `hooks/` — en cuanto hay **lógica de efectos/animación** que sacar del render.
- `sections/` — solo si la página es un **scroll de secciones** distintas.

Por eso la profundidad varía entre features, y es intencionado: refleja la
complejidad real, no un descuido. (Excepción histórica aceptada: `landing/`
agrupa cada sección como un sub-módulo propio por su complejidad.)

### Cómo se mantiene a futuro

1. **Señal automática:** ESLint avisa con `max-lines` cuando un archivo supera
   ~400 líneas. Es la pista de "toca repartir en components/hooks/sections".
2. **Se aplica solo:** el pre-commit (`husky` + `lint-staged`) corre ESLint y
   Prettier sobre lo que vas a commitear, así el estándar no depende de la
   memoria de nadie.
3. **Regla de oro:** una utilidad que se repite (p. ej. `clamp`) va a `@/lib`,
   no se copia. Una decisión visual repetida va a `@/design`, no a un literal.

Al crear una página nueva: empieza con un solo archivo y reparte en
`content.js` / `hooks/` / `components/` / `sections/` **cuando crezca**, no antes.

## Carga y rendimiento

- **Code-splitting por ruta**: cada página se carga bajo demanda (`React.lazy`
  en `app/routes.jsx`). El vendor (React) va en su propio chunk.
- **Medios centralizados** en `@/lib/media`: para migrar a imagekit.io solo se
  edita ese archivo.

## Sistema de grid

El sistema visual deriva de AES-256. En web se traduce como una retícula de
cuatro columnas, sin gutter, separada mediante bordes visibles de `1px` en
`#050505`.

Reglas principales:

- Grid estructural: `repeat(4, minmax(0, 1fr))`.
- Tablet: dos columnas. Mobile: una columna.
- Separación visual: borde, no espacio en blanco entre columnas.
- Escala de spacing: `4`, `8`, `16`, `32`, `64`, `128`, `256`. Unidad base: `32px`.
- Celda de firma: rojo `#ff0b3a`, como interrupción puntual.

`src/design/gridSystem.js` declara estas reglas para que la lógica del grid no
quede escondida en componentes sueltos.

## Sistema Prometeo

`src/design/prometeoSystem.js` agrupa las decisiones que definen el lenguaje
visual reutilizable: superficies (`dark`/`light`/`accent`), jerarquía
tipográfica, receta del topbar, patrón CTA, footer y secuencias de motion.

Regla: si una decisión visual se repite en topbar, footer, botones, copy o
motion, debe colgar de este archivo o de `src/design/tokens.js`, no vivir como
literal dentro de una página.

## Estándares

- **ESLint** (`eslint.config.js`) y **Prettier** (`.prettierrc`).
- Scripts: `npm run lint`, `lint:fix`, `format`, `format:check`.
