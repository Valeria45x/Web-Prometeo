# Convenciones de código de Prometeo

Reglas prácticas para programar con la misma lógica en todo el proyecto. Si vas
a añadir o tocar algo, sigue esto. Complementa a
[`WEB_ORGANIZATION.md`](WEB_ORGANIZATION.md) (estructura) y
[`PROMETEO_DESIGN_SYSTEM.md`](PROMETEO_DESIGN_SYSTEM.md) (sistema visual).

---

## 1. Principio: una sola fuente de verdad

Cada color, tipografía, tamaño o medida repetida vive en **un único sitio** (un
token) y todo lo demás lo **referencia**. Nunca se escribe el valor crudo dos
veces.

- **Colores de marca** → solo aparecen literalmente en `:root` de
  [`src/index.css`](../src/index.css): `--brand-black`, `--brand-white`,
  `--brand-gray`, `--brand-red`, `--prometeo-structure`.
- **Tipografías** → solo en `:root` (`--font-sans`, `--font-display`,
  `--font-mono`) y en el `@font-face` de
  [`src/assets/fonts/fonts.css`](../src/assets/fonts/fonts.css).
- **Espaciado, tamaños de texto, layout** → tokens en `:root` (`--s*`,
  `--type-*`) y en [`src/design/tokens.js`](../src/design/tokens.js).

En JS se usan los objetos `COLORS`, `FONTS`, `typeStyle(...)` de
[`src/design/`](../src/design/), que ya resuelven a esos `var(--*)`.

---

## 2. Reglas de tokens (lo que NO se hace)

| ❌ No hagas esto | ✅ Haz esto |
| --- | --- |
| `color: #050505` | `color: var(--brand-black)` (CSS) · `COLORS.grayDark` (JS) |
| `color: #ff0b3a` | `var(--brand-red)` · `COLORS.accent` |
| `font-family: "Funnel Sans", sans-serif` | `var(--font-sans)` · `FONTS.sans` |
| `font-size: 16px` en texto | `var(--type-body-size)` · `typeStyle("body")` |
| `gap: 32px` | `var(--s32)` cuando exista el token |
| Color nuevo "a ojo" | Si de verdad hace falta, **decláralo como token** primero |

- No se introducen colores fuera de las 4 primitivas de marca. Si una zona
  necesita otra superficie, se compone **a partir** de las primitivas (ej.: la
  banda del footer reutiliza `--brand-black`), no se inventa un color suelto.
- `COLORS.*` y `FONTS.*` resuelven a `var(--*)`. Sirven para estilos inline en
  DOM y para strings de CSS (gradientes). **No** se usan en `<canvas>` (ahí
  `var()` no resuelve).

---

## 3. Dónde van los estilos

Dos formas válidas, según el componente:

1. **CSS por componente/feature** (`articulos.css`, `community.css`,
   `site-footer.css`…): clases tipo BEM (`bloque__elemento--modificador`) que
   usan `var(--token)`. El CSS se importa desde su propio componente.
2. **Estilos inline con tokens**: `style={{ color: COLORS.textOnLight,
   ...typeStyle("body") }}`. Para composición puntual.

**Regla de oro de color:** los colores se definen en la **capa de estilo**
(CSS con `var(--*)`, o JS con `COLORS.*`), nunca como hex crudo en el JSX. El
JSX solo pasa **medidas/estado** por estilo inline cuando hace falta.

### Patrón de variables locales por componente

Cuando un componente tiene su propia paleta de superficies, decláralas como
variables locales **derivadas de las primitivas**, al principio de su bloque
CSS. Así se cambia el tema desde un solo punto. Ejemplo real (footer):

```css
.site-footer {
  /* Gris oscuro compuesto a partir de las primitivas (no es un color nuevo). */
  --site-footer-bg: color-mix(in srgb, var(--brand-black) 85%, var(--brand-white));
  --site-footer-text: var(--brand-white);
  --site-footer-line: var(--prometeo-structure);
  --site-footer-brand-mark: var(--brand-red); /* wordmark "Prometeo" */
}
```

Cuando una zona necesita una superficie que no es una primitiva (un gris
oscuro), se **compone** desde las primitivas con `color-mix` en vez de meter un
hex suelto. Así sigue siendo una sola fuente: si cambia `--brand-black`, el gris
del footer cambia con él.

---

## 4. Organización de archivos

- Feature-based: cada página en `src/features/<pagina>/` (orquestador +
  `*.content.js` + `components/` + `hooks/` + `sections/` según haga falta).
- Lo transversal en `src/shared/` (ui, layout, components, hooks, etc.).
- El CSS de un componente vive **junto a él** y lo importa el componente, no se
  reparte en `index.css`. (Deuda actual: quedan reglas de footer en
  `index.css`; lo nuevo no debe seguir ese patrón.)
- Alias `@/` → `src/`. Importa siempre con `@/...`.
- Un archivo que exporta un componente no mezcla exports de utilidades
  (fast-refresh). Mueve helpers/mapas a su propio módulo.

---

## 5. Patrones de comportamiento fijados

- **Reveal una vez**: las animaciones de entrada por scroll se reproducen una
  sola vez y no se reinician al volver a pasar. Usa los hooks/criterios ya
  existentes (`useReveal`, `useScrollTextReveal`, `TextReveal`), que además
  revelan aunque el scroll rápido pase de largo.
- **Demo local, sin servicios externos**: contacto y newsletter simulan el
  envío en el navegador (localStorage). No se reintroduce backend/Formspree ni
  terceros sin acordarlo.
- **Transición de página**: el scroll y el foco se gestionan en
  `RouteTransition` (scroll restaurado con Atrás/Adelante, foco al `<main>`).
- **Accesibilidad**: respeta `prefers-reduced-motion`, mantén foco visible y
  textos alternativos.

---

## 6. Checklist antes de dar algo por terminado

1. ¿Algún hex, nombre de fuente o tamaño crudo que debería ser token?
2. ¿Los colores salen de `var(--brand-*)` / `COLORS.*` y no del JSX?
3. ¿El CSS nuevo vive junto a su componente y usa clases BEM con tokens?
4. ¿Contraste suficiente entre texto y su fondo?
5. `npm run build` y `npx eslint src` sin errores (warnings = baseline).
6. Pruébalo en navegador: lo que toca estilo/animación no se valida solo con
   build + lint.
