# Sistema de botones — Prometeo

El énfasis lo da el **tipo** de botón, no estilos ad-hoc por página. Solo existen **cuatro tipos (A, B, C, D)**. Cualquier botón nuevo debe ser uno de estos; si no encaja, es que falta repensar el tipo, no inventar un quinto estilo.

Regla de oro del hover (lo que distingue los tipos):
- **Ningún botón se rellena de rojo en hover, salvo el Tipo C** (salir de una página/modal).
- El rojo solo aparece como: **relleno de los Tipo C**, **palabra/icono de los Tipo B y D**, o **estado seleccionado** (activo).
- **Nunca** se usa la mono (JetBrains) en un botón. Los botones son **Funnel Sans**.
- Nunca generamos botones con poca legibilidad: texto a contraste pleno, nunca gris apagado en la etiqueta principal.

---

## Tipo A — Acción sólida
La acción de una sección o formulario. Avanzar, enviar, guardar, añadir.
- **Reposo:** outline (borde, fondo transparente), texto a contraste pleno.
- **Hover:** se rellena **negro**, texto **blanco**.
- **Seleccionado/activo:** **rojo** (relleno rojo + texto negro).
- **Componentes:** `Button` (`variant="outline"` / `primary`), `ActionButton` (`.ds-action`), `Chip` (activo = rojo).
- **Ejemplos:** "Añadir al carrito", "Pagar ahora", "Finalizar pedido", "Guardar", "Marcar como verificada", flechas de galería, selector de variante/cantidad.

## Tipo B — CTA con flecha
La voz primaria fuerte: una acción de avance/conversión con icono al lado.
- **Reposo:** outline, con caja de icono + flecha.
- **Hover:** el botón **no se rellena**; la **palabra se pone roja** y la caja del icono recibe un barrido rojo con la flecha en blanco.
- **Componente:** `SplitCtaButton` (`.ds-split-cta`).
- **Regla:** idealmente **una por sección/vista**.
- **Ejemplos:** "Solicitar certificación", "Enviar mensaje", "Abrir nuevo hilo", "Publicar respuesta".

## Tipo C — Salir / volver (dentro de modals)
El único tipo que **se rellena rojo** en hover, porque ayuda a salir de una página/modal.
- **Reposo:** outline, **Funnel Sans**, texto a contraste pleno y legible.
- **Hover:** se rellena **rojo**, texto **negro**.
- **Ejemplos / clases:** "Volver a artículos" (`.article-dialog__close`), "Volver a comunidad" (`.community-thread__back`), "Regresar a tienda" (botón de la ficha de producto), "Cerrar" del panel de accesibilidad (`.a11y-panel__close`).
- **Regla:** mismo estilo entre todos (misma fuente y comportamiento); jamás dejar el texto ilegible sobre el relleno.

## Tipo D — Enlace secundario (footer / fuera de la nav primaria)
Enlaces que no están en la navegación primaria del usuario (footer, cierres de sección).
- **Reposo:** **afordancia persistente** (subrayado) para que se lea como interactivo **incluso con animaciones reducidas**; texto blanco sobre fondo oscuro.
- **Hover:** la **palabra y la flecha se ponen rojas** (+ la flecha se desplaza, decorativo).
- **Componente:** `.ds-link-secondary` (con `.ds-link-secondary__arrow`).
- **Ejemplos:** "Conoce por qué existe Prometeo" y enlaces equivalentes del footer.

---

## Reglas transversales
- **Solo A/B/C/D.** El sistema (componentes + clases `ds-*`) es la única fuente; nada de botones inline con estilos propios fuera de esta tabla.
- **Una sola CTA primaria (Tipo B)** compitiendo por vista. Si hay dos acciones, una es Tipo B y la otra Tipo A.
- **Jerarquía por tipo, no por color.** El rojo es relleno-de-salida (C), acento de palabra (B/D) o estado seleccionado (A); nunca texto pequeño rojo suelto.
- **Fuente:** Funnel Sans en todos los botones. Mono (JetBrains) prohibida en botones.
- **Foco visible** garantizado por el sistema (no quitar outline).
- **Movimiento reducido:** ningún tipo puede depender solo de una animación para comunicar que es clicable (de ahí el subrayado persistente del Tipo D).

## Mapa de adopción (estado)
- ✅ Tipo A: cart/ficha de producto (añadir, pagar, variante, cantidad, flechas), `ActionButton`, `Chip`.
- ✅ Tipo B: `SplitCtaButton` en todas las secciones.
- ✅ Tipo C: volver a artículos / comunidad / tienda + cierre del panel a11y, unificados a relleno rojo + Funnel Sans.
- ✅ Tipo D: "Conoce por qué existe Prometeo" → `.ds-link-secondary`.
- ⏳ Pendiente: extraer Tipo C a un componente único (`ExitButton`) y migrar las clases bespoke (`article-dialog__close`, `community-thread__back`, inline de la ficha) a él.
