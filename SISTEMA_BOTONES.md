# Sistema de botones — Prometeo

El énfasis lo da el **tipo** de botón, no estilos ad-hoc por página. Solo existen **tres tipos (A, B, D)**. Cualquier botón nuevo debe ser uno de estos.

## Regla absoluta del rojo
**Ningún botón se rellena de rojo. Nunca.** El rojo solo puede aparecer como:
1. **El fondo de la sección del icono** en los botones con icono al lado (Tipo B) — se rellena *solo* esa caja, nunca el botón entero.
2. **La palabra** (texto) — en hover (B y D) o en estado **seleccionado/activo** (A).

Nunca: relleno rojo de un botón completo, ni recuadro/borde rojo como estilo de reposo, ni mono (JetBrains) en botones, ni etiquetas en gris poco legible.

---

## Tipo A — Acción sólida
Acción de una sección o formulario: añadir, pagar, guardar, finalizar.
- **Reposo:** outline (borde, fondo transparente), texto a contraste pleno.
- **Hover:** se rellena **negro**, texto **blanco**.
- **Seleccionado/activo:** **palabra roja** (sin relleno). Ej.: chip/filtro activo, variante activa, "Siguiendo".
- **Componentes:** `Button` (`outline`/`primary`), `ActionButton` (`.ds-action`), `Chip` (`.ds-chip`), `FilterOption` (`.ds-filter-option`).
- **Ejemplos:** "Añadir al carrito", "Pagar ahora", "Finalizar pedido", "Guardar", "Marcar como verificada", flechas de galería, selector de variante/cantidad.

## Tipo B — Botón con icono al lado
La voz con icono: CTAs de avance **y** los botones de salir/volver (que ayudan a abandonar una vista).
- **Reposo:** outline, con sección de copy + **caja de icono** separada por un divisor.
- **Hover:** el botón **no se rellena**; la **palabra se pone roja** y **solo la caja del icono se rellena de rojo**.
- **Componentes / casos:**
  - CTAs: `SplitCtaButton` (`.ds-split-cta`) — "Solicitar certificación", "Enviar mensaje", "Abrir nuevo hilo".
  - Salir/volver: "Volver a artículos" (`.article-dialog__close` + `__close-icon`), "Volver a comunidad" (`.community-thread__back` + `__back-icon`), "Regresar a tienda" (ficha de producto). Todos en **Funnel Sans** y legibles.
- **Regla:** idealmente una CTA de avance por vista.

## Tipo D — Enlace secundario (footer / fuera de la nav primaria)
Enlaces que no están en la navegación primaria (footer, cierres de sección).
- **Reposo:** **afordancia persistente** (subrayado) para que se lea como interactivo **incluso con animaciones reducidas**.
- **Hover:** la **palabra y la flecha se ponen rojas** (la flecha se desplaza, decorativo).
- **Componente:** `.ds-link-secondary` (+ `.ds-link-secondary__arrow`).
- **Ejemplos:** "Conoce por qué existe Prometeo" y enlaces equivalentes del footer.

---

## Reglas transversales
- **Solo A/B/D.** El sistema (componentes + clases `ds-*`) es la única fuente.
- **Una sola CTA de avance (Tipo B)** compitiendo por vista; el resto, Tipo A.
- **Jerarquía por tipo, no por color.** El rojo es caja-de-icono (B) o palabra (hover B/D, activo A). Nunca relleno de botón.
- **Fuente:** Funnel Sans en todos los botones. Mono (JetBrains) prohibida.
- **Foco visible** garantizado; no quitar outline.
- **Movimiento reducido:** ningún tipo depende solo de una animación para comunicar que es clicable (de ahí el subrayado del Tipo D).
- **Excepción documentada:** los *switches* (toggles on/off) y elementos decorativos (avatares, sellos, barras de progreso) pueden usar rojo de relleno porque no son botones de acción.

## Estado
- ✅ A: cart/ficha (añadir, pagar, variante, cantidad, flechas), `ActionButton`, `Chip`, `FilterOption`. Activos = palabra roja.
- ✅ B: `SplitCtaButton` + los tres botones de salir (artículos, comunidad, tienda) unificados al estilo icono-al-lado.
- ✅ D: "Conoce por qué existe Prometeo".
- ✅ Sin rellenos rojos de botón en todo el sistema (panel a11y pasado a inverso blanco; chips/acciones/variantes a palabra roja).
- ⏳ Extraer el Tipo B de salida a un componente único (`ExitButton`) para no repetir el markup en tres sitios.
