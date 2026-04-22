# Prometeo — Sistema de Grid Web
## Referencia para Claude Code · React + Tailwind

---

## Origen conceptual

El sistema de grid de Prometeo nace del cifrado **AES-256**. Sus divisores naturales son todos potencias de 2:

**256 → 128 → 64 → 32 → 16 → 8 → 4**

La unidad base es **32px**. Todos los valores de spacing, columnas y dimensiones son potencias de 2 derivadas de este sistema. No existen valores intermedios fuera de esta escala — esa restricción es deliberada y parte de la identidad del sistema.

---

## Escala de spacing — valores únicos válidos

```
4px   — separaciones mínimas, badges
8px   — gaps internos pequeños
16px  — padding de celda compacta
32px  — UNIDAD BASE · padding de celda estándar
64px  — secciones
128px — secciones grandes
256px — columna base digital
```

**Valores prohibidos:** 12px, 24px, 36px, 48px, o cualquier valor que no sea potencia de 2. Si el diseño actual usa estos valores, mantenerlos donde ya existen pero no crear nuevos con esos valores.

---

## Tokens CSS

```css
:root {
  /* Colores */
  --red:        #FF3C54;
  --deep:       #5C1220;
  --gray:       #C8C8C8;
  --structural: #303030;
  --bg:         #0A0A0A;

  /* Borde universal */
  --border: 1px solid #303030;

  /* Topbar height — constante del sistema */
  --th: 52px;

  /* Escala AES-256 */
  --s4:   4px;
  --s8:   8px;
  --s16:  16px;
  --s32:  32px;   /* unidad base */
  --s64:  64px;
  --s128: 128px;
  --s256: 256px;
}
```

---

## Grid

### Estructura base

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

/* Separación visual — siempre mediante bordes, nunca gap */
.cell {
  border-right: 1px solid #303030;
  border-bottom: 1px solid #303030;
}
.cell:last-child       { border-right: none; }
.cell:nth-child(4n)    { border-right: none; }
```

### Breakpoints

```css
/* > 1024px → 4 columnas */
/* 768px–1024px → 2 columnas */
@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
/* < 768px → 1 columna */
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}
```

### Container

```css
.container {
  max-width: min(1600px, 92vw);
  margin: 0 auto;
  border-left: 1px solid #303030;
  border-right: 1px solid #303030;
}
```

---

## Spanning

```css
.span-1 { grid-column: span 1; }
.span-2 { grid-column: span 2; }
.span-3 { grid-column: span 3; }
.span-4 { grid-column: span 4; }

.row-span-2 { grid-row: span 2; }
.row-span-3 { grid-row: span 3; }
```

**Patrón estándar:** contenido en span 3, celda roja en span 1.

---

## Anatomía de sección

Cada sección sigue esta estructura:

```
┌────────────┬────────────┬────────────┬────────────┐
│ PRO-001    │ ES · 2025  │ 44.80°N    │ PROMETEO ® │  ← GridMeta (height: 32px)
├────────────┴────────────┴────────────┤            │
│                                      │            │
│     CONTENIDO PRINCIPAL              │  #FF3C54   │  ← Cuerpo (height variable)
│     span 3                           │  span 1    │
│                                      │            │
├──────────────────────────────────────┴────────────┤
│  CTA · stripe decorativo                          │  ← Footer (height: 32px)
└───────────────────────────────────────────────────┘
```

---

## Componentes del sistema

### GridMeta

Fila de metadata en la parte superior de cada sección. Siempre 4 celdas con `border-right` entre ellas.

```jsx
// Valores por defecto
const defaults = ['PRO-001', 'ES · 2025', '44.80° N / 41.69° E', 'PROMETEO ®'];

// Estilos del texto
// font-family: monospace
// font-size: 6px
// color: #C8C8C8
// opacity: 0.35
// letter-spacing: 0.08em
// text-transform: uppercase
```

### RedCell

Una por sección. Siempre en una esquina. Nunca más de una por sección.

```jsx
// Siempre 1 columna de ancho
// background: #FF3C54
// Sin border
// Texto opcional: Funnel Display Bold, 7px, #0A0A0A, uppercase
// Si hay texto vertical: writing-mode: vertical-rl
```

### StripeDecor

Para celdas vacías o footers.

```css
.stripe {
  background: repeating-linear-gradient(
    90deg,
    #303030 0,
    #303030 1px,
    transparent 1px,
    transparent 8px   /* 8px — potencia de 2 */
  );
  height: 2px;
  width: 100%;
}
```

---

## Reglas de la celda roja

1. Exactamente **una por sección** — nunca más.
2. Siempre en una **esquina** — nunca en el centro.
3. **Nunca** en el grid estructural — los bordes son `#303030`.
4. En mobile: se convierte en barra horizontal de **8px** de alto.

---

## Tipografía

| Nivel | Tamaño | Peso | Uso |
|-------|--------|------|-----|
| Hero | clamp(3rem, 9vw, 8rem) | 900 | Titulares hero |
| Display | clamp(2rem, 5vw, 5.5rem) | 900 | Subtítulos |
| Section | 32px | 700 | Títulos de sección |
| Body | 16px | 400 | Texto cuerpo |
| Label | 8px | 500 | Labels, categorías |
| Meta | 6px | 400 | Metadata, monospace |

Tipografía: **Funnel Display** (titulares) / **Funnel Sans** (cuerpo) / monospace (metadata)

---

## Lo que NO forma parte del sistema

- `border-radius` en celdas de grid
- `box-shadow` en elementos de grid
- `gap` distinto de 0
- Valores de spacing fuera de la escala: 4, 8, 16, 32, 64, 128, 256
- Backgrounds distintos de `#0A0A0A` salvo la celda roja (`#FF3C54`) y metadata (`#303030`)
- Más de una celda roja por sección

---

## Paleta

```
#FF3C54  — Rojo · Celda de firma · CTAs · Una vez por sección
#5C1220  — Acento profundo · Solo hover · Nunca fondo principal
#C8C8C8  — Texto principal sobre fondos oscuros
#303030  — Bordes del grid · Fondos secundarios · Metadata row
#0A0A0A  — Fondo base · Todas las composiciones
```
