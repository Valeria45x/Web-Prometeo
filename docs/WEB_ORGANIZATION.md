# Organizacion web de Prometeo

## Estructura general

La web esta organizada en capas para que cada archivo tenga una responsabilidad clara:

- `src/pages`: monta las paginas y decide el orden narrativo de las secciones.
- `src/components`: contiene piezas reutilizables de interfaz.
- `src/components/landing`: contiene las secciones especificas de la landing.
- `src/components/system`: contiene componentes base del sistema, como `Grid` y `Button`.
- `src/design`: centraliza tokens visuales, colores, escala, layout y reglas del grid.
- `src/hooks`: contiene logica reutilizable que no pertenece directamente al marcado visual.

## Sistema de grid

El sistema visual deriva de AES-256. En web se traduce como una reticula de cuatro columnas, sin gutter, separada mediante bordes visibles de `1px` en `#050505`.

Reglas principales:

- Grid estructural: `repeat(4, minmax(0, 1fr))`.
- Tablet: dos columnas.
- Mobile: una columna.
- Separacion visual: borde, no espacio blanco entre columnas.
- Escala de spacing: `4`, `8`, `16`, `32`, `64`, `128`, `256`.
- Unidad base digital: `32px`.
- Celda de firma: rojo `#ff0b3a`, usada como interrupcion puntual.

El archivo `src/design/gridSystem.js` declara estas reglas para que la logica del grid no quede escondida dentro de componentes sueltos.

## Seccion interactiva de grid

La seccion interactiva de la landing esta dividida en piezas pequenas:

- `InteractiveGridSection.jsx`: compone la seccion y aplica la paleta segun el modo claro/oscuro.
- `InteractiveGridIntro.jsx`: contiene el texto explicativo.
- `InteractiveGridVisual.jsx`: dibuja la reticula interactiva.
- `interactiveGrid.css`: contiene la estructura visual de la seccion.
- `useInteractiveGridMotion.js`: controla el movimiento con pointer tracking, lerp y variables CSS.

La interaccion no modifica el logo. Solo desplaza lineas y modulos del grid para mostrar que el sistema puede responder al usuario sin romper sus reglas.
