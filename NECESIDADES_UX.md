# Necesidades UX y de user journey — Web Prometeo

Checklist de lo que la web debe cumplir para ser un producto UX/UI profesional **y** para responder a lo que pide la guía oficial del TFG (UDIT). El diseño visual (cómo se ve el contenido) se trabaja después; esta lista es el "qué tiene que cumplir", no el "cómo se ve".

## Por qué esto importa (anclaje en el documento oficial)

- **El producto es el 50% de la nota del tribunal.** Ponderación tribunal (70% de la nota final): Idea 10% · Memoria 30% · **Piezas / Producto 50%** · Defensa 10%. La web es la pieza principal: es donde más nota se juega.
- **La rúbrica exige "acabado óptimo".** Pieza principal: *"La ejecución es coherente y tiene un acabado óptimo"*. En una web, "acabado óptimo" es sobre todo UX: que funcione, se entienda y no tenga fricción.
- **La memoria debe presentar resultados de "navegación, usabilidad y diseño".** No basta con que la web exista: hay que demostrar que se validó.
- **La web como pieza principal debe estar "completamente programada (HTML) o prototipada con todo detalle".** Prometeo está programada en React → cumple. Pero el **link debe funcionar y estar operativo** para el tribunal.
- **Se valora la aplicación de los ODS** → conviene hacer explícito el vínculo de Prometeo con los Objetivos de Desarrollo Sostenible.

Estado: `[x]` hecho · `[~]` parcial · `[ ]` pendiente.

---

## A. User journey y arquitectura de navegación

- [~] **Dos journeys primarios definidos de principio a fin.** Personas (entender → decidir) y Empresas (confianza → certificarse), cada uno con entrada, recorrido y acción final clara. *Construidos; falta mapearlos formalmente como Journey Maps para la memoria.*
- [x] **El sello como puente entre journeys es navegable.** Persona aprende → reconoce el sello → registro público; empresa → certificación. *Conectado tras el trabajo de coherencia B2B2C.*
- [~] **El arco de marca (incomodidad → comprensión → agencia) es trazable** en el recorrido de consumidor (landing → artículos → comunidad). *Presente; conviene verificar que cada paso lleva al siguiente sin saltos.*
- [ ] **Ninguna página es un callejón sin salida.** Cada página termina con una acción siguiente clara (CTA o enlace contextual) que continúa el recorrido.
- [x] **La página es "enterable" desde varios contextos** (campaña → landing, artículo concreto, etc.) y orienta igual. *Rutas directas + footer global.*
- [ ] **Orientación constante:** en cada pantalla el usuario sabe *dónde está* (página activa marcada en nav), *qué puede hacer* y *cómo volver*.
- [ ] **Profundidad razonable:** cualquier contenido importante a ≤ 3 clics desde la home.

## B. Usabilidad (heurísticas — las que la guía nombra: "visibilidad del estado del sistema y consistencia")

- [ ] **Visibilidad del estado del sistema.** Estados de carga, foco, hover/activo, página activa en el nav, y feedback claro al actuar (enviar formulario, añadir al carrito, filtrar).
- [~] **Consistencia.** Nav, componentes, patrones de copy y comportamiento de los CTAs iguales en toda la web. *Muy alta; revisar casos sueltos.*
- [ ] **Control y libertad del usuario.** Cerrar modales (Esc), volver, vaciar/editar carrito, salir de un flujo sin penalización.
- [ ] **Prevención de errores y mensajes claros.** Formularios (contacto, newsletter, alta de cuenta demo): validación, estados de error y de éxito comprensibles.
- [~] **Reconocer en vez de recordar.** Etiquetas claras, sin jerga técnica sin explicar (los artículos ya enlazan términos). *Revisar labels de navegación y filtros.*
- [~] **Flexibilidad y eficiencia.** Búsqueda y filtros en artículos, comunidad y registro. *Existen; comprobar que son consistentes y descubribles.*
- [x] **Diseño minimalista / sin ruido.** Sin elementos superfluos. *Coherente con la identidad.*
- [ ] **Ayuda a reconocer y recuperarse de errores.** Páginas de error (404 / ruta inexistente) con salida clara.

## C. Accesibilidad (parte del "acabado óptimo" profesional)

- [x] **Panel de accesibilidad** global y persistente con controles de usuario: reducir movimiento, texto más grande, más contraste y subrayar enlaces. *Refuerza el "educar a todos por igual" de la marca.*
- [ ] **Contraste suficiente** texto/fondo (AA) en todas las superficies, incluido rojo sobre oscuro y gris sobre claro. *El modo "más contraste" ayuda; falta auditar los grises tenues con color hardcodeado por página.*
- [~] **Navegación por teclado completa** y **foco visible** en todos los interactivos (nav, modales, formularios, carrusel de casos).
- [x] **`prefers-reduced-motion` respetado** en las animaciones de scroll. *Implementado en varias secciones; verificar cobertura total.*
- [x] **Skip link** "Saltar al contenido". *Presente.*
- [ ] **Semántica y landmarks** correctos (encabezados jerárquicos, `nav`/`main`/`footer`, `alt` en imágenes con función, `aria` en componentes interactivos).
- [ ] **Targets táctiles** suficientes en móvil (≥ 44px) y formularios usables con una mano.

## D. Claridad de contenido y función principal

- [ ] **La propuesta de valor se entiende en segundos.** Un visitante nuevo sabe decir qué es Prometeo y para quién (validar con el test de 5 segundos).
- [ ] **El sello y sus niveles se entienden** sin explicación externa.
- [x] **Coherencia idea ↔ producto.** La web refleja el modelo real (certificadora B2B2C), no solo "privacidad como problema de diseño". *Resuelto.*
- [x] **Tono de marca consistente** y editable por página. *Trabajado en todas las páginas.*
- [ ] **Cada página tiene un trabajo único y declarado** (sin solapamientos que confundan; p. ej. empresas = valor, certificación = proceso).

## E. Validación (lo que la memoria debe demostrar — "resultados de navegación, usabilidad y diseño")

- [~] **Test de usabilidad** con usuarios del target. *Guion listo en [TEST_USABILIDAD.md](TEST_USABILIDAD.md); falta ejecutarlo y sintetizar.*
- [ ] **Evaluación heurística** documentada (las 10 de Nielsen) sobre la web.
- [ ] **Personas** basadas en investigación (consumidor Gen Z + decisor de empresa).
- [ ] **Mapas de empatía** de esas personas.
- [ ] **Journey Maps** de los dos recorridos, con puntos de fricción marcados.
- [ ] **Bucle de iteración** documentado: hallazgos → cambios → re-test (demuestra proceso, no solo resultado).

## F. Técnicas y de entrega (requisitos del documento)

- [x] **Web completamente programada** (React). *Cumple "pieza principal completamente programada".*
- [~] **Responsive** en móvil / tablet / desktop. *Implementado; conviene QA en dispositivos reales.*
- [ ] **Entregable como archivo local ejecutable.** El documento exige presentar la web *"mediante un archivo local… pero NUNCA como sustitutivo del archivo"*; el link es solo adicional. ⚠️ Ojo: el `base` actual del build (`/Web-Prometeo/`) puede dejar la web en blanco si el tribunal abre el archivo local sin servirlo en esa ruta — hay que verificarlo y, si hace falta, ajustar la configuración antes de entregar.
- [ ] **Link desplegado y operativo** para el tribunal, *adicional* al archivo local (probar la URL pública de principio a fin antes de entregar).
- [ ] **Rendimiento.** La imagen de hero pesa ~1,6 MB y se repite en todas las páginas: optimizar peso y formato afecta directamente a la experiencia (y a la del tribunal navegando).
- [ ] **Sin enlaces rotos ni rutas muertas** (revisar todos los CTAs e internos antes de entregar).

## G. Estrategia y coherencia (valoradas en la rúbrica)

- [ ] **Vínculo ODS explícito.** Conectar Prometeo con los ODS pertinentes (p. ej. ODS 16 — instituciones sólidas y acceso a la información; posible ODS 9 — innovación). La guía dice "se valora la aplicación de ODS".
- [x] **Idea innovadora y aplicable** reflejada en el producto. *El modelo B2B2C de certificación de privacidad orientada a Gen Z es la diferenciación.*

---

## Orden sugerido para trabajarlo paso a paso

1. **Cerrar la base de journey (bloque A):** mapear los dos Journey Maps y eliminar callejones sin salida. Es la columna vertebral; todo lo demás cuelga de aquí.
2. **Pasada de usabilidad (bloque B):** estados del sistema, formularios y consistencia. Barato y de alto impacto.
3. **Accesibilidad (bloque C):** contraste, teclado, foco, semántica.
4. **Validar (bloque E):** ejecutar el test de usabilidad y la evaluación heurística → genera los "resultados" que pide la memoria.
5. **Iterar** con los hallazgos.
6. **Cierre técnico (bloque F) y estrategia (bloque G)** antes de la entrega.
7. **Después de todo esto:** el diseño visual (cómo se presenta el contenido), que es la siguiente fase que quieres abordar.
