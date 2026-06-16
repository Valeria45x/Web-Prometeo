# Sistema de diseño Prometeo

## Fuente de verdad

El sistema visual reutilizable de Prometeo vive en estas capas:

- `src/design/tokens.js`: colores base, tipografias, escala, layout y transiciones.
- `src/design/typography.js`: roles tipograficos reutilizables.
- `src/design/gridSystem.js`: reglas del grid estructural.
- `src/design/system.css`: primitivas CSS compartidas, como `ds-grid`, `ds-button` y `text-reveal`.
- `src/design/prometeoSystem.js`: contrato de pagina para topbar, footer, CTA, motion y estructura de copy.

## Reglas visuales que ya quedan fijadas

- Color: negro `#050505`, blanco `#fcfcfc` y rojo Prometeo `#ff0b3a` son la base del sistema.
- Grid: cuatro columnas, sin gutter, separadas por lineas visibles de `1px`.
- Tipografia: Funnel Display para wordmark y titulares de caracter; Funnel Sans para navegacion, cuerpo y declaraciones grandes cuando hace falta mas densidad.
- Copy stack: la estructura por defecto es `eyebrow -> title -> body`.
- Motion: la transicion de referencia es `0.9s cubic-bezier(0.16,1,0.3,1)` y el `text-reveal` sigue siendo el patron principal para revelar titulares.

## Patrones reutilizables

### Navbar

- Usa la receta declarada en `PROMETEO_SYSTEM.components.topbar`.
- Mantiene alturas y paddings alineados al grid.
- El estado abierto y los dropdowns deben reutilizar la misma escala tipografica y el mismo ritmo de padding.

### Botones y CTA

- Los botones base siguen viviendo en `src/components/system/Button.jsx`.
- El CTA ancho de la landing queda guardado en `PROMETEO_SYSTEM.components.ctaButton`.
- Si una pagina futura necesita un CTA equivalente, debe partir de esa receta y no redefinir altura, icono o ritmo de transicion desde cero.

### Labels y gridlines

- Los labels de pagina viven en `src/components/system/Label.jsx` y deben salir del rol tipografico `eyebrow`, no de helpers locales en `monospace` a `8px`.
- Dentro de `Page`, los bordes exteriores izquierdo y derecho pertenecen a `Frame`; las filas internas solo deben dibujar divisores internos y costuras horizontales, no volver a pintar el borde exterior de la ultima celda.
- `HeroTransitionGrid` es la primitiva compartida para las franjas de transicion; por defecto no dibuja `topBorder`, porque la costura horizontal debe pertenecer al bloque anterior.
- Cuando una transicion conecta con una composicion `1+3` o `3+1`, debe usar un patron desplazado como `pattern="stagger-right"` o `pattern="stagger-left"` para que las lineas verticales no repitan exactamente la misma posicion de la seccion anterior.
- Si hay varias transiciones seguidas, deben alternar el patron de izquierda a derecha para que las casillas no coincidan mecanicamente entre una franja y la siguiente.

### Footer

- El footer (`src/shared/layout/SiteFooter.jsx` + `site-footer.css`) usa el
  **gris claro de marca** (`--brand-gray`) de fondo, con **texto oscuro**
  (legibilidad sobre fondo claro) y el wordmark **"Prometeo" en rojo**.
- Las superficies se declaran como variables locales derivadas de las primitivas
  (`--site-footer-bg`, `--site-footer-text`, `--site-footer-brand-mark`). Ver
  [`CONVENCIONES_CODIGO.md`](CONVENCIONES_CODIGO.md).
- El wordmark, los links y los paddings ya tienen escala fijada para desktop y compacto.

### Motion

- El reveal general sigue la primitiva `text-reveal`.
- La secuencia de los 4 pilares queda fijada en `PROMETEO_SYSTEM.motion.pillars`.
- Si otro bloque narrativo necesita una aparicion escalonada, debe reutilizar esa logica o derivar de ella, no inventar otra secuencia incompatible.

## Receta para nuevas paginas

1. Componer la pagina dentro de `Frame`.
2. Reutilizar `Topbar` y `Footer` o `LandingFooter` segun el caso.
3. Construir secciones con `Grid` y `GridCell`, manteniendo lineas como estructura, no como decoracion.
4. Aplicar roles tipograficos desde `typeStyle(...)` antes de crear nuevos tamanos.
5. Si hace falta una nueva variante visual repetible, declararla en `src/design/prometeoSystem.js` o en `src/design/tokens.js`.

## Criterio de extension

Una decision entra en el sistema cuando cumple al menos una de estas condiciones:

- aparece en mas de una pagina o seccion
- define una pieza estructural como navbar, footer, CTA o bloque de copy
- controla motion que forma parte de la identidad de Prometeo
- afecta a la lectura del grid, la jerarquia tipografica o la paleta principal
