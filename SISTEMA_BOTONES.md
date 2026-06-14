# Sistema de botones — Prometeo

El énfasis lo da el **tipo** de botón, no estilos ad-hoc por página. Hay una voz primaria fuerte (`SplitCtaButton`), una familia flexible para todo lo demás (`Button` con variantes) y los especializados (filtros, nav).

## Tipos y cuándo usar cada uno

### 1. CTA primario → `SplitCtaButton`
La **acción principal** de una sección o flujo: avanzar, convertir, enviar.
- Ejemplos: "Solicitar certificación", "Empieza por entender", "Enviar mensaje", "Abrir nuevo hilo", "Ver el registro".
- **Regla: idealmente una por sección/vista.** Es la voz fuerte (split + flecha + relleno rojo al hover).
- Sirve igual como enlace (`as={Link}`) o como acción (`onClick`).

### 2. Secundario → `Button variant="outline"`
Acción **alternativa o de apoyo** junto a una primaria, o una acción importante que no es *la* principal.
- Ejemplos: "Cancelar", "Vaciar carrito", "Conocer mi cuenta" (cuando hay una primaria al lado).
- Borde, sin relleno; hover = se rellena.

### 3. Terciario / ghost → `Button variant="ghost"` (o `inline` para enlaces-acción)
**Bajo énfasis**, casi un enlace. Acciones inline, "ver más", editar, descartar.
- Solo texto; acento al hover.

### 4. Utilidad / icono → `Button variant="ghost"` compacto (con icono)
Acciones **compactas o de icono**: cerrar, votar, acciones de card del foro, toggles del topbar.
- Mínimo, icono + opcional texto corto.

### 5. Filtro / selección → `Chip` (píldora) · `FilterOption` (fila)
Filtros y toggles de selección. Activo = rojo.
- `Chip`: barras horizontales (tienda, registro).
- `FilterOption`: listas a todo el ancho con contador (artículos, comunidad).

### 6. Navegación → `NavigationButton`
Solo el nav (dropdowns del topbar). No se usa fuera de ahí.

## Reglas transversales
- **Una sola CTA primaria** compitiendo por vista. Si hay dos acciones, una es `SplitCtaButton` y la otra `Button` (outline/ghost).
- **Jerarquía por tipo, no por color**: el rojo es acento/estado/relleno-de-CTA, nunca texto pequeño rojo (coherente con el contraste AA que ya fijamos).
- **Tamaños y estados del sistema**: usar `size` (xs/sm/md/lg) y dejar que hover/focus/disabled vengan del componente. Nada de px sueltos ni reimplementar estados.
- **Foco visible** garantizado por el sistema (no quitar outline).

## Mapa de migración (estado)
- ✅ `CommunityParticipation` (referencia): CTAs → `SplitCtaButton`, secundaria → `Button ghost`.
- ⏳ Resto de comunidad: cards de hilo/respuesta/post, hero, toolbar, topbar-actions, quick-actions, empty-actions.
- ⏳ Contacto: submit (primario), motivo (chips/toggle), success.
- ⏳ Perfil: hero, edit, guest, pending, demo-notice.
- ⏳ Revisar resto (tienda cart, etc.) y barrer el CSS bespoke muerto al final.
