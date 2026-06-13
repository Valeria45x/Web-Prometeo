# Auditoría del sistema de diseño — Web Prometeo

Estado del UI a nivel de sistema: qué hay, qué es inconsistente y qué falta para que sea un design system claro, consistente y accesible. De aquí sale la lista de trabajo de UI.

## Veredicto

La base es **fuerte y está bien pensada**: capa de tokens (`tokens.js`), variables CSS (`index.css`), roles tipográficos (`typography.js`), tokens de sistema y superficies (`prometeoSystem.js`), un grid con bordes (`ds-grid`), un `Button` con 6 variantes y estados completos, `Label`, `SplitCtaButton`, `NavigationButton`, `TextReveal`, `GridImageReveal`. Foco visible y `prefers-reduced-motion` ya contemplados.

El problema no es la base, es la **adopción y la consolidación**: el sistema existe pero conviven con él fuentes de verdad duplicadas y mucho estilo escrito a mano por página. El trabajo es **consolidar + rellenar huecos + accesibilidad**, no rehacer.

Severidad: 🔴 alta · 🟠 media · 🟢 baja.

---

## 1. 🔴 Fuentes de verdad duplicadas

El mismo valor está definido en 2–3 sitios a la vez, sin un origen único:

- **Color:** `COLORS` (JS, p. ej. `COLORS.accent`) **y** variables CSS (`--prometeo-red`), con nombres distintos para lo mismo. Los componentes usan uno u otro según se estilen en JS o en CSS.
- **Espaciado:** `SPACING` (JS, `s4…s256`) **y** `--s4…--s256` (CSS).
- **Tipografía:** `TYPE` (JS, en `tokens.js`) **+** `--type-*` (CSS) **+** `TYPE_ROLES` (JS, que referencia las CSS). Tres definiciones.

**Riesgo:** un cambio en un sitio no se propaga → deriva silenciosa.
**Recomendación:** declarar las **variables CSS como única fuente de verdad** y que el JS las consuma (o generar una desde la otra). Eliminar el objeto `TYPE` duplicado de `tokens.js`.

## 2. 🔴 Escala de espaciado contradictoria

Tus propios documentos se contradicen:

- `PROMETEO_GRID_WEB.md`: escala **estricta de potencias de 2** (4, 8, 16, 32, 64, 128, 256); *"valores prohibidos: 12, 24, 36, 48"*.
- `NOTAS_MUNDO_DE_MARCA.md`: escala de **múltiplos de 4** (xs=4, sm=12, md=24, lg=36, xl=48…); declara 12/24/36/48 como válidos.
- **El código** usa `--s*` (potencias de 2) pero también literales fuera de escala: `6px 14px`, `0 20px`, `14px 16px`…
- **Topbar:** el doc dice `52px`; el código usa `LAYOUT.topbarHeight = 64px`.

**Recomendación:** decidir **una** escala, documentarla y purgar los literales fuera de ella. (Tú decides: ¿potencias de 2 estricto, o múltiplos de 4?)

## 3. 🔴 Colores hardcodeados (~284 ocurrencias)

En el CSS de las páginas hay **196 hex** (`#050505`, `#fcfcfc`, `#ff0b3a`, `#d9d9d6`) **+ 88 `rgba()`** literales, en lugar de tokens. Lo más problemático: los **grises tenues** (`rgba(5,5,5,0.64)`, `rgba(5,5,5,0.48)`) se definen ad-hoc por página (`--cert-muted-text`, etc.) sin un token compartido de "texto atenuado".

**Consecuencias:** el modo **alto contraste no puede alcanzarlos**; y mantener la coherencia es frágil.
**Recomendación:** tokens **semánticos** por superficie (dark / light / accent): `text`, `text-muted`, `border`, `surface`, `surface-2`… y reemplazar los literales por ellos.

## 4. 🟠 Componentes reimplementados por página

El sistema existe, pero patrones repetidos se reescriben en cada página en vez de compartirse:

- **Barras de filtro reimplementadas 4 veces**: artículos, comunidad, tienda, registro (cada una con sus clases).
- **Paginación** duplicada (artículos + comunidad).
- **Cards, rows, tags/badges, inputs** (contacto, newsletter): cada página los define a mano.

**Recomendación:** extraer a componentes de sistema: `FilterBar`, `Card`, `Tag`/`Badge`, `Pagination`, `Field`/`Input`. Es lo que más sube la sensación de "sistema".

## 5. 🟠 Tipografía: tamaños y familias

- **`meta` = 8px**: por debajo del mínimo legible (~12px). Si es decorativo (coordenadas, códigos), aceptable; si transmite información que hay que leer, subirlo.
- **`eyebrow` = 16px** (tamaño de body): inusual para un eyebrow; revisar si es intencional.
- **Mono inconsistente:** `FONTS.mono = "monospace"`, pero hay **25 usos de `"JetBrains Mono"`** hardcodeado en CSS. Además, conviene verificar que JetBrains Mono esté realmente cargada como webfont; si no, cae a la mono del sistema y rompe la coherencia.
- **Fallback de la display = `serif`** (63 usos de `"Funnel Display", serif`): si la fuente no carga, **todo cae a una serif tipo Times**, que choca con la marca geométrica. Debería ser `sans-serif`.

## 6. 🟠 Accesibilidad visual / contraste

Conecta con el panel de accesibilidad que ya montamos, pero esto es la base que el panel no puede arreglar sola:

- **Rojo `#ff0b3a` sobre claro `#fcfcfc` ≈ 3:1** → falla AA para texto normal. Lo usas en acentos y enlaces.
- **Grises tenues `rgba(5,5,5,0.48)` ≈ 3.5:1** → borderline / falla AA en texto normal.
- **`meta-label` con `opacity: 0.35`** sobre oscuro → falla AA.
- **Foco:** `outline` rojo + `box-shadow #050505`; el shadow oscuro es **invisible sobre fondos oscuros**. Revisar que el foco se vea en ambas superficies.

**Recomendación:** auditar los pares color/fondo con un contrast checker, fijar mínimos AA y asegurar que el modo alto contraste cubra los tenues.

## 7. 🟢 Nomenclatura de tokens

`--prometeo-gray` vale `#fcfcfc` (¡blanco!) — nombre confuso. Conviven `COLORS.grayWhite/grayLight/grayDark`, `--prometeo-white/gray/black`, `canvasDark/pageLight`: varios nombres para el mismo color.
**Recomendación:** una nomenclatura **semántica** única (por rol, no por color literal).

---

## Orden de trabajo propuesto

1. **Decisiones de base (tuyas):** la escala de espaciado (§2) y confirmar la fuente de verdad única de tokens (§1).
2. **Tokens semánticos de color + purgar hardcodeados (§3, §7).** Arregla de paso accesibilidad y alto contraste.
3. **Fuentes:** fallback `sans-serif` y unificar la mono (§5). Rápido y de alto impacto visual si una fuente falla.
4. **Extraer componentes repetidos (§4):** FilterBar, Card, Tag, Pagination, Field.
5. **Auditoría de contraste AA + estados de foco (§6).**
6. **Documentar el design system** como manual — que además es **pieza obligatoria de la memoria** ("Identidad, Manual o sistema de diseño").

Los pasos 1–3 son sobre todo consolidación (bajo riesgo, alto orden). El 4 es el que más eleva la calidad percibida. El 6 cierra el círculo con el TFG.
