# Prometeo — Sistema de Grid Web
## Referencia para implementación en React + Tailwind

---

## Origen conceptual

El sistema de grid de Prometeo nace del cifrado **AES-256** — el algoritmo de cifrado más utilizado en el mundo. 256 bits generan 2^256 combinaciones posibles. Sus divisores naturales (256 → 128 → 64 → **32** → 16 → 8 → 4) son la escala de spacing del sistema. La unidad base es **32px**.

Este origen no es decorativo — es una declaración conceptual: la misma matemática que protege los datos más sensibles del mundo organiza el espacio visual de la marca.

---

## Principios del sistema

**4 columnas fijas.** Siempre 4, en todos los breakpoints salvo mobile. El contenido se adapta mediante spanning, nunca cambiando el número de columnas.

**Gap: 0.** La separación visual entre columnas y filas se logra exclusivamente con bordes visibles, nunca con gap o gutter.

**Borde como elemento de identidad.** `1px solid #303030` es el separador universal. No es un detalle de layout — es la firma visual del sistema.

**Celda roja como firma de sección.** Una celda `#FF3C54` aparece exactamente una vez por sección, siempre en una esquina. Es el único elemento que rompe la monocromía del grid. Nunca en el grid estructural, nunca más de una vez por sección.

**Metadata técnica.** Cada sección tiene una fila de metadata en la parte superior: código de pieza (`PRO-001`), coordenadas (`44.80° N / 41.69° E`), mercado (`ES — 2025`) y marca (`PROMETEO ®`). Fuente monospace, 6–7px, opacity 0.35.

---

## Tokens del sistema

```css
/* Colores */
--prometeo-red: #FF3C54;
--prometeo-deep: #5C1220;
--prometeo-gray: #C8C8C8;
--prometeo-structural: #303030;
--prometeo-bg: #0A0A0A;

/* Borde universal */
--prometeo-border: 1px solid #303030;

/* Topbar */
--prometeo-th: 52px;

/* Unidad base AES-256 */
--prometeo-unit: 32px;

/* Escala de spacing (múltiplos de 32) */
--space-4: 4px;    /* ×0.125 */
--space-12: 12px;  /* ×0.375 */
--space-24: 24px;  /* ×0.75  */
--space-32: 32px;  /* ×1     — unidad base */
--space-48: 48px;  /* ×1.5   */
--space-64: 64px;  /* ×2     */
--space-128: 128px; /* ×4    */
--space-256: 256px; /* ×8    — columna base digital */
```

---

## Estructura de grid

### Columnas

```css
.prometeo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid #303030;
}

/* Responsive */
@media (max-width: 1024px) {
  .prometeo-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .prometeo-grid { grid-template-columns: 1fr; }
}
```

### Clases de spanning

```css
.span-1 { grid-column: span 1; }
.span-2 { grid-column: span 2; }
.span-3 { grid-column: span 3; }
.span-4 { grid-column: span 4; }

.row-span-2 { grid-row: span 2; }
.row-span-3 { grid-row: span 3; }
```

---

## Anatomía de una sección

Cada sección de la web sigue esta estructura de arriba a abajo:

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  PRO-001    │  ES · 2025  │  44.80°N    │ PROMETEO ®  │  ← Fila metadata (height: 52px)
├─────────────┴─────────────┴─────────────┤             │
│                                          │    ROJO     │
│         CONTENIDO PRINCIPAL              │   #FF3C54   │  ← Cuerpo (height variable)
│         span 3 columnas                  │   span 1    │
│                                          │             │
├─────────────────────────────────────────┴─────────────┤
│  CTA o dato secundario · Stripe decorativo             │  ← Footer de sección (height: 52px)
└────────────────────────────────────────────────────────┘
```

**La fila de metadata** siempre ocupa el ancho completo (span 4), dividida internamente en 4 celdas con bordes.

**El contenido** normalmente ocupa span 3. La celda roja ocupa span 1 en la columna opuesta.

**El footer de sección** puede contener un CTA, un dato secundario, o el stripe decorativo.

---

## Componentes de referencia

### GridMeta — fila de metadata

Aparece en la parte superior de cada sección. Siempre 4 celdas con `border-right: 1px solid #303030` entre ellas.

```jsx
// Props: code (string), items (array de 4 strings máx)
// La cuarta celda siempre es "PROMETEO ®" con color rojo
const defaultItems = ['PRO-001', 'ES · 2025', '44.80° N / 41.69° E', 'PROMETEO ®'];
```

Estilos de texto:
- Fuente: monospace
- Tamaño: 6–7px
- Color: `#C8C8C8` con opacity 0.35
- Letter-spacing: 0.08em
- Uppercase

### RedCell — celda de firma

Una por sección. Ocupa exactamente 1 columna de ancho. Altura variable según la sección.

```jsx
// Props: text (string, opcional), vertical (boolean)
// Si text está vacío, la celda es solo color
// Si vertical=true, el texto va en writing-mode: vertical-rl
```

Estilos:
- Background: `#FF3C54`
- Sin border
- Texto: Funnel Display Bold, 7px, `#0A0A0A`, uppercase

### StripeDecor — stripe decorativo

Para celdas vacías o footers de sección.

```css
.stripe-decor {
  background: repeating-linear-gradient(
    90deg,
    #303030 0,
    #303030 1px,
    transparent 1px,
    transparent 8px
  );
  height: 2px;
  width: 100%;
}
```

---

## Comportamiento dinámico por sección

El grid es modular — cada sección decide cuántas filas necesita y cómo distribuye el contenido. Lo que no cambia nunca:

- 4 columnas (2 en tablet, 1 en mobile)
- 0 gap
- Bordes `1px solid #303030`
- Celda roja en una esquina

### Secciones con poco contenido (hero, datos)

```
┌──────┬──────┬──────┬──────┐
│meta  │meta  │meta  │META R│  52px
├──────┴──────┴──────┤      │
│                    │      │  variable
│    TITULAR GRANDE  │  R   │
│                    │      │
└──────┬──────┬──────┴──────┘
│ cta  │stripe│      │      │  52px
└──────┴──────┴──────┴──────┘
```

### Secciones con mucho contenido (artículos, producto)

```
┌──────┬──────┬──────┬──────┐
│meta  │meta  │meta  │META R│  52px
├──────┼──────┴──────┴──────┤
│label │                    │
│      │  CONTENIDO         │  variable
│ ROJO │  span 3            │
│      │                    │
│      │                    │
├──────┴──────┬──────┬──────┤
│ footer      │      │ stripe│  52px
└─────────────┴──────┴──────┘
```

### Secciones de grid simétrico (cards, productos)

```
┌──────┬──────┬──────┬──────┐
│meta  │meta  │meta  │META R│  52px
├──────┼──────┼──────┼──────┤
│CARD  │CARD  │CARD  │CARD  │
│      │      │      │      │  variable
├──────┼──────┼──────┼──────┤
│CARD  │CARD  │CARD  │  R   │
│      │      │      │      │
└──────┴──────┴──────┴──────┘
```

---

## Reglas de la celda roja

1. **Exactamente una por sección.** Si una sección necesita más énfasis, se logra con tipografía o tamaño, nunca con más celdas rojas.

2. **Siempre en una esquina.** Superior derecha, inferior derecha, inferior izquierda, o superior izquierda. Nunca en el centro.

3. **Nunca en el grid estructural.** Los bordes son `#303030`. El rojo solo en celdas de contenido.

4. **Puede estar vacía o contener texto.** Si contiene texto, siempre en vertical (`writing-mode: vertical-rl`) o en horizontal muy corto (código, número, año).

5. **En mobile desaparece o colapsa.** En viewport de 1 columna, la celda roja se convierte en una barra horizontal de 8px de alto en la parte superior de la sección.

---

## Escala tipográfica web

Dentro del grid, la tipografía sigue la misma lógica de potencias de 2:

| Nivel | Tamaño | Peso | Uso |
|-------|--------|------|-----|
| Hero | clamp(3rem, 9vw, 8rem) | 900 | Titulares de sección hero |
| Display | clamp(2rem, 5vw, 5.5rem) | 900 | Subtítulos principales |
| Section | 32px | 700 | Títulos de sección |
| Body | 16px | 400 | Texto de cuerpo |
| Label | 12px | 500 | Labels, categorías |
| Meta | 6–7px | 400 | Metadata técnica, monospace |

Tipografía: **Funnel Display** (titulares) / **Funnel Sans** (cuerpo) / monospace del sistema (metadata)

---

## Container

```css
.prometeo-container {
  max-width: min(1600px, 92vw);
  margin: 0 auto;
  border-left: 1px solid #303030;
  border-right: 1px solid #303030;
}
```

Los bordes laterales del container son parte del sistema visual — el grid no desaparece en los márgenes, los delimita.

---

## Elementos que NO forman parte del grid

- Rounded corners — este sistema no usa border-radius en celdas de grid
- Shadows — nunca drop-shadow en elementos de grid
- Gap — siempre 0, los bordes son los separadores
- Backgrounds distintos al fondo base (`#0A0A0A`) salvo la celda roja y la celda de metadata

---

## Referencia de paleta

```
#FF3C54  — Rojo acento · Celda de firma · CTAs · Máximo una vez por sección
#5C1220  — Acento profundo · Solo hover o estados activos · Nunca fondo principal
#C8C8C8  — Gris medio · Texto principal sobre fondos oscuros
#303030  — Estructural · Bordes del grid · Fondos secundarios
#0A0A0A  — Fondo base · Todas las composiciones
```
